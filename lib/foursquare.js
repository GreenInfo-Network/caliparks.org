"use strict";

var util = require("util");

var _ = require("highland"),
    async = require("async"),
    env = require("require-env"),
    pg = require("pg"),
    request = require("request"),
    retry = require("retry");

var Balancer = require("./balancer"),
    Split = require("./split"),
    Worker = require("./worker");

var DATABASE_URL = env.require("DATABASE_URL"),
    FOURSQUARE_CLIENT_ID = env.require("FOURSQUARE_CLIENT_ID"),
    FOURSQUARE_CLIENT_SECRET = env.require("FOURSQUARE_CLIENT_SECRET");

var getVenuesForRegion = function(region, each, done) {
  var since = region.last_fetched;

  if ((since = region.last_fetched)) {
    since = since.getTime();
  } else {
    var d = new Date();
    since = d.setFullYear(d.getFullYear() - 1);
  }

  since = Math.floor(since / 1000);

  console.log("[*] querying Foursquare for region %d with bbox (%s)", region.id, region.bbox);

  var operation = retry.operation({
    randomize: true
  });

  return operation.attempt(function(currentAttempt) {
    return request({
      url: "https://api.foursquare.com/v2/venues/search",
      json: true,
      qs: {
        intent: "browse",
        limit: 50,
        sw: [region.latmin, region.lngmin].join(),
        ne: [region.latmax, region.lngmax].join(),
        client_id: FOURSQUARE_CLIENT_ID,
        client_secret: FOURSQUARE_CLIENT_SECRET,
        v: "20140630"
      }
    }, function (err, rsp, body) {
      if (err) {
        return done(err);
      }

      console.log("Requests remaining: ", rsp.headers["x-ratelimit-remaining"]);

      if (rsp.statusCode === 403 && body.errorType === "rate_limit_exceeded") {
        // rate limited
        console.log("Rate limited.");

        if (operation.retry(true)) {
          return;
        }

        return done(new Error("Continued to be rate limited after " + currentAttempt + " attempts."));
      }

      if (rsp.statusCode === 400 && body.errorType === "geocode_too_big") {
        return done(new Split());
      }

      if (rsp.statusCode === 200) {
        return async.forEach(body.response.venues, each, function() {
          // ignore iterator errors
          return done(null, body.response.venues.length);
        });
      }

      return done(new Error(util.format("Foursquare error %d:", rsp.statusCode, body)));
    });
  });
};

var unlockRegion = function(id, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    var query = "UPDATE foursquare_regions SET locked_at = NULL WHERE id = $1";

    return client.query(query, [id], function() {
      done();

      return callback.apply(null, arguments);
    });
  });
};

var updateRegion = function(id, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    var query = [
      "UPDATE foursquare_regions regions",
      "SET last_fetched = NOW(),",
      "    count = (SELECT COUNT(id)",
      "             FROM foursquare_venues venues",
      "             WHERE venues.geom && regions.geom",
      "            )",
      "WHERE id = $1"
    ].join("\n");

    return client.query(query, [id], function(err) {
      // release the client back into the pool
      done();

      if (err) {
        console.log("updateRegion error:", err);
        console.log(query, id);
        process.exit();
      }

      return callback.apply(null, arguments);
    });
  });
};

var addVenue = function(venue, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    var query = "INSERT INTO foursquare_venues (venue_id, metadata, geom) VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326))";

    return client.query(query, [venue.id, venue, venue.location.lng, venue.location.lat], function(err) {
      // release the client into the pool
      done();

      if (err) {
        console.warn("addVenue error:", err);
      }

      // don't pass errors
      return callback();
    });
  });
};

var createSource = function(batchSize) {
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
              "SELECT id, width, ST_XMin(geom) AS lngmin, ST_YMin(geom) AS latmin, ST_XMax(geom) AS lngmax, ST_YMax(geom) AS latmax, last_fetched",
              "FROM foursquare_regions",
              "WHERE locked_at IS NULL",
              "  AND split = false",
              "  AND (last_fetched IS NULL OR last_fetched <= NOW() - interval '1 day')",
              "ORDER BY COALESCE(last_fetched, '2014-10-04'::timestamp with time zone) ASC, width DESC",
              "LIMIT $1"
            ].join("\n"),
          update = "UPDATE foursquare_regions SET locked_at = NOW() WHERE id IN";

      // perform queries in a transaction to prevent visibility leakage
      return async.series([
        async.apply(query, "BEGIN"),
        // lock rows so multiple sources won't try to lock the same regions
        async.apply(query, "LOCK TABLE foursquare_regions IN ROW EXCLUSIVE MODE"),
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

            result.rows.forEach(function(row) {
              row.bbox = [
                row.lngmin,
                row.latmin,
                row.lngmax,
                row.latmax
              ];
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

        var rows = result[2];

        if (rows.length === 0) {
          // all caught up / everything is locked
          console.log("No more regions to fetch.");
          push(null, _.nil);
        }

        // yield each row to downstream consumer(s)
        rows.forEach(_.curry(push, null));

        return next();
      });
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
          "INSERT INTO foursquare_regions (geom, width, last_fetched)",
          "  WITH region AS (",
          "    SELECT",
          "      geom",
          "    FROM foursquare_regions",
          "    WHERE id = $1",
          "  ),",
          "  horiz AS (",
          "    SELECT (ST_Dump(ST_Split(geom, ST_SetSRID(ST_MakeLine(ST_MakePoint(ST_XMin(geom), (ST_YMin(geom) + ST_YMax(geom)) / 2), ST_MakePoint(ST_XMax(geom), (ST_YMin(geom) + ST_YMax(geom)) / 2)), ST_SRID(geom))))).geom",
          "    FROM region",
          "  ),",
          "  vert AS (",
          "    SELECT (ST_Dump(ST_Split(geom, ST_SetSRID(ST_MakeLine(ST_MakePoint((ST_XMin(geom) + ST_XMax(geom)) / 2, ST_YMin(geom)), ST_MakePoint((ST_XMin(geom) + ST_XMax(geom)) / 2, ST_YMax(geom))), ST_SRID(geom))))).geom",
          "    FROM horiz",
          "  )",
          "  SELECT",
          "    DISTINCT vert.geom,",
          "    $2::double precision AS width,",
          "    $3::timestamp with time zone AS last_fetched",
          "  FROM vert",
          "  INNER JOIN cpad_superunits ON ST_Intersects(cpad_superunits.geom, ST_Transform(vert.geom, ST_SRID(cpad_superunits.geom)))",
          // prevent duplicate key errors
          "  WHERE (SELECT COUNT(id) FROM foursquare_regions r WHERE ST_Equals(r.geom, vert.geom)) = 0"
        ].join("\n"),
        insertParams = [region.id, region.width / 2, region.last_fetched],
        update = "UPDATE foursquare_regions SET split = true WHERE id = $1",
        updateParams = [region.id];

    return async.series([
      async.apply(query, "BEGIN"),
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
    return getVenuesForRegion(task, addVenue, function(err, count) {
      if (err && !(err instanceof Split)) {
        // unlock
        return unlockRegion(task.id, function(e) {
          if (e) {
            console.warn(e.stack);
          }

          // return the original error
          return done(err);
        });
      }

      // don't subdivide by default (use an async noop)
      var subdivide = function(callback) {
        return callback();
      };

      console.log("%d venues found", count);

      if ((err instanceof Split || count >= 50) && task.width >= 0.001) {
        console.log("Splitting");
        subdivide = async.apply(split, task);
      }

      return async.series([
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

var harvest = function(concurrency, callback) {
  concurrency = (concurrency | 0) || 10;
  callback = callback || function(err) {
    if (err) {
      throw err;
    }

    pg.end();
  };

  var balancer = new Balancer();

  for (var i = 0; i < concurrency; i++) {
    balancer.push(createWorker());
  }

  return createSource(concurrency)
    .pipe(balancer)
    .on("finish", callback);

  // TODO on SIGINT unpipe balancer
};

module.exports = harvest;
