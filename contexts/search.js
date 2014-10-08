'use strict';

var env       = require('require-env'),
    pg        = require('pg'),
    sanitizer = require('sanitizer'),
    getPlace  = require('../library/get-place.js');

function buildQuery(dbQuery, data, callback) {

  var fullQuery, activitiesColumnSQLslug, activitiesWhereSQLslug, queryArray;

  //
  // Decide which kind of search this is
  //

  if (data._query.with && data._query.with.length && data._query.near && data._query.near.length) { //Has ammenities & near filter

    // With
    //
    // Split acivities into an array
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
    var limit         = ((data.options) ? data.options.limit : null) || 100000,
      not           = ((data.options) ? data.options.not : null) ? ' AND superunit_id <> ' + parseInt(data.options.not) : '';

    getPlace(data._query.near, function(err, place) {

      if (err) {
        callback(err);
      }

      fullQuery = {
        text   : "select *, ST_AsGeoJSON(geom) as geometry, ST_AsGeoJSON(ST_Centroid(geom)) as centroid, ST_distance(geom, st_setsrid(st_makepoint($1,$2),4326)) as distance FROM (select * from cpad_superunits_4326 INNER JOIN (SELECT su_id, activities, "+activitiesColumnSQLslug+" FROM site_hipcamp_activities) act on act.su_id=cpad_superunits_4326.superunit_id WHERE ST_DWithin(geom, st_setsrid(st_makepoint($1,$2),4326), .3)"+not+" AND unit_name iLIKE '%" + dbQuery.split("'").join("") + "%' LIMIT $3) as shortlist order by distance asc;",
        values : [place.coordinates[1],place.coordinates[0],limit]
      }

      return callback(null,fullQuery);

    });

  } else if (data._query.near && data._query.near.length) { //Has near filter

    var limit         = ((data.options) ? data.options.limit : null) || 100000,
      not           = ((data.options) ? data.options.not : null) ? ' AND superunit_id <> ' + parseInt(data.options.not) : '';

    getPlace(data._query.near, function(err, place) {

      if (err) {
        callback(err);
      }

      fullQuery = {
        text   : 'select *, ST_AsGeoJSON(geom) as geometry, ST_AsGeoJSON(ST_Centroid(geom)) as centroid, ST_distance(geom, st_setsrid(st_makepoint($1,$2),4326)) as distance from (select * from cpad_superunits_4326 where ST_DWithin(geom, st_setsrid(st_makepoint($1,$2),4326), .3)'+not+' AND unit_name iLIKE \'%' + dbQuery.split("'").join("") + '%\' LIMIT $3) as shortlist order by distance asc;',
        values : [place.coordinates[1],place.coordinates[0],limit]
      }

      return callback(null,fullQuery);

    });

  } else if (data._query.with && data._query.with.length) { //Has ammenities filter

    //
    // Split acivities into an array
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

    fullQuery = {"text":"SELECT cpad_superunits_4326.superunit_id, * FROM (SELECT su_id, activities, "+activitiesColumnSQLslug+" FROM site_hipcamp_activities) act INNER JOIN cpad_superunits_4326 ON cpad_superunits_4326.superunit_id=act.su_id WHERE " + activitiesWhereSQLslug + ' AND unit_name iLIKE \'%' + dbQuery.split("'").join("") + '%\''}
    return callback(null,fullQuery);

  } else {
    fullQuery = {"text":'SELECT * FROM cpad_superunits_4326 WHERE unit_name iLIKE \'%' + dbQuery.split("'").join("") + '%\'' + dbLimit};
    return callback(null,fullQuery);
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
        callback(err);
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
