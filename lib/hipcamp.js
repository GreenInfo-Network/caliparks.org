"use strict";

var env = require("require-env"),
    pg = require("pg");

var DATABASE_URL = env.require("DATABASE_URL");

var getActivitiesForPark = function(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  *",
      "FROM site_hipcamp_activities",
      "WHERE su_id=$1"
    ].join("\n");

    return client.query(query, [parkId], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      return callback(null, result.rows[0]);
    });
  });
};

module.exports = {
  getActivitiesForPark: getActivitiesForPark
};
