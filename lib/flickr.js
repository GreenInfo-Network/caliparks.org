"use strict";

var util = require("util");

var _ = require("highland"),
    async = require("async"),
    env = require("require-env"),
    pg = require("pg"),
    request = require("request");

var Balancer = require("./balancer"),
    Worker = require("./worker");

var DATABASE_URL = env.require("DATABASE_URL"),
    FLICKR_CLIENT_ID = env.require("FLICKR_CLIENT_ID");

var hasMorePages = function(body) {
  return body.photos.page < body.photos.pages;
};

// TODO split callback into each and done (where each is called per item and
// done when the region has been fully fetched)
var getPhotosForRegion = function(region, page, each, done) {
  if (arguments.length < 4) {
    each = arguments[arguments.length - 2];
    done = arguments[arguments.length - 1];
    page = 1;
  }

  var bbox = [
    region.lngmin.toFixed(6),
    region.latmin.toFixed(6),
    region.lngmax.toFixed(6),
    region.latmax.toFixed(6)
  ].join(",");

  var since = region.last_fetched;

  if ((since = region.last_fetched)) {
    since = since.getTime();
  } else {
    var d = new Date();
    since = d.setFullYear(d.getFullYear() - 1);
  }

  since = Math.floor(since / 1000);

  console.log("[*] querying Flickr for page %d of region %d with bbox (%s)", page, region.id, bbox);

  // TODO since Flickr doesn't pro-actively rate limit, limit ourselves
  // this could be done by calling a function (with an optional response object
  // so that the same technique could be used for APIs that do rate limit)
  return request({
    url: "https://api.flickr.com/services/rest",
    json: true,
    qs: {
      method: "flickr.photos.search",
      api_key: FLICKR_CLIENT_ID,
      bbox: bbox,
      has_geo: 1,
      extras: "geo,tags,date_upload,date_taken,owner_name,description,license,url_s,url_m,url_n,url_z,url_c,url_l,url_o",
      min_taken_date: since,
      format: "json",
      nojsoncallback: 1,
      page: page,
      per_page: 250,   // max = 250 for geo queries
      safe_search: 1,  // moderated
      content_type: 1, // photos (not screenshots)
      media: "photos"  // (not videos)
    }
  }, function (err, rsp, body) {
    if (err) {
      return done(err);
    }

    if (rsp.statusCode === 200) {
      return async.forEach(body.photos.photo, each, function() {
        // ignore iterator errors

        if (hasMorePages(body) && page <= body.photos.page && page < 100) {      //Stop after 100. TODO: do this better; geo searches return an approximate number of images
          console.log("[*] found another page for region %d (%s): %d/%d", region.id, bbox, body.photos.page, body.photos.pages);
          return getPhotosForRegion(region, page + 1, each, done);
        }

        return done();
      });
    }

    return done(new Error(util.format("Flickr error %d:", rsp.statusCode, body)));
  });
};

var unlockRegion = function(id, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    var query = "UPDATE flickr_regions SET locked_at = NULL WHERE id = $1";

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
      "UPDATE flickr_regions regions",
      "SET last_fetched = NOW(),",
      "    count = (SELECT COUNT(id)",
      "             FROM flickr_photos photos",
      "             WHERE photos.geom && regions.geom",
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

var addPhoto = function(photo, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    // rather than calculating the largest photo size here, use something like
    //   COALESCE(photo -> 'url_l', photo -> 'url_c', photo -> 'url_z', photo -> 'url_n', photo -> 'url_m', photo -> 'url_s') url_largest
    var query = "INSERT INTO flickr_photos (photo_id, metadata, geom) VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326))",
        metadata = photo;

    return client.query(query, [photo.id, metadata, photo.longitude, photo.latitude], function(err) {
      // release the client into the pool
      done();

      if (err) {
        if (err.code === "23505") {
          // duplicate key error; ignore
        } else {
          console.warn("addPhoto error:", err);
        }
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
              "SELECT id, ST_XMin(geom) AS lngmin, ST_YMin(geom) AS latmin, ST_XMax(geom) AS lngmax, ST_YMax(geom) AS latmax, last_fetched",
              "FROM flickr_regions",
              "WHERE locked_at IS NULL",
              "  AND (last_fetched IS NULL OR last_fetched <= NOW() - interval '1 week')",
              "ORDER BY COALESCE(last_fetched, '2014-10-04'::timestamp with time zone) ASC, width DESC",
              "LIMIT $1"
            ].join("\n"),
          update = "UPDATE flickr_regions SET locked_at = NOW() WHERE id IN";

      // perform queries in a transaction to prevent visibility leakage
      return async.series([
        async.apply(query, "BEGIN"),
        // lock rows so multiple sources won't try to lock the same regions
        async.apply(query, "LOCK TABLE flickr_regions IN ROW EXCLUSIVE MODE"),
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

var createWorker = function() {
  return new Worker(function(task, done) {
    return getPhotosForRegion(task, addPhoto, function(err) {
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

      return async.series([
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
