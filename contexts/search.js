'use strict';

var env       = require('require-env'),
    pg        = require('pg'),
    sanitizer = require('sanitizer');

module.exports = function(data, _callback) {

  var dbLimit = '',
      dbQuery = 'yosemite', // default
      searchQuery, fullQuery;

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

    //
    // Decide which kind of search this is
    //

    if (_query.with.length && _query.near.length) { //Has ammenities & near filter

      fullQuery = '';

    else if (_query.near.length) { //Has near filter

      fullQuery = '';

    } else if (_query.with.length) { //Has ammenities filter

      fullQuery = '';

    } else {
      fullQuery = 'SELECT * FROM cpad_2013b_superunits_ids_4326 WHERE LOWER( unit_name ) LIKE \'%' + dbQuery.split("'").join("") + '%\'' + dbLimit;
    }

    return client.query({"name":"sitesearch","text":fullQuery}, function(err, result) {
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
