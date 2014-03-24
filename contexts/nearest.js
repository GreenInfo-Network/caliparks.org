'use strict';

module.exports = function(data, callback) {

  var pg      = require('pg'),
      request = require('request');

  var dbCon          = process.env.DATABASE_URL,
      pgClient       = new pg.Client(dbCon);

  var dbLimit = '',
      dbQuery = '',
      isLatLongTest = /^-?\d*.\d*\,-?\d*.\d*$/,
      thisPlace, loc, res;

  function getPlace(callback) {

    if (data.query && isLatLongTest.test(data.query)) {
      loc = data.query.split(',');

      request('http://api.tiles.mapbox.com/v3/stamen.hckn2ljm/geocode/'+loc[1]+','+loc[0]+'.json', function (error, response, body) {
        if (error) {
          return callback(error);
        }

        callback(null, {
          'coordinates' : loc,
          'details'     : JSON.parse(body).results[0][0]
        });
      });
    } else if(data.query) {

      request('http://api.tiles.mapbox.com/v3/stamen.hckn2ljm/geocode/'+data.query+'.json', function (error, response, body) {
        if (error) {
          return callback(error);
        }

        res = JSON.parse(body).results[0][0];

        callback(null, {
          'coordinates' : [res.lat, res.lon],
          'details'     : res
        });
      });

    } else {
      callback(null,null);
    }

  }

  pgClient.connect(function(err) {

    if(err) {
      return console.error('could not connect to postgres', err);
    }

    if (data.query) {

      getPlace(function(error, place) {
        pgClient.query('select *, ST_distance(geom, st_setsrid(st_makepoint('+place.coordinates[1]+','+place.coordinates[0]+'),4326)) as distance from (select * from cpad_2013b_superunits_ids_4326 where ST_DWithin(geom, st_setsrid(st_makepoint('+place.coordinates[1]+','+place.coordinates[0]+'),4326), .2)) as shortlist order by distance asc;', function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }

          callback(null, {
            parks : result.rows,
            title : 'near ' + place.details.name
          });


          pgClient.end();
        });
      });

    } else {
      callback(null, {
        parks : [],
        title : 'near you'
      });
    }

  });

}
