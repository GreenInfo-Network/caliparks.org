'use strict';

module.exports = function(data, callback) {

  var pg = require('pg');

  var context   = require('../public/data/context-instagram-photos.json'),
      match_map = {};

  function finish(context) {

    callback(null, {
      parks : context,
      title : 'Most Instagram photos'
    });

  }

  //
  // If the caller already has an array of parks it can be
  // passed in an ordered. Otherwise, the db will be called
  // for the park metadata
  //
  if (typeof data.mixData === 'array') {

      finish(context);

  } else {
    pg.connect('postgres://eric@localhost/eric', function(err, client, cb) {

      client.query('select su_id, unit_name from site_park', function(err, response) {

        response.rows.forEach(function(park) {
          match_map[park.su_id] = park;
        });

        finish(context.map(function(item) {
          //
          // Actually just return the db record
          //
          return match_map[item.su_id];
        }));
      });

    })
  }

}