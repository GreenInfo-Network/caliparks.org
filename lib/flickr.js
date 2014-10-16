"use strict";

var env = require("require-env"),
    pg = require("pg");

var DATABASE_URL = env.require("DATABASE_URL");

var getPhotosForPark = function(parkId, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  photoid,",
      "  owner,",
      "  secret,",
      "  server,",
      "  farm,",
      "  title,",
      "  latitude,",
      "  longitude,",
      "  accuracy,",
      "  woeid,",
      "  tags,",
      "  dateupload,",
      "  datetaken,",
      "  ownername,",
      "  description,",
      "  license,",
      "  o_width,",
      "  o_height,",
      "  url_l,",
      "  height_l",
      "  width_l",
      "FROM site_park_flickr_photos",
      "WHERE containing_park_id = $1",
      "LIMIT 9000"
    ].join("\n");

    return client.query(query, [parkId], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      return callback(null, result.rows);
    });
  });
};

module.exports = {
  getPhotosForPark: getPhotosForPark
};
