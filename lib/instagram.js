"use strict";

var env = require("require-env"),
    pg = require("pg");

var DATABASE_URL = env.require("DATABASE_URL");

var getPhotosForPark = function(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  cpad.superunit_id AS su_id,",
      "  cpad.unit_name AS su_name,",
      "  photos.photo_id AS photoid,",
      "  photos.metadata -> 'attribution' AS attribution,",
      "  photos.metadata -> 'location' -> 'name' AS placename,",
      "  photos.metadata -> 'location' -> 'id' AS placeid,",
      "  photos.metadata -> 'comments' -> 'count' AS commentcount,",
      "  photos.metadata -> 'filter' AS filter,",
      "  photos.metadata -> 'created_time' AS created_time,",
      "  photos.metadata -> 'link' AS link,",
      "  photos.metadata -> 'likes' -> 'count' AS likescount,",
      "  photos.metadata -> 'images' -> 'standard_resolution' -> 'url' AS standard_resolution,",
      "  photos.metadata -> 'images' -> 'standard_resolution' -> 'width' AS width,",
      "  photos.metadata -> 'images' -> 'standard_resolution' -> 'height' AS height,",
      "  photos.metadata -> 'caption' -> 'text' AS caption,",
      "  photos.metadata -> 'user' -> 'username' AS username,",
      "  photos.metadata -> 'user' -> 'website' AS website,",
      "  photos.metadata -> 'user' -> 'profile_picture' AS profile_picture,",
      "  photos.metadata -> 'user' -> 'bio' AS bio,",
      "  photos.metadata -> 'user' -> 'id' AS userid",
      "FROM instagram_photos photos",
      "JOIN cpad_superunits cpad ON cpad.superunit_id = photos.superunit_id",
      "WHERE photos.superunit_id = $1",
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
  getPhotosForPark: getPhotosForPark
};
