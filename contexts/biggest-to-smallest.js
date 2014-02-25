'use strict';

module.exports = function(data, callback) {

  var pg = require('pg');

  var dbCon          = process.env.DATABASE_URL,
      pgClient       = new pg.Client(dbCon);

  var dbLimit = '';

    pgClient.connect(function(err) {

    if(err) {
      return console.error('could not connect to postgres', err);
    }

    if (data.limit) {
      dbLimit = ' LIMIT ' + data.limit;
    }

    pgClient.query('SELECT su_id, unit_name FROM site_park ORDER BY park_area Desc' + dbLimit + ';', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }

      callback(null, {
        parks : result.rows,
        title : 'Biggest to smallest'
      });


      pgClient.end();
    });

  });

}