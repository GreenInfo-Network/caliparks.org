'use strict';

var env      = require('require-env'),
    pg       = require('pg'),
    getPlace = require('../library/get-place.js');

module.exports = function(data, callback) {

  var limit         = ((data.options) ? data.options.limit : null) || 100000,
      not           = ((data.options) ? data.options.not : null) ? ' AND su_id <> ' + parseInt(data.options.not) : '';


  function cpadRowFilter(item, i, array) {
    delete item.geom;
    return item;
  }

  pg.connect(env.require('DATABASE_URL'), function(err, client, done) {
    var _callback = callback;

    callback = function(err) {
      done();
      return _callback.apply(null, arguments);
    };

    if (err) {
      return callback(err);
    }

    if (data.query) {
      getPlace(data.query, function(err, place) {

        if (err) {
          return callback(err);
        }

        client.query({
          text   : 'select *, ST_AsGeoJSON(geom) as geometry, ST_AsGeoJSON(ST_Centroid(geom)) as centroid, ST_distance(geom, st_setsrid(st_makepoint($1,$2),4326)) as distance from (select * from cpad_2013b_superunits_ids_4326 where ST_DWithin(geom, st_setsrid(st_makepoint($1,$2),4326), .3)'+not+' LIMIT $3) as shortlist order by distance asc;',
          values : [place.coordinates[1],place.coordinates[0],limit]
        }, function(err, result) {
          if(err) {
            return callback(err);
          }

          return callback(null, {
            parks : result.rows.map(cpadRowFilter),
            title : place.details && place.details.name ? 'near ' + place.details.name : 'nearby'
          });
        });
      });

    } else {
      return callback(null, {
        parks : [],
        title : 'near you'
      });
    }

  });
};
