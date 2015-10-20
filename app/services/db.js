'use strict';

import pg from 'pg';
import util from 'util';
import {Promise} from 'es6-promise';

const DATABASE_URL = process.env.DATABASE_URL || null;
const BASE_PHOTO_ATTRIBUTES = [
  "  photos.photo_id AS photoid,",
  "  COALESCE(NULLIF(photos.metadata ->> 'caption', 'null')::json, '{ \"caption\": { \"text\": \"\" } }'::json) -> 'text' AS title,",
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
  "  photos.metadata -> 'user' -> 'username' AS username,",
  "  photos.metadata -> 'user' -> 'website' AS website,",
  "  photos.metadata -> 'user' -> 'profile_picture' AS profile_picture,",
  "  photos.metadata -> 'user' -> 'bio' AS bio,",
  "  photos.metadata -> 'user' -> 'id' AS userid,",
  "  ST_X(photos.geom) as lng,",
  "  ST_Y(photos.geom) as lat"
];

/**
 * Wrapper for database calls
 */
var database = {
  photos: function(options) {
    options = options || {};

    return new Promise((resolve, reject) => {
      if (!DATABASE_URL) return reject('No DATABASE_URL!');

      pg.connect(DATABASE_URL, (err, client, done) => {
        if (err) {
          done();
          return reject(err);
        }

        var query =
          ["SELECT",
          "  cpad.superunit_id AS su_id,",
          "  cpad.unit_name AS su_name,"].concat(BASE_PHOTO_ATTRIBUTES).concat([
          "FROM instagram_photos photos",
          "JOIN cpad_superunits cpad ON cpad.superunit_id = photos.superunit_id",
          "ORDER BY (photos.metadata->>'created_time')::int DESC",
          "OFFSET 0",
          "LIMIT $1"
          ]).join('\n');

        return client.query(query, [options.limit || '20'], (err, result) => {
          done();

          if (err) {
            return reject(err);
          }

          resolve(util.isArray(result.rows) ? result.rows : []);
        });
      });
    });
  }
};

module.exports = database;
