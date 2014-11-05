"use strict";

var env = require("require-env"),
    pg = require("pg");

var DATABASE_URL = env.require("DATABASE_URL");

var getTweetsForPark = function(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  id_str,",
      "  place,",
      "  coords,",
      "  username,",
      "  fullname,",
      "  client,",
      "  date,",
      "  retweet_count,",
      "  favorite_count,",
      "  lang,",
      "  content",
      "FROM site_tweets",
      "WHERE su_id = $1",
      "OFFSET $2",
      "LIMIT $3"
    ].join("\n");

    return client.query(query, [parkId, options.startat || '0', options.limit || '20'], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      return callback(null, result.rows);
    });
  });
};

module.exports = {
  getTweetsForPark: getTweetsForPark
};
