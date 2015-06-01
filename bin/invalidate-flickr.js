#!/usr/bin/env node
"use strict";

var http = require("http"),
    stream = require("stream"),
    util = require("util");

var async = require("async"),
    env = require("require-env"),
    pg = require("pg"),
    request = require("request");

var Balancer = require("../lib/balancer");

var DATABASE_URL = env.require("DATABASE_URL");

http.globalAgent.maxSockets = 75;

var unlockPhoto = function(id, callback) {
  callback = callback || function(err) {
    if (err) {
      console.warn(err.stack);
    }
  };

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    var query = "UPDATE flickr_photos SET locked_at = NULL WHERE id = $1";

    return client.query(query, [id], function() {
      done();

      return callback.apply(null, arguments);
    });
  });
};

var source = new stream.Readable({
  objectMode: true
});

var fetching = false;

source._read = function(size) {
  // only fetch 1 batch at a time
  if (fetching) {
    return;
  }

  fetching = true;

  var batchSize = 1000,
      buffering = true,
      self = this;

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      console.warn(err.stack);
      return;
    }

    return async.whilst(function() {
      return buffering;
    }, function(callback) {
      var query = client.query.bind(client),
          select = [
              "SELECT id, metadata -> 'url_s' AS url, last_checked",
              "FROM flickr_photos",
              "WHERE locked_at IS NULL",
              "  AND (metadata ->> 'height_m')::integer < (metadata ->> 'width_m')::integer",
              "  AND (last_checked IS NULL OR last_checked <= NOW() - interval '30 days')",
              "ORDER BY COALESCE(last_checked, '2014-10-04'::timestamp with time zone) ASC",
              "LIMIT $1"
            ].join("\n"),
          update = "UPDATE flickr_photos SET locked_at = NOW() WHERE id IN";

      // perform queries in a transaction to prevent visibility leakage
      return async.series([
        async.apply(query, "BEGIN"),
        async.apply(async.waterfall, [
          async.apply(query, select, [batchSize]),
          function(result, done) {
            if (result.rows.length === 0) {
              return done(null, result.rows);
            }

            var placeholders = [];

            // extract the region ids and create placeholders for them
            var regionIds = result.rows.map(function(row, i) {
              placeholders.push("$" + (i + 1));

              return row.id;
            });

            // tweak the UPDATE string to include placeholders
            update += util.format(" (%s)", placeholders.join(", "));

            return query(update, regionIds, function(err) {
              // use a custom callback to propagate rows forward
              return done(err, result.rows);
            });
          }
        ]),
        async.apply(query, "COMMIT")
      ], function(err, result) {
        if (err) {
          // rollback and report the original error
          return query("ROLLBACK", function(e) {
            if (e) {
              console.warn("ROLLBACK failed:", e.stack);
            }

            // release the client back into the pool
            done();

            // propagate the error
            return callback(err);
          });
        }

        // release the client back into the pool
        done();

        var rows = result[1];

        if (rows.length === 0) {
          // all caught up / everything is locked
          console.log("No more photos to check.");
          self.push(null);
        }

        rows.forEach(function(row) {
          buffering = self.push(row);
        });

        return callback();
      });
    }, function(err) {
      done();

      if (err) {
        console.warn("Fetch failed:", err.stack);
      }

      fetching = false;
    });
  });
};

var Checker = function() {
  stream.Writable.call(this, {
    objectMode: true,
    highWaterMark: 1
  });

  this._write = function(obj, _, callback) {
    return request.head(obj.url, function(err, rsp) {
      if (err) {
        console.warn(err);

        return unlockPhoto(obj.id, function(err) {
          if (err) {
            console.warn(err.stack);
          }

          // swallow any errors
          return callback();
        });
      }

      if (rsp.statusCode === 200) {
        process.stdout.write(".");
        return pg.connect(DATABASE_URL, function(err, client, done) {
          if (err) {
            console.warn(err);
            return callback();
          }

          return client.query("UPDATE flickr_photos SET last_checked = NOW(), locked_at = NULL WHERE id = $1", [obj.id], function(err) {
            done();

            if (err) {
              console.warn(err);
            }

            return callback();
          });
        });
      }

      if (rsp.statusCode !== 200) {
        console.log("No longer valid:", obj.url);
        return pg.connect(DATABASE_URL, function(err, client, done) {
          if (err) {
            console.warn(err);
            return callback();
          }

          return client.query("DELETE FROM flickr_photos WHERE id = $1", [obj.id], function(err) {
            done();

            if (err) {
              console.warn(err);
            }

            return callback();
          });
        });
      }

      return callback();
    });
  };
};

util.inherits(Checker, stream.Writable);

var balancer = new Balancer(),
    concurrency = 32;

for (var i = 0; i < concurrency; i++) {
  balancer.push(new Checker());
}

source
  .pipe(balancer);
