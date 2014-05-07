'use strict';

var pg        = require('pg'),
    sanitizer = require('sanitizer');

module.exports = function(data, callback) {

  var dbCon          = process.env.DATABASE_URL,
      pgClient       = new pg.Client(dbCon);

  var dbLimit = '',
      dbQuery = '',
      searchQuery;

    pgClient.connect(function(err) {

    if(err) {
      return console.error('could not connect to postgres', err);
    }

    if (data.limit) {
      dbLimit = ' LIMIT ' + data.limit;
    }

    searchQuery = data.query || data._query.q;

    if (searchQuery) {
      dbQuery = sanitizer.sanitize(searchQuery.toLowerCase()).split('+').join(' ') || 'yosemite';
    }

    pgClient.query('SELECT * FROM cpad_2013b_superunits_ids_4326 WHERE LOWER( unit_name ) LIKE \'%' + dbQuery + '%\'' + dbLimit + ';', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }

      callback(null, {
        parks : result.rows,
        title : sanitizer.sanitize(dbQuery)
      });


      pgClient.end();
    });

  });

}
