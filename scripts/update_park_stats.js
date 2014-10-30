"use strict";

var async = require("async"),
    env = require("require-env"),
    pg = require("pg");

pg.connect(env.require("DATABASE_URL"), function(err, client, done) {
  if (err) {
    throw err;
  }

  var query = client.query.bind(client);

  return async.parallel({
    flickrPhotos: function(callback) {
      return query("SELECT superunit_id, COUNT(id) AS count FROM flickr_photos GROUP BY superunit_id", function(err, result) {
        if (err) {
          throw err;
        }

        return async.forEach(result.rows, function(row, done) {
          query("UPDATE park_stats SET flickr_photo_count = $1 WHERE superunit_id = $2", [row.count, row.superunit_id], done);
        }, callback);
      });
    },
    instagramPhotos: function(callback) {
      return query("SELECT superunit_id, COUNT(id) AS count FROM instagram_photos GROUP BY superunit_id", function(err, result) {
        if (err) {
          throw err;
        }

        return async.forEach(result.rows, function(row, done) {
          query("UPDATE park_stats SET instagram_photo_count = $1 WHERE superunit_id = $2", [row.count, row.superunit_id], done);
        }, callback);
      });
    },
    foursquareTips: function(callback) {
      return query("SELECT su_id AS superunit_id, COALESCE(SUM(tipcount), 0) AS count FROM site_foursquare_venues_activity GROUP BY su_id", function(err, result) {
        if (err) {
          throw err;
        }

        return async.forEach(result.rows, function(row, done) {
          query("UPDATE park_stats SET foursquare_tip_count = $1 WHERE superunit_id = $2", [row.count, row.superunit_id], done);
        }, callback);
      });
    },
    foursquareVenues: function(callback) {
      return query("SELECT su_id AS superunit_id, COUNT(id) AS count FROM site_foursquare_venues_activity GROUP BY su_id", function(err, result) {
        if (err) {
          throw err;
        }

        return async.forEach(result.rows, function(row, done) {
          query("UPDATE park_stats SET foursquare_venue_count = $1 WHERE superunit_id = $2", [row.count, row.superunit_id], done);
        }, callback);
      });
    },
    swarmCheckIns: function(callback) {
      return query("SELECT su_id AS superunit_id, COALESCE(SUM(checkinscount), 0) AS count FROM site_foursquare_venues_activity GROUP BY su_id", function(err, result) {
        if (err) {
          throw err;
        }

        return async.forEach(result.rows, function(row, done) {
          query("UPDATE park_stats SET swarm_checkin_count = $1 WHERE superunit_id = $2", [row.count, row.superunit_id], done);
        }, callback);
      });
    },
    tweets: function(callback) {
      return query("SELECT su_id AS superunit_id, COUNT(id_str) AS count FROM site_tweets GROUP BY su_id", function(err, result) {
        if (err) {
          throw err;
        }

        return async.forEach(result.rows, function(row, done) {
          query("UPDATE park_stats SET tweet_count = $1 WHERE superunit_id = $2", [row.count, row.superunit_id], done);
        }, callback);
      });
    }
  }, function(err) {
    done();

    if (err) {
      throw err;
    }

    pg.end();
  });
});
