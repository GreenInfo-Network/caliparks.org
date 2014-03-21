'use strict';

module.exports = function(data, callback) {
  var loc;

  var pg = require('pg');

  var dbCon          = process.env.DATABASE_URL,
      pgClient       = new pg.Client(dbCon);

  var dbLimit = '',
      dbQuery = '';

    pgClient.connect(function(err) {

    if(err) {
      return console.error('could not connect to postgres', err);
    }

    if (data.query) {
      loc = data.query.split(',');
    }

    if (data.query) {

      pgClient.query('select *, ST_Distance(geom, st_setsrid(st_makepoint('+loc[1]+','+loc[0]+'),4326)) as distance from cpad_2013b_superunits_ids_4326 order by distance asc;', function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }

        callback(null, {
          parks : result.rows,
          title : 'near ' + parseFloat(loc[0]).toFixed(5) + ',' + parseFloat(loc[1]).toFixed(5)
        });


        pgClient.end();
      });

    } else {
      callback(null, {
        parks : [],
        title : 'near you'
      });
    }

  });

}
