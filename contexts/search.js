'use strict';

var env       = require('require-env'),
    escape    = require('pg-escape'),
    pg        = require('pg'),
    sanitizer = require('sanitizer'),
    getPlace  = require('../library/get-place.js');

// score = (total tweets + total photos + total checkins + total tips) (* 10 if they have activity data)

function buildQuery(dbQuery, data, callback) {
  var fullQuery, activitiesColumnSQLslug, activitiesWhereSQLslug, queryArray;

  var scoreSubQuery = [
    ', (',
    '  WITH flickr AS (',
    '    SELECT COUNT(id) AS photos FROM flickr_photos WHERE flickr_photos.superunit_id = shortlist.superunit_id',
    '  ),',
    '  instagram AS (',
    '    SELECT COUNT(id) AS photos FROM instagram_photos WHERE instagram_photos.superunit_id = shortlist.superunit_id',
    '  ),',
    '  twitter AS (',
    // site_tweets has old superunit ids
    '    SELECT COUNT(su_id) AS tweets FROM site_tweets WHERE site_tweets.su_id = shortlist.superunit_id',
    '  ),',
    '  foursquare AS (',
    // site_foursquare_venues_activity has old superunit ids
    '    SELECT COUNT(id) AS venues, SUM(tipcount) AS tips FROM site_foursquare_venues_activity WHERE site_foursquare_venues_activity.su_id = shortlist.superunit_id',
    '  ),',
    '  hipcamp AS (',
    '    SELECT COALESCE((activities ->> \'activityCount\')::integer, 0) AS activities FROM site_hipcamp_activities WHERE site_hipcamp_activities.su_id = shortlist.superunit_id',
    '  )',
    '  SELECT (COALESCE(flickr.photos, 0) + COALESCE(instagram.photos, 0) + COALESCE(twitter.tweets, 0) + COALESCE(foursquare.venues, 0) + COALESCE(foursquare.tips, 0)) * (CASE WHEN hipcamp.activities > 0 THEN 10 ELSE 1 END) AS score',
    '  FROM flickr,',
    '    instagram,',
    '    twitter,',
    '    foursquare,',
    '    hipcamp',
    ') AS score',
  ].join('\n');

  //
  // Decide which kind of search this is
  //

  if (data._query.with && data._query.with.length && data._query.near && data._query.near.length) { //Has amenities & near filter

    // With
    //
    // Split activities into an array
    //
    queryArray = sanitizer.sanitize(data._query.with).split('+');

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

    return getPlace(data._query.near, function(err, place) {
      if (err) {
        return callback(err);
      }

      fullQuery = {
        text: escape([
          'SELECT',
          '  superunit_id,',
          '  unit_name,',
          '  ST_AsGeoJSON(geom) AS geometry,',
          '  ST_AsGeoJSON(ST_Centroid(geom)) AS centroid,',
          '  ST_Distance(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326)) AS distance',
          '  %s',
          'FROM (',
          '  SELECT',
          '    superunit_id,',
          '    unit_name,',
          '    geom',
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
          'ORDER BY distance ASC'
        ].join('\n'), scoreSubQuery, activitiesColumnSQLslug, not, '%' + dbQuery + '%'),
        values: [place.coordinates[1], place.coordinates[0], limit]
      };

      return callback(null, fullQuery);
    });

  } else if (data._query.near && data._query.near.length) { //Has near filter

    var limit = ((data.options) ? data.options.limit : null) || 100000,
        not   = ((data.options) ? data.options.not : null) ? ' AND superunit_id <> ' + parseInt(data.options.not) : '';

    return getPlace(data._query.near, function(err, place) {
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
          'FROM (',
          '  SELECT',
          '    *',
          '  FROM cpad_superunits_4326',
          '  WHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326), .3)',
          '    %s',
          '    AND unit_name ILIKE %L',
          '  LIMIT $3',
          ') AS shortlist',
          'ORDER BY distance ASC'
        ].join('\n'), not, '%' + dbQuery + '%'),
        values: [place.coordinates[1], place.coordinates[0], limit]
      };

      return callback(null, fullQuery);
    });

  } else if (data._query.with && data._query.with.length) { //Has ammenities filter

    //
    // Split activities into an array
    //
    queryArray = sanitizer.sanitize(data._query.with).split('+');

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
        'cpad_superunits_4326.superunit_id,',
        '*',
        'FROM (',
        '  SELECT',
        '  su_id,',
        '  activities,',
        '  %s',
        '  FROM site_hipcamp_activities',
        ') act',
        'INNER JOIN cpad_superunits_4326 ON cpad_superunits_4326.superunit_id = act.su_id',
        'WHERE %s',
        '  AND unit_name ILIKE %L'
      ].join('\n'), activitiesColumnSQLslug, activitiesWhereSQLslug, '%' + dbQuery + '%')
    };

    console.log(fullQuery.text);

    return callback(null, fullQuery);

  } else {
    fullQuery = {
      text: escape([
        'SELECT *',
        'FROM cpad_superunits_4326',
        'WHERE unit_name ILIKE %L'
      ].join('\n'), '%' + dbQuery + '%')
    };

    return callback(null, fullQuery);
  }
}

module.exports = function(data, _callback) {

  var dbLimit = '',
      dbQuery = '', // default
      searchQuery;

  return pg.connect(env.require('DATABASE_URL'), function(err, client, done) {
    var callback = function() {
      done();
      return _callback.apply(null, arguments);
    };

    if (data.limit) {
      dbLimit = ' LIMIT ' + data.limit;
    }

    searchQuery = data.query || data._query.q;

    if (searchQuery) {
      dbQuery = sanitizer.sanitize(searchQuery.toLowerCase()).split('+').join(' ') || sanitizer.sanitize(dbQuery);
    }

    buildQuery(dbQuery, data, function(err, fullQuery) {

      if (err) {
        return callback(err);
      }

      return client.query(fullQuery, function(err, result) {
        if(err) {
          console.error('error running query', err);
          return callback(err);
        }

        return callback(null, {
          parks : result.rows,
          title : sanitizer.sanitize(dbQuery)
        });
      });
    });

  });
};
