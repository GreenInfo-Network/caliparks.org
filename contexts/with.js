'use strict';

var env       = require('require-env'),
    pg        = require('pg'),
    sanitizer = require('sanitizer');

module.exports = function(data, _callback) {

  var dbLimit = '',
      dbQuery = 'camping', // default
      activitiesColumnSQLslug, activitiesWhereSQLslug, queryArray;

  return pg.connect(env.require('DATABASE_URL'), function(err, client, done) {
    var callback = function() {
      done();
      return _callback.apply(null, arguments);
    };

    if (err) {
      console.error('could not connect to postgres', err);
      return callback(err);
    }

    if (data.limit) {
      dbLimit = ' LIMIT ' + data.limit;
    }

    //
    // Use what the user has passed in and fall back on camping if needed
    //
    dbQuery = (data.query.length) ? data.query : dbQuery;

    //
    // Split acivities into an array
    //
    queryArray = dbQuery.split('+');

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

    return client.query({"name":"amenities","text":"SELECT cpad_2013b_superunits_ids_4326.su_id, activities, agncy_web, own_type, agncy_lev, agncy_name, agncy_id, superunit, label_name, unit_name FROM (SELECT su_id, activities, "+activitiesColumnSQLslug+" FROM site_hipcamp_activities) act INNER JOIN cpad_2013b_superunits_ids_4326 ON cpad_2013b_superunits_ids_4326.su_id=act.su_id WHERE " + activitiesWhereSQLslug}, function(err, result) {
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
};
