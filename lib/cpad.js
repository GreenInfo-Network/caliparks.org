"use strict";

var env       = require("require-env"),
    pg        = require("pg"),
    escape    = require('pg-escape'),
    getPlace  = require('../library/get-place.js'),
    hipcamp   = require('../lib/hipcamp.js'),
    sanitizer = require('sanitizer');

var DATABASE_URL = env.require("DATABASE_URL");

var buildQuery = function buildQuery(dbQuery, data, callback) {

  // score = (total tweets + total photos + total checkins + total tips) (* 10 if they have activity data)

  var fullQuery, activitiesColumnSQLslug, activitiesWhereSQLslug, queryArray;

  // TODO site_tweets needs to be updated with new superunit_ids
  // superunit_ids
  var scoreSubQuery = [
    ', (',
    '  WITH stats AS (',
    '    SELECT * FROM park_stats WHERE park_stats.superunit_id = shortlist.superunit_id',
    '  ),',
    '  hipcamp AS (',
    '    SELECT (activities ->> \'activityCount\')::integer AS activities FROM site_hipcamp_activities WHERE site_hipcamp_activities.su_id = shortlist.superunit_id',
    '  )',
    '  SELECT (stats.flickr_photo_count + stats.instagram_photo_count + stats.tweet_count + stats.foursquare_venue_count + stats.foursquare_tip_count) * (CASE WHEN COALESCE(hipcamp.activities, 0) > 0 THEN 10 ELSE 1 END) AS score',
    '  FROM stats,',
    '    hipcamp',
    ') AS score',
  ].join('\n');

  var scoreOrderBy = 'score DESC,';

  //
  // Decide which kind of search this is
  //

  if (data.query.with && data.query.with.length && data.query.near && data.query.near.length) { //Has amenities & near filter

    // With
    //
    // Split activities into an array
    //
    queryArray = sanitizer.sanitize(data.query.with).split('+');

    //
    // Limit the amount of activities which can be passed in
    //
    queryArray.length = Math.min(queryArray.length, 20);

    //
    // Build column aliases for JSON select
    //
    activitiesColumnSQLslug = queryArray.map(function(activity) {
      return "activities->'"+activity+"' as "+activity;
    }).join(',');

    //
    // Build where statement for JSON select
    //
    activitiesWhereSQLslug = queryArray.map(function(activity) {
      return " act."+activity+"::text='true'";
    }).join(' AND ');

    // Near
    var limit = ((data.options) ? data.options.limit : null) || 100000,
        not   = ((data.options) ? data.options.not : null) ? ' AND superunit_id <> ' + parseInt(data.options.not) : '';

    return getPlace(data.query.near, function(err, place) {
      if (err) {
        return callback(err);
      }

      fullQuery = {
        text: escape([
          'SELECT',
          '  *,',
          '  ST_AsGeoJSON(geom) AS geometry,',
          '  ST_AsGeoJSON(ST_Centroid(geom)) AS centroid,',
          '  ST_Distance(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326)) AS distance',
          '  %s',
          'FROM (',
          '  SELECT',
          '    *',
          '  FROM cpad_superunits_4326',
          '  INNER JOIN (',
          '    SELECT',
          '      su_id,',
          '      activities,',
          '      %s',
          '    FROM site_hipcamp_activities',
          '  ) act',
          '    ON act.su_id = cpad_superunits_4326.superunit_id',
          '  WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326), .3)',
          '    %s',
          '    AND unit_name ILIKE %L',
          '  LIMIT $3',
          ') AS shortlist',
          'ORDER BY %s distance ASC'
        ].join('\n'), scoreSubQuery, activitiesColumnSQLslug, not, '%' + dbQuery + '%', scoreOrderBy),
        values: [place.coordinates[1], place.coordinates[0], limit]
      };

      return callback(null, fullQuery);
    });

  } else if (data.query.near && data.query.near.length) { //Has near filter

    var limit = ((data.options) ? data.options.limit : null) || 100000,
        not   = ((data.options) ? data.options.not : null) ? ' AND superunit_id <> ' + parseInt(data.options.not) : '';

    return getPlace(data.query.near, function(err, place) {
      if (err) {
        return callback(err);
      }

      fullQuery = {
        text: escape([
          'SELECT',
          '  *,',
          '  ST_AsGeoJSON(geom) AS geometry,',
          '  ST_AsGeoJSON(ST_Centroid(geom)) AS centroid,',
          '  ST_Distance(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326)) AS distance',
          '  %s',
          'FROM (',
          '  SELECT',
          '    *',
          '  FROM cpad_superunits_4326',
          '  WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326), .3)',
          '    %s',
          '    AND unit_name ILIKE %L',
          '  LIMIT $3',
          ') AS shortlist',
          'ORDER BY %s distance ASC'
        ].join('\n'), scoreSubQuery, not, '%' + dbQuery + '%', scoreOrderBy),
        values: [place.coordinates[1], place.coordinates[0], limit]
      };

      return callback(null, fullQuery);
    });

  } else if (data.query.with && data.query.with.length) { //Has ammenities filter

    //
    // Split activities into an array
    //
    queryArray = sanitizer.sanitize(data.query.with).split('+');

    //
    // Limit the amount of activities which can be passed in
    //
    queryArray.length = Math.min(queryArray.length, 20);

    //
    // Build column aliases for JSON select
    //
    activitiesColumnSQLslug = queryArray.map(function(activity) {
      return "activities -> '" + activity + "' as " + activity;
    }).join(',');

    //
    // Build where statement for JSON select
    //
    activitiesWhereSQLslug = queryArray.map(function(activity) {
      return ' act.' + activity + "::text='true'";
    }).join(' AND ');

    fullQuery = {
      text: escape([
        'SELECT',
        '  shortlist.superunit_id,',
        '  *',
        '  %s',
        'FROM (',
        '  SELECT',
        '  su_id,',
        '  activities,',
        '  %s',
        '  FROM site_hipcamp_activities',
        ') act',
        'INNER JOIN cpad_superunits_4326 shortlist ON shortlist.superunit_id = act.su_id',
        'WHERE %s',
        '  AND unit_name ILIKE %L',
        'ORDER BY %s shortlist.unit_name ASC'
      ].join('\n'), scoreSubQuery, activitiesColumnSQLslug, activitiesWhereSQLslug, '%' + dbQuery + '%', scoreOrderBy)
    };

    return callback(null, fullQuery);

  } else {
    fullQuery = {
      text: escape([
        'SELECT',
        '  shortlist.superunit_id,',
        '  shortlist.unit_name as name,',
        '  act.activities,',
        '  *',
        ' %s',
        'FROM cpad_superunits_4326 shortlist',
        'INNER JOIN site_hipcamp_activities act ON (shortlist.superunit_id = act.su_id)',
        'WHERE shortlist.unit_name ILIKE %L',
        'ORDER BY %s shortlist.unit_name ASC'
      ].join('\n'), scoreSubQuery, '%' + dbQuery + '%', scoreOrderBy)
    };

    return callback(null, fullQuery);
  }
}

var getPark = function getPark(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  superunit_id, unit_name, mng_ag_id, mng_agncy, access_typ, gis_acres,",
      "  ST_AsGeoJSON(ST_Envelope(geom)) AS bbox,",
      "  ST_AsGeoJSON(ST_Centroid(geom)) AS centroid",
      "FROM cpad_superunits_4326",
      "WHERE superunit_id = $1"
    ].join("\n");

    return client.query(query, [parkId], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      return callback(null, result.rows[0]);
    });
  });
};

var getParkStats = function(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  superunit_id,",
      " flickr_photo_count,",
      " instagram_photo_count,",
      " foursquare_tip_count,",
      " foursquare_venue_count,",
      " swarm_checkin_count,",
      " tweet_count",
      "FROM park_stats",
      "WHERE superunit_id = $1"
    ].join("\n");

    return client.query(query, [parkId], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      return callback(null, result.rows[0]);
    });
  });
};

var getParks = function(options, _callback) {

var dbLimit = '',
    dbQuery = '', // default
    searchQuery;

  return pg.connect(env.require('DATABASE_URL'), function(err, client, done) {
    var callback = function() {
      done();
      return _callback.apply(null, arguments);
    };

    if (options.limit) {
      dbLimit = ' LIMIT ' + options.limit;
    }

    dbQuery = sanitizer.sanitize((options.query.q || ' ').toLowerCase()).split('+').join(' ') || sanitizer.sanitize(dbQuery);

    buildQuery(dbQuery, options, function(err, fullQuery) {

      if (err) {
        return callback(err);
      }

      return client.query(fullQuery, function(err, result) {
        if(err) {
          console.error('error running query', err);
          return callback(err);
        }

        //
        // Format activity data
        //
        result.rows.map(function(row) {
          if (row.activities) {
            row.activity = {};
            row.activity.items = hipcamp.filterActivityData(row.activities);
          }
          row.su_id = row.superunit_id;
          row.name  = row.unit_name;
          return row;
        });

        return callback(null, result.rows);
      });
    });

  });
};

module.exports = {
  getPark      : getPark,
  getParkStats : getParkStats,
  getParks     : getParks
};
