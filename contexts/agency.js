'use strict';

module.exports = function(data, callback) {

  var pg = require('pg');

  var dbCon          = process.env.DATABASE_URL,
      pgClient       = new pg.Client(dbCon);

  var dbLimit = '',
      dbQuery = '';

    pgClient.connect(function(err) {

    if(err) {
      return console.error('could not connect to postgres', err);
    }

    if (data.limit) {
      dbLimit = ' LIMIT ' + data.limit;
    }

    if (data.query) {
      dbQuery = data.query.split('+').join(' ') || 'California Department of Parks and Recreation';
    }

    pgClient.query('SELECT * FROM site_park WHERE agncy_name LIKE \'' + dbQuery + '%\'' + dbLimit + ';', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }

      callback(null, {
        parks : result.rows,
        title : dbQuery
      });


      pgClient.end();
    });

  });

}
