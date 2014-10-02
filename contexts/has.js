'use strict';

var env       = require('require-env'),
    pg        = require('pg'),
    sanitizer = require('sanitizer');

module.exports = function(data, _callback) {

  var dbLimit = '',
      dbQuery = 'camping', // default
      searchQuery;

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

    searchQuery = data.query || data._query.q;

    if (searchQuery) {
      dbQuery = sanitizer.sanitize(searchQuery.toLowerCase()).split('+').join(' ') || sanitizer.sanitize(dbQuery);
    }

    console.log('query', dbQuery);

    /*
    return client.query('SELECT * FROM cpad_2013b_superunits_ids_4326 INNER JOIN site_hipcamp_activities ON site_hipcamp_activities.su_id=site_hipcamp_activities.su_id WHERE ' + dbLimit, function(err, result) {
      if(err) {
        console.error('error running query', err);
        return callback(err);
      }

      return callback(null, {
        parks : result.rows,
        title : sanitizer.sanitize(dbQuery)
      });
    });
*/
  });
};
