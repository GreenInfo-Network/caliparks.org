'use strict';

module.exports = function(data, callback) {

  var pg      = require('pg'),
      request = require('request');

  var dbCon          = process.env.DATABASE_URL,
      pgClient       = new pg.Client(dbCon);

  var dbLimit = '',
      dbQuery = '',
      isLatLongTest = /^-?\d*.\d*\,-?\d*.\d*$/,
      limit         = ((data.options) ? data.options.limit : null) || 100000,
      not           = ((data.options) ? data.options.not : null) ? ' AND su_id <> ' + parseInt(data.options.not) : '',
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

  function cpadRowFilter(item, i, array) {
    delete item.geom;
    return item;
  }

  pgClient.connect(function(err) {

    if(err) {
      return console.error('could not connect to postgres', err);
    }

    if (data.query) {

      getPlace(function(error, place) {
        pgClient.query('select *, ST_AsGeoJSON(geom) as geometry, ST_AsGeoJSON(ST_Centroid(geom)) as centroid, ST_distance(geom, st_setsrid(st_makepoint('+place.coordinates[1]+','+place.coordinates[0]+'),4326)) as distance from (select * from cpad_2013b_superunits_ids_4326 where ST_DWithin(geom, st_setsrid(st_makepoint('+place.coordinates[1]+','+place.coordinates[0]+'),4326), .2)'+not+' LIMIT '+limit+') as shortlist order by distance asc;', function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }

          callback(null, {
            parks : result.rows.map(cpadRowFilter),
            title : place.details ? 'near ' + place.details.name : 'nearby'
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
