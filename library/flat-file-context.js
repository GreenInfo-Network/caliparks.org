'use strict';

var pg = require('pg');

var contexts = {};

module.exports = function(options) {
  if (contexts[options.name] === undefined) {
    contexts[options.name] = require('../public/data/context-' + options.name + '.json');
  }

  var context = contexts[options.name];

  return function(data, callback) {

      var theseOptions = options;

      if (!options.name) {
        return callback('You need to pass a name parameter');
      }

      if (!options.query) {
        return callback('You need to pass a query parameter');
      }

      if (!options.title) {
        return callback('You need to pass a title parameter');
      }

      var match_map = {};

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
        pg.connect(process.env.DATABASE_URL, function(err, client, cb) {

          if (err) {
            return console.error(err);
          }

          client.query(theseOptions.query, function(err, response) {

            if (err) {
              return console.error(err);
            }

            response.rows.forEach(function(park) {
              match_map[park.su_id] = park;
            });

            cb();

            finish(context.map(function(item) {
              //
              // Actually just return the db record
              //
              return match_map[item.su_id];
            }));
          });

        });
      }

  }

}