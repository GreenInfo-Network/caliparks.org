"use strict";

var env       = require("require-env"),
    pg        = require("pg"),
    escape    = require('pg-escape'),
    getPlace  = require('../lib/get-place.js'),
    hipcamp   = require('../lib/hipcamp.js'),
    sanitizer = require('sanitizer');

var DATABASE_URL = env.require("DATABASE_URL");

var buildQuery = function buildQuery(dbQuery, data, callback) {

  // score = (total tweets + total photos + total checkins + total tips) (* 10 if they have activity data)

  var fullQuery, queryArray;

  var scoreSubQuery = [
    ', (',
    '  WITH stats AS (',
    '    SELECT * FROM park_stats',
    '  )',
    '  SELECT (stats.flickr_photo_count + stats.instagram_photo_count + stats.tweet_count + stats.foursquare_venue_count + stats.foursquare_tip_count) * (CASE WHEN stats.hipcamp_activity_count > 0 THEN 10 ELSE 1 END) * (CASE WHEN stats.cpad_facility_count > 0 THEN 5 ELSE 1 END) AS score',
    '  FROM stats',
    '  WHERE stats.superunit_id = shortlist.superunit_id',
    ') AS score',
  ].join('\n');

  var geoScoreSubQuery = [
    ', (',
    '  WITH stats AS (',
    '    SELECT * FROM park_stats',
    '  )',
    '  SELECT ((stats.flickr_photo_count + stats.instagram_photo_count + stats.tweet_count + stats.foursquare_venue_count + stats.foursquare_tip_count) * (CASE WHEN stats.hipcamp_activity_count > 0 THEN 10 ELSE 1 END) * (CASE WHEN stats.cpad_facility_count > 0 THEN 5 ELSE 1 END) / (ST_Distance(geom::geometry, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geometry)*10)) AS score',
    '  FROM stats',
    '  WHERE stats.superunit_id = shortlist.superunit_id',
    ') AS score',
  ].join('\n');

  var scoreOrderBy = 'score DESC,';

  //
  // Decide which kind of search this is
  //

  var perpage = ((data.options) ? data.options.perpage : null) || 100000,
      not     = ((data.options) ? data.options.not     : null) ? ' AND superunit_id <> ' + parseInt(data.options.not) : '',
      startat = ((data.options) ? data.options.startat : null) || 0;

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

    return getPlace(data.query.near, function(err, place) {
      if (err) {
        return callback(err);
      }

      var activities = queryArray.map(function(x) {
        return "'" + x + "'";
      }).join(", ");

      fullQuery = {
        text: escape([
          'SELECT',
          'shortlist.*,',
          'ST_AsGeoJSON(ST_Transform(shortlist.geom, 4326)) AS geometry,',
          'ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(shortlist.geom, 4326)))) AS centroid,',
          'activities,',
          'geo.distance distance,',
          'pow((5000/geo.distance),3)*stats.score as geoscore',
          'FROM (  SELECT    *  FROM cpad_superunits  LEFT JOIN activities USING (superunit_id)  WHERE ST_DWithin(geom, ST_Transform(ST_SetSRID(ST_MakePoint($1,$2), 4326), ST_SRID(geom)), 300000)) AS shortlist',
          'LEFT JOIN (SELECT *, park_stats.flickr_photo_count + park_stats.instagram_photo_count + park_stats.tweet_count + park_stats.foursquare_venue_count + park_stats.foursquare_tip_count AS score FROM park_stats) stats ON stats.superunit_id = shortlist.superunit_id',
          'LEFT JOIN (SELECT *, ST_Distance(cpad_superunits.geom, ST_Transform(ST_SetSRID(ST_MakePoint($1,$2), 4326), ST_SRID(cpad_superunits.geom))) as distance FROM cpad_superunits) geo ON geo.superunit_id = shortlist.superunit_id',
          'LEFT JOIN cpad_entry_points ON cpad_entry_points.su_id = cpad_superunits.superunit_id',
          'WHERE shortlist.unit_name ILIKE %L ',
          'AND activities @> ARRAY[%s]',
          'ORDER BY geoscore DESC',
          'OFFSET $4',
          'LIMIT $3'
        ].join('\n'), activities, '%'+dbQuery+'%'),
        values: [place.coordinates[1], place.coordinates[0], perpage, startat]
      };

      return callback(null, fullQuery);
    });

  } else if (data.query.near && data.query.near.length) { //Has near filter

    return getPlace(data.query.near, function(err, place) {
      if (err) {
        return callback(err);
      }

      fullQuery = {
        text: escape([
          'SELECT',
          'shortlist.*,',
          'ST_AsGeoJSON(ST_Transform(shortlist.geom, 4326)) AS geometry,',
          'ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(shortlist.geom, 4326)))) AS centroid,',
          'activities,',
          'geo.distance distance,',
          'pow((5000/geo.distance),3)*stats.score as geoscore',
          'FROM (  SELECT    *  FROM cpad_superunits  LEFT JOIN activities USING (superunit_id)  WHERE ST_DWithin(geom, ST_Transform(ST_SetSRID(ST_MakePoint($1,$2), 4326), ST_SRID(geom)), 300000)) AS shortlist',
          'LEFT JOIN (SELECT *, park_stats.flickr_photo_count + park_stats.instagram_photo_count + park_stats.tweet_count + park_stats.foursquare_venue_count + park_stats.foursquare_tip_count AS score FROM park_stats) stats ON stats.superunit_id = shortlist.superunit_id',
          'LEFT JOIN (SELECT *, ST_Distance(cpad_superunits.geom, ST_Transform(ST_SetSRID(ST_MakePoint($1,$2), 4326), ST_SRID(cpad_superunits.geom))) as distance FROM cpad_superunits) geo ON geo.superunit_id = shortlist.superunit_id',
          'LEFT JOIN cpad_entry_points ON cpad_entry_points.su_id = cpad_superunits.superunit_id',
          'WHERE shortlist.unit_name ILIKE %L',
          'ORDER BY geoscore DESC',
          'OFFSET $4',
          'LIMIT $3'
        ].join('\n'), '%'+dbQuery+'%'),
        values: [place.coordinates[1], place.coordinates[0], perpage, startat]
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

    var activities = queryArray.map(function(x) {
      return "'" + x + "'";
    }).join(", ");

    fullQuery = {
      text: escape([
        'SELECT',
        '  shortlist.superunit_id,',
        '  *',
        '  %s',
        'FROM activities',
        'JOIN cpad_superunits shortlist USING (superunit_id)',
        'WHERE activities @> ARRAY[%s]',
        '  AND unit_name ILIKE %L',
        'ORDER BY %s shortlist.unit_name ASC',
        'OFFSET $1',
        'LIMIT $2'
    ].join('\n'), scoreSubQuery, activities, '%' + dbQuery + '%', scoreOrderBy),
      values : [startat, perpage]
    };

    return callback(null, fullQuery);

  } else {
    fullQuery = {
      text: escape([
        'SELECT',
        '  shortlist.superunit_id,',
        '  shortlist.unit_name as name,',
        '  activities.activities,',
        '  *',
        ' %s',
        'FROM cpad_superunits shortlist',
        'LEFT JOIN activities USING (superunit_id)',
        'WHERE shortlist.unit_name ILIKE %L',
        'ORDER BY %s shortlist.unit_name ASC',
        'OFFSET $1',
        'LIMIT $2'
      ].join('\n'), scoreSubQuery, '%' + dbQuery + '%', scoreOrderBy),
      values : [startat, perpage]
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
      "  superunit_id, unit_name, manager_id, cpad_superunits.mng_agncy, access_typ, gis_acres, park_url,",
      "  ST_AsGeoJSON(ST_Envelope(ST_Transform(cpad_superunits.geom, 4326))) AS bbox,",
      "  ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(cpad_superunits.geom, 4326)))) AS centroid,",
      "  activities",
      "FROM cpad_superunits",
      "LEFT JOIN activities USING (superunit_id)",
      "LEFT JOIN cpad_entry_points ON cpad_entry_points.su_id = cpad_superunits.superunit_id",
      "WHERE superunit_id = $1"
    ].join("\n");

    return client.query(query, [parkId], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      //
      // Format activity data
      //
      if (result.rows[0] && result.rows[0].activities) {
        result.rows[0].activity = {};
        result.rows[0].activity.items = hipcamp.filterActivityData(result.rows[0].activities);
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

var getRandomBest = function(callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  *,",
      " (stats.flickr_photo_count + stats.instagram_photo_count + stats.tweet_count + stats.foursquare_venue_count + stats.foursquare_tip_count) AS score",
      "FROM park_stats stats",
      "ORDER BY score DESC",
      "LIMIT 1",
      "OFFSET random()*1000"
    ].join("\n");

    return client.query(query, function(err, result) {
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

    if (options.perpage) {
      dbLimit = ' LIMIT ' + options.perpage;
    }

    dbQuery = sanitizer.sanitize((options.query.q || ' ').toLowerCase()).split('+').join(' ') || sanitizer.sanitize(dbQuery);

    buildQuery(dbQuery, options, function(err, fullQuery) {

      if (err) {
        return callback(err);
      }

      return client.query(fullQuery, function(err, result) {
        if(err) {
          console.error('error running query: %s', fullQuery.text, err);
          return callback(err);
        }

        //
        // Format output
        //
        result.rows.map(function(row) {

          //
          // Convert meters to miles
          //
          if (row.activities) {
            row.activity = {};
            row.activity.items = hipcamp.filterActivityData(row.activities);
          }

          //
          // Convert meters to miles
          //
          if (row.distance) {
            //convert to miles
            row.distance *= 0.00062137;

            var distanceInFeet = row.distance*5280;

            if (distanceInFeet < 1000) {
              row.distance_human = (distanceInFeet|0) + ' feet';
            } else {
              row.distance_human = row.distance.toFixed(2) + ' miles'
            }

          }

          row.name  = row.unit_name;
          return row;
        });

        //
        // Sometimes it is important to filter out one item from the
        // results. This can be passed as an argument from API consumers
        //
        if (options.options.not) {
          result.rows = result.rows.filter(function(row) {
            if ((row.superunit_id|0) !== (options.options.not|0)) {
              return true;
            }
          });
        }

        return callback(null, result.rows);
      });
    });

  });
};

module.exports = {
  getPark       : getPark,
  getParkStats  : getParkStats,
  getParks      : getParks,
  getRandomBest : getRandomBest
};
