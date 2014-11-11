"use strict";

var env = require("require-env"),
    pg = require("pg");

var DATABASE_URL = env.require("DATABASE_URL");

var getPark = function(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  superunit_id, unit_name, mng_ag_id, mng_agncy, access_typ, gis_acres,",
      "  ST_AsGeoJSON(ST_Envelope(geom)) AS bbox,",
      "  ST_AsGeoJSON(ST_Centroid(geom)) AS centroid",
      "FROM cpad_superunits_4326",
      "WHERE superunit_id = $1"
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

var getParkStats = function(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  superunit_id,",
      " flickr_photo_count,",
      " instagram_photo_count,",
      " foursquare_tip_count,",
      " foursquare_venue_count,",
      " swarm_checkin_count,",
      " tweet_count",
      "FROM park_stats",
      "WHERE superunit_id = $1"
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
  getPark: getPark,
  getParkStats: getParkStats
};
