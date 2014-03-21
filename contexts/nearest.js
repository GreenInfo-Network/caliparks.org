'use strict';

module.exports = function(data, callback) {
  var loc;

  var pg      = require('pg'),
      request = require('request');

  var dbCon          = process.env.DATABASE_URL,
      pgClient       = new pg.Client(dbCon);

  var dbLimit = '',
      dbQuery = '',
      thisPlace;

    pgClient.connect(function(err) {

    if(err) {
      return console.error('could not connect to postgres', err);
    }

    if (data.query) {
      loc = data.query.split(',');
    }

    if (data.query) {

      request('http://api.tiles.mapbox.com/v3/stamen.hckn2ljm/geocode/'+loc[1]+','+loc[0]+'.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            thisPlace = JSON.parse(body).results[0][0];

            pgClient.query('select *, ST_distance(geom, st_setsrid(st_makepoint('+loc[1]+','+loc[0]+'),4326)) as distance from (select * from cpad_2013b_superunits_ids_4326 where ST_DWithin(geom, st_setsrid(st_makepoint('+loc[1]+','+loc[0]+'),4326), .2)) as shortlist order by distance asc;', function(err, result) {
              if(err) {
                return console.error('error running query', err);
              }

              callback(null, {
                parks : result.rows,
                title : 'near ' + thisPlace.name
              });


              pgClient.end();
            });
        }
      });

    } else {
      callback(null, {
        parks : [],
        title : 'near you'
      });
    }

  });

}
