"use strict";

var util = require("util");

var _ = require("highland"),
    async = require("async"),
    env = require("require-env"),
    pg = require("pg"),
    request = require("request"),
    retry = require("retry");

var Balancer = require("./balancer"),
    Worker = require("./worker");

var DATABASE_URL = env.require("DATABASE_URL"),
    INSTAGRAM_CLIENT_ID = env.require("INSTAGRAM_CLIENT_ID"),
    // noop that throws errors (to make them trackable)
    NOOP = function(err) {
      if (err) {
        throw err;
      }
    };

function queryInstagramAPI(lat, lng, radius, callback) {
  console.log("[*] query Instagram with center (%d, %d) and radius %d", lat.toFixed(4), lng.toFixed(4), radius);

  var operation = retry.operation({
    randomize: true
  });

  return operation.attempt(function(currentAttempt) {
    return request({
      url: "https://api.instagram.com/v1/media/search",
      json: true,
      qs: {
        lat: lat,
        lng: lng,
        count: 200,       // 100 seems to be their maximum
        max_id: 1,       //  Trying to trigger pagination by setting this? doesn't work.
        distance: radius,
        client_id: INSTAGRAM_CLIENT_ID,
        // TODO "time span must not exceed 7 days"
        min_timestamp: ~~(Date.now() / 1000) - 60*60*24*365, // one year ago TODO add since
        max_timestamp: ~~(Date.now() / 1000)
      }
    }, function (err, response, body) {
      if (err) {
        console.log("queryInstagramAPI error:", err);
        return callback(err);
      }

      if (response.statusCode === 200) {
        if (response.pagination) {
          console.log("has more pages. TODO: add code to handle this!")
          console.log("pagination:", body.pagination);
        }

        console.log("[*] requests remaining:", response.headers["x-ratelimit-remaining"]);

        return callback(null, body.data);
      }

      if (response.statusCode === 429) {
        // rate limited
        console.log("Rate limited.");

        if (operation.retry(true)) {
          return;
        }

        return callback(new Error("Continued to be rate limited after " + currentAttempt + " attempts."));
      }

      if (response.statusCode === 500) {
        return callback(new Error("An error occurred. Instagram message: code " + response.statusCode + " " + response.body));
      }

      console.log("Non-200, unrecognized error: %d body: ", response.statusCode, body);
      return callback(null, body);
    });
  });
}

var createSource = function(batchSize) {
  // give the batch size a default
  batchSize = (batchSize | 0) || 10;

  return _(function(push, next) {
    return pg.connect(DATABASE_URL, function(err, client, done) {
      if (err) {
        done();

        push(err);
        // treat this as a fatal error
        return push(null, _.nil);
      }

      var query = client.query.bind(client),
          select = [
              "SELECT id, ST_X(center) AS lng, ST_Y(center) AS lat, radius",
              "FROM instagram_regions",
              "WHERE locked_at IS NULL",
              "  AND split = false",
              "ORDER BY COALESCE(last_fetched, '2014-10-04'::timestamp with time zone) ASC, radius DESC",
              "LIMIT $1"
            ].join("\n"),
          update = "UPDATE instagram_regions SET locked_at = NOW() WHERE id IN";

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
              console.warn(e.stack);
            }

            // release the client back into the pool
            done();

            // propagate the error
            push(err);

            // treat this as a fatal error and end the stream
            return push(null, _.nil);
          });
        }

        // release the client back into the pool
        done();

        if (result[1].length === 0) {
          // all caught up / everything is locked
          console.log("No more regions to fetch.");
          push(null, _.nil);
        }

        // yield each row to downstream consumer(s)
        result[1].forEach(_.curry(push, null));

        return next();
      });
    });
  });
};

var unlockRegion = function(id, callback) {
  // console.log("[*] unlocking region %d", id);

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    var query = "UPDATE instagram_regions SET locked_at = NULL WHERE id = $1";

    return client.query(query, [id], function() {
      done();

      return callback.apply(null, arguments);
    });
  });
};

var addPhoto = function(photo, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    var query = "INSERT INTO instagram_photos (photo_id, metadata, geom) VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326))",
        metadata = {
          attribution: photo.attribution,
          location: {
            name: photo.location.name,
            id: photo.location.id
          },
          comments: {
            count: photo.comments.count
          },
          filter: photo.filter,
          created_time: photo.created_time,
          link: photo.link,
          likes: {
            count: photo.likes.count
          },
          images: {
            standard_resolution: {
              url: photo.images.standard_resolution.url,
              width: photo.images.standard_resolution.width,
              height: photo.images.standard_resolution.height
            }
          },
          caption: {
            text: photo.caption && photo.caption.text
          },
          user: {
            username: photo.user.username,
            website: photo.user.website,
            profile_picture: photo.user.profile_picture,
            bio: photo.user.bio,
            id: photo.user.id
          }
        };

    return client.query(query, [photo.id, metadata, photo.location.longitude, photo.location.latitude], function(err) {
      // release the client into the pool
      done();

      if (err && err.code === "23505") {
        // duplicate key error; ignore
        return callback();
      }

      if (err) {
        console.warn("addPhoto error:", err);
      }

      return callback.apply(null, arguments);
    });
  });
};

var addPhotos = function(photos, callback) {
  return async.each(photos, addPhoto, callback);
};

var updateRegion = function(id, callback) {
  // console.log("[*] updating region %d", id);

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    var query = [
      "UPDATE instagram_regions regions",
      "SET last_fetched = NOW(),",
      "    count = (SELECT COUNT(id)",
      "             FROM instagram_photos photos",
      "             WHERE ST_DWithin(regions.geom,",
      "                              ST_Transform(photos.geom, ST_SRID(regions.geom)),",
      "                              regions.radius)",
      "            )",
      "WHERE id = $1"
    ].join("\n");

    return client.query(query, [id], function() {
      // release the client back into the pool
      done();

      return callback.apply(null, arguments);
    });
  });
};

var split = function(region, callback) {
  console.log("[*] splitting region %d", region.id);

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    var query = client.query.bind(client),
        insert = [
          "INSERT INTO instagram_regions (center, radius, geom)",
          "  SELECT",
          "    ST_Transform(ST_Centroid(geom), 4326) AS center,",
          "    $5 AS radius,",
          "    geom",
          "  FROM (",
          "    SELECT GetIntersectingHexagons(ST_Buffer(ST_Transform(ST_SetSRID(ST_MakePoint($2, $3), 4326), 3310), $4), $5) geom",
          "  ) AS hexes",
          // avoid boxiness
          "  WHERE ST_Intersects(geom, (SELECT geom FROM instagram_regions WHERE id = $1))",
          // prevent duplicate key errors
          "    AND (SELECT COUNT(id) FROM instagram_regions i WHERE ST_Equals(i.geom, hexes.geom)) = 0"
        ].join("\n"),
        insertParams = [region.id, region.lng, region.lat, region.radius, region.radius / 5],
        update = "UPDATE instagram_regions SET split = true WHERE id = $1",
        updateParams = [region.id];

    return async.series([
      async.apply(query, "BEGIN"),
      async.apply(query, "LOCK TABLE instagram_regions"),
      async.apply(query, insert, insertParams),
      async.apply(query, update, updateParams),
      async.apply(query, "COMMIT")
    ], function(err) {
      if (err) {
        console.warn("split error on region %d:", region.id, err);
        return query("ROLLBACK", function(e) {
          done();

          if (e) {
            console.warn("Rollback failed:", e);
          }

          return callback(err);
        });
      }

      done();

      return callback.apply(null, arguments);
    });
  });
};

var createWorker = function() {
    return new Worker(function(task, done) {
      return queryInstagramAPI(task.lat, task.lng, task.radius, function(err, photos) {
        if (err) {
          // unlock
          return unlockRegion(task.id, function(e) {
            if (e) {
              console.warn(e.stack);
            }

            // return the original error
            return done(err);
          });
        }

        console.log("[*] %d photo(s) found for region %d.", photos.length, task.id);

        // TODO transactions
        // beginTransaction(function(err, client, commit, rollback) {
        // });

        // don't subdivide by default (use an async noop)
        var subdivide = function(callback) {
          return callback();
        };

        if (photos.length >= 100 && task.radius > 10) {
          subdivide = async.apply(split, task);
        }

        return async.series([
          // add photos
          async.apply(addPhotos, photos),

          // subdivide (if necessary)
          subdivide,

          // update region counts
          async.apply(updateRegion, task.id),

          // unlock region
          async.apply(unlockRegion, task.id)
        ], done);
      });
    });
};

setInterval(function() {
  console.log("🔅  Available objects:", pg.pools.all[JSON.stringify(DATABASE_URL)].availableObjectsCount());
  console.log("🔅  Waiting clients:", pg.pools.all[JSON.stringify(DATABASE_URL)].waitingClientsCount());
}, 5000);

var harvest = function(concurrency, callback) {
  concurrency = (concurrency | 0) || 10;
  callback = callback || NOOP;

  var balancer = new Balancer();

  for (var i = 0; i < concurrency; i++) {
    balancer.push(createWorker());
  }

  createSource(concurrency)
    .pipe(balancer)
    .on("finish", callback);
};

module.exports = harvest;

harvest(10, function() {
  pg.end();
  console.log("Done.");
});
