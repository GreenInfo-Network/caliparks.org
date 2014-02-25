'use strict';

module.exports = function(options) {

  return function(data, callback) {

      if (!options.name) {
        return callback('You need to pass a name parameter');
      }

      if (!options.query) {
        return callback('You need to pass a query parameter');
      }

      if (!options.title) {
        return callback('You need to pass a title parameter');
      }

      var pg = require('pg');

      var context   = require('../public/data/context-' + options.name + '.json'),
          match_map = {};

      function finish(context) {

        callback(null, {
          parks : context,
          title : options.title
        });

      }

      //
      // If the caller already has an array of parks it can be
      // passed in an ordered. Otherwise, the db will be called
      // for the park metadata
      //
      if (typeof data.mixData === "object") {

          data.mixData.forEach(function(park) {
              match_map[park.su_id] = park;
          });

          finish(context.map(function(item) {
            //
            // Actually just return the db record
            //
            return match_map[item.su_id];
          }));

      } else {
        pg.connect('postgres://eric@localhost/eric', function(err, client, cb) {

          client.query(options.query, function(err, response) {

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

}