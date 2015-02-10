"use strict";

var env  = require("require-env"),
    pg   = require("pg"),
    util = require("util");

var DATABASE_URL = env.require("DATABASE_URL");

var getVenuesForPark = function(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  venue_id,",
      "  metadata",
      "FROM foursquare_venues",
      "WHERE superunit_id = $1",
      "OFFSET $2",
      "LIMIT $3"
    ].join("\n");

    return client.query(query, [parkId, options.startat || "0", options.limit || "20"], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      return callback(null, util.isArray(result.rows) ? result.rows : []);
    });
  });
};

module.exports = {
  getVenuesForPark: getVenuesForPark
};
