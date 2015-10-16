'use strict';

import env from 'require-env';
import pg from 'pg';
import util from 'util';

const DATABASE_URL = env.require('DATABASE_URL');

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


var getLatestPhotos = (options, callback) => {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
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

    return client.query(query, [options.limit || '20'], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      return callback(null, util.isArray(result.rows) ? result.rows : []);
    });
  });
};

var getRecentParks = (options, callback) => {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query =
      ["SELECT",
      " q2.unit_name AS su_name,",
      " q2.superunit_id AS su_id,"].concat(BASE_PHOTO_ATTRIBUTES).concat([
      "FROM (",
      " select count(*), cpad.unit_name, cpad.superunit_id, MIN(q1.id) as min_id, MAX(q1.id) as max_id",
      " from (select * FROM instagram_photos photos",
      " WHERE (photos.metadata->>'created_time')::int >= cast(extract(epoch from current_timestamp - interval '6 days') as integer)) as q1",
      " JOIN cpad_superunits cpad ON cpad.superunit_id = q1.superunit_id GROUP BY cpad.unit_name, cpad.superunit_id order by count DESC limit 10) as q2",
      " JOIN instagram_photos photos ON q2.min_id = photos.id"
      ]).join('\n');

    return client.query(query, [], function(err, result) {
      done();

      if (err) {
        console.log(err);
        return callback(err);
      }

      return callback(null, util.isArray(result.rows) ? result.rows : []);
    });
  });
};


module.exports = {
  getLatestPhotos: getLatestPhotos,
  getRecentParks: getRecentParks
};