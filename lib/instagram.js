"use strict";

var util = require("util");

var async = require("async"),
    env = require("require-env"),
    pg = require("pg"),
    request = require("request");

var CPAD_TABLE = "cpad_superunits",
    DATABASE_URL = env.require("DATABASE_URL");

var liveTaskCounter = {};

function wkt2swne(row) {
  // WKT envelope string -> sw,ne string. sorry.
  var envelope = row.envelope.replace(/[A-Z\(\)]+/g, ""),
      envelope = envelope.split(",").map(function(e) { return e.split(" "); }),
      sw = envelope[0].reverse().join(),
      ne = envelope[2].reverse().join();

  // 4sq requires lat,lon not lon,lat.

  return [sw, ne];
}

var latLngToProjectedCoords = function(lat, lng, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox

  var query = "select st_y(a) as y, st_x(a) as x from (select st_astext(st_transform(ST_GeomFromText('POINT(" + lng + " " + lat + ")',4326),3310)) as a) as query";

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, function(err, res) {
      done();

      if (err) {
        throw err;
      }
      var coords = [res.rows[0].y, res.rows[0].x];
      return callback (null, coords);

    });
  });
};

var projectedCoordsToLatLng = function(y, x, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox

  var query = "select st_y(a) as lat, st_x(a) as lng from (select st_astext(st_transform(ST_GeomFromText('POINT(" + x + " " + y + ")',3310),4326)) as a) as query";

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, function(err, res) {
      done();

      if (err) {
        throw err;
      }
      var coords = [res.rows[0].lat, res.rows[0].lng];
      return callback (null, coords);

    });
  });
};

/**
 * Get the sw, ne corners for a park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, sw, ne) Called with the sw and nw coordinates (as strings).
 *
 * If park is null, will return sw, ne corners containing all parks
 */
var getProjectedSwNeForPark = function(park, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox

  var query;

  if (park) {
    query = "select su_id, unit_name, st_astext(st_envelope(st_transform(geom,3310))) as envelope from " + CPAD_TABLE + " where su_id = " + park.id + " limit 1";
  } else {
    query = "select st_astext(st_envelope(st_setsrid(st_extent(geom),3310))) as envelope from " + CPAD_TABLE;
  }

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, function(err, res) {
      done();

      if (err) {
        return callback(err);
      }

      var envelope = wkt2swne(res.rows[0]);
      var sw = envelope[0],
          ne = envelope[1];

      return callback(null, sw, ne);
    });
  });
};

/**
 *  The parks argument should be an array of park superunit ids.
 *  If parks is null, will test against all parks.
 *  Returns a list of park ids that intersect the circle, or an empty array if none.
 */

var testProjectedCircleIntersectionWithParks = function(centerX, centerY, radius, parks, callback) {
  //var query = ["select su_id from cpad_2013b_superunits_ids where (su_id = $1) and ST_Intersects(ST_Buffer(ST_SetSRID(ST_MakePoint(", centerX, ",", centerY, "),3310),", radius, "),st_transform(geom,3310))"].join("")
  var query = "select superunit_id from " + CPAD_TABLE + " where ";
  if (parks) { // should test if it's an array, too
    query += "(";
    su_ids = []
    parks.forEach(function(park_id) {
      su_ids.push("su_id = " + park_id);
    });
    query += su_ids.join(" or ");
    query += ") and ";
  }
  query += util.format(" ST_DWithin('SRID=3310;POINT(%d %d)'::geometry, geom, %d)", centerX, centerY, radius);

  //console.log("testProjectedCircle", query);
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, function(err, res) {
      done();

      if (err) {
        console.warn(err.stack);

        // TODO: deal with this better
        console.log("projection test error, proceeding...", centerX, centerY, radius, "park:", park.id);
        return callback(null, centerX, centerY, radius, false);
      }

      //var result = res.rows;
      var result = res.rows.map(function(row) { return row.superunit_id; });

      // console.log("testProjectedCircle result:", result);
      return callback(null, centerX, centerY, radius, result);
    });
  });
};


var saveInstagramHarvesterMetadata = function(park_id, lat, lng, radius, timestamp, count) {
  var query = "insert into instagram_metadata (su_id, lat, lng, radius, date, count, the_geom) values ($1, $2, $3, $4, $5, $6, ST_Buffer(ST_Transform(ST_SetSRID(ST_makepoint($3, $2),4326),3310), $4))";
  //console.log("saveInstagramHarvesterMetadata");

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      throw err;
    }

    return client.query(query, [park_id, lat, lng, radius, timestamp, count], function(err, res) {
      done();

      if (err) {
        console.log(err);
        throw err;
      }
    });
  });
};


function saveInstagramHarvesterResults(metadata_id, photos, park) {
  var query = "insert into instagram_photos (photoid, attribution, latitude, longitude, placename, placeid, commentcount, filter, created_time, link, likescount, standard_resolution, width, height, caption, username, website, profile_picture, bio, userid, the_geom) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, ST_SetSRID(ST_MakePoint($4,$3), 4326))";
  //console.log("saveInstagramHarvesterResults, metadata_id:", metadata_id, "num photos:", photos.length, "park:", park.id);

  photos.forEach(function(photo) {
    if (photo) {
      photo.park = park;
      var params = [photo.id, photo.attribution, photo.location.latitude, photo.location.longitude, photo.location.name, photo.location.id, photo.comments.count, photo.filter, photo.created_time, photo.link, photo.likes.count, photo.images.standard_resolution.url, photo.images.standard_resolution.width, photo.images.standard_resolution.height];
      if (photo.caption && photo.caption.text)
        params.push(photo.caption.text);
      else
        params.push("");
      params.push(photo.user.username, photo.user.website, photo.user.profile_picture, photo.user.bio, photo.user.id);

      return pg.connect(DATABASE_URL, function(err, client, done) {
        if (err) {
          throw err;
        }

        return client.query(query, params, function (err, res) {
          done();

          if (err) {
            console.log(err);
          }
        });
      });
    }
  });
}

function createInstagramArray(callback) {
  var radius = 5000; // Instagram maximum radius allowed in metres

  // Get bounds of all parks in projected units.

  //park = {id:13647}; //yosemite
  //park = {id:9365}; //point reyes

  return getProjectedSwNeForPark(null, function(err, sw, ne) {
    if (err) {
      return callback(err);
    }

    // create array of circles to blanket bounds

    // for each circle
      // test if it intersects any parks.
      // Save metadata for circle (center, radius, list of park ids)

    var swArray = sw.split(","),
        neArray = ne.split(","),
        yMin = +swArray[0],
        xMin = +swArray[1],
        yMax = +neArray[0],
        xMax = +neArray[1];
    console.log("bounds:", yMin, xMin, yMax, xMax);

    // Using a hexagonal layout algorithm...
    // X spacing is 2 * cos(PI/6) * radius
    // Y spacing is 1.5 * radius
    // Every other row is offset by cos(PI/6) * radius
    var xSpacing = 2 * Math.cos(Math.PI/6) * radius;
    var ySpacing = 1.5 * radius;
    var rowOffset = Math.cos(Math.PI/6) * radius;

    var testQueue = async.queue(function(task, done) {
      return testProjectedCircleIntersectionWithParks(task.x, task.y, task.radius, null, function(err, queryX, queryY, radius, result) {
        if (err) {
          console.log("error of some kind", err);
          return done(err);
        }

        // console.log("testing circle intersection, y:", queryY, "x:", queryX, radius, result);
        if (result && result.length > 0) {
          return projectedCoordsToLatLng(queryY, queryX, function(err, latlng) {
            var latMid = latlng[0];
            var lngMid = latlng[1];

            // console.log("circle y:", queryY, "x:", queryX, "hit", result.length, "parks:", result.join(","));
            return saveInstagramArrayResult(latMid, lngMid, radius, result, done);
          });
        }

        return done();
      });
    }, require("os").cpus().length);


    var totalCount = (1+Math.floor((xMax-xMin)/xSpacing)) * (1+Math.floor((yMax-yMin)/ySpacing));
    console.log("testing %d circles", totalCount);

    for (var y = yMin, row = 0, i = 0; y < yMax; y += ySpacing, row++) {
      // console.log("y", y);
      for (var x = row % 2 ? xMin + rowOffset : xMin; x < xMax; x += xSpacing) {
        //console.log("row", row, "x", x, "y", y);
        //if (row % 2) { x += rowOffset; } // odd numbered rows will be offset
        var queryX = x;
        var queryY = y;

        testQueue.push({
          x: x,
          y: y,
          radius: radius
        }, function(err) {
          if (err) {
            console.warn(err.message);
          }

          if (++i % 100 === 0 || i === totalCount) {
            console.log("done %d of %d", i, totalCount);
          }
        });
      }
    }

    callback();
  });
}

var saveInstagramArrayResult = function(lat, lng, radius, parkIds, callback) {
  callback = callback || function(err) {
    if (err) {
      throw err;
    }
  };

  var query = "insert into instagram_array (lat, lng, radius, the_geom) values ($1, $2, $3, ST_Buffer(ST_Transform(ST_SetSRID(ST_MakePoint($2, $1), 4326), 3310), $3))";

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      console.log(err);
      return callback(err);
    }

    // TODO this creates duplicate rows
    return async.each(parkIds, function(parkId, done) {
      return client.query(query, [lat, lng, radius], done);
    }, function() {
      done();

      return callback.apply(null, arguments);
    });
  });
};

function getInstagramPhotosForCircles(circles, callback) {
  // Create a queue with a worker (that currently does nothing but call each task's callback)
  var q = async.queue(function (task, callback) {
    console.log('starting', task.name, task.centerX, task.centerY, task.radius);
    callback();
  }, 10);  // TODO: increase this.

  liveTaskCounter["circles"] = 0;
  circles.forEach(function(circle) {  // Can be synchronous since we're firing of queue tasks
    liveTaskCounter["circles"] = liveTaskCounter["circles"]++;
    console.log("circle tasks:", liveTaskCounter["circles"]);

    return latLngToProjectedCoords(circle.lat, circle.lng, function(err, coords) {
      q.push({name: "", centerX: coords[1], centerY: coords[0], radius: circle.radius}, instagramRecursionQueueTask(null, coords[0], coords[1], circle.radius, null, circle.parks, 1, q, callback));

    });
  });

}

function queryInstagramAPI(lat, lng, radius, callback) {
  var photos = []; // If we want to build a photos object like the Flickr query does

  console.log("[*] query Instagram with center", lat, lng, "radius", radius);
  var url = {
    url: "https://api.instagram.com/v1/media/search",
    qs: {
      lat: lat,
      lng: lng,
      count: 200,       // 100 seems to be their maximum
      max_id: 1,       //  Trying to trigger pagination by setting this? doesn't work.
      distance: radius,
      client_id: env.require("INSTAGRAM_CLIENT_ID"),
      min_timestamp: ~~(Date.now() / 1000) - 60*60*24*365, // one year ago
      max_timestamp: ~~(Date.now() / 1000)
    }
  };
  request(url, function (err, response, body) {

    if (err) {
      console.log("queryInstagramAPI error:", err);
      return callback(err);
    }

    if (!err && response.statusCode == 200) {
      try {
        body = JSON.parse(body);
        //photos = photos.concat(body.data); // Only if we are building an object to hand back up the recursion tree

        if (response.pagination) {
          console.log("has more pages. TODO: add code to handle this!")
          console.log("pagination:", body.pagination);
          return callback(null, body);  // callback(err, result)
        } else {
          //console.log("last or only page")
          return callback(null, body);  // callback(err, result)
        }
        //return callback(null, photos);  // callback(err, result)
      } catch (e) {
        console.log("JSON parsing failed");
        return callback(e);
      }
    }

    if ((!err && response.statusCode == 400) || (!err && response.statusCode == 429)) {
      try {
        body = JSON.parse(body);
        if (body.code == 420 || body.code == 429) {
          var sleeptime = 600;
          console.log("rate limited, sleeping", sleeptime, "seconds...");
          sleep.sleep(sleeptime);
          return queryInstagramAPI(lat, lng, radius, callback); //instead, call self again after sleeping...
        } else {
          return callback(body); // Return body as err
        }
      } catch (e) {
        console.log("JSON parsing failed");
        return callback(e);
      }
    }

    if (!err && response.statusCode == 500) {
      return callback("An error occurred. Instagram message: code " + response.statusCode + " " + body); // TODO: better error obj
    }

    if (!err && response.statusCode != 200) {
      try {
        body = JSON.parse(body);
        console.log("caught not 200:", response.statusCode, "body:", body);
        return callback(null, body);
      } catch (e) {
        console.log("JSON parsing failed");
        console.log(response.statusCode);
        console.log(response);
        return callback(e);
      }
    }

    return callback(); //shouldn't get here
  });
}

function instagramRecursionQueueTask(err, y, x, radius, polygon, parks, depth, q, callback) {
  // This stuff should be moved into a task that can be added to a queue.

  // Since we are using projected coordiantes, need to convert to latlng for Instagram API
  projectedCoordsToLatLng(y, x, function(err, latlng) {
    var latMid = latlng[0];
    var lngMid = latlng[1];

    queryInstagramAPI(latMid, lngMid, radius, function(err, body) {
      if (err) {
        console.log(err);
        // Don't do anything, just clean up
      } else {
        // success
        //console.log("body from query", body);
        if (!body) {
          console.log("no body!", err, body);
          // Do something here!
        } else {
          photos = body.data;
          count = photos.length;

          console.log(latMid, lngMid, radius, "depth", depth, "got", count, "instagram photos");

          // If the count is 100, I think I need to recurse here.

          var metadata_id = saveInstagramHarvesterMetadata(null, latMid, lngMid, radius, new Date(), count);

          //metadata_id = 1; // It's currently fake anyway

          saveInstagramHarvesterResults(metadata_id, photos, null);

          if (count >= 100 && radius > 10) {    // TODO improve this. For now, stop if radius drops below X metres!

            /*
            //2 * newRadius must equal Math.cos(Math.PI/6) * oldRadius. Trust me.
            var newSpacing = radius*Math.cos(Math.PI/6)/2;
            var newCenters = [
              [y, x],
              [y + 2*newSpacing, x],
              [y - 2*newSpacing, x],
              [y + newSpacing, x - newSpacing*Math.sqrt(3)],
              [y - newSpacing, x - newSpacing*Math.sqrt(3)],
              [y + newSpacing, x + newSpacing*Math.sqrt(3)],
              [y - newSpacing, x + newSpacing*Math.sqrt(3)]
            ]
            var newRadius = radius/2;
            */
            // I think instead I'll jump down another step, filling each circle (really, I just need to fill a hexagon) with 19 circles instead of 7. Will produce much less overlap and redundancy.
            var newSpacing = radius*Math.cos(Math.PI/6)/4;
            var newCenters = [
              [y, x],
              [y + 2*newSpacing, x],
              [y - 2*newSpacing, x],
              [y + 4*newSpacing, x],
              [y - 4*newSpacing, x],
              [y + newSpacing, x - newSpacing*Math.sqrt(3)],
              [y - newSpacing, x - newSpacing*Math.sqrt(3)],
              [y + newSpacing, x + newSpacing*Math.sqrt(3)],
              [y - newSpacing, x + newSpacing*Math.sqrt(3)],
              [y + 3*newSpacing, x - newSpacing*Math.sqrt(3)],
              [y - 3*newSpacing, x - newSpacing*Math.sqrt(3)],
              [y + 3*newSpacing, x + newSpacing*Math.sqrt(3)],
              [y - 3*newSpacing, x + newSpacing*Math.sqrt(3)],
              [y, x + 2*newSpacing*Math.sqrt(3)],
              [y, x - 2*newSpacing*Math.sqrt(3)],
              [y + 2*newSpacing, x + 2*newSpacing*Math.sqrt(3)],
              [y + 2*newSpacing, x - 2*newSpacing*Math.sqrt(3)],
              [y - 2*newSpacing, x + 2*newSpacing*Math.sqrt(3)],
              [y - 2*newSpacing, x - 2*newSpacing*Math.sqrt(3)]
            ]
            var newRadius = radius/4;


            console.log(latMid, lngMid, radius, "got photos >= 100 at depth", depth + ", SUBDIVIDE:", newCenters)

            newCenters.forEach(function(newCenter) {
              var newX = newCenter[1];
              var newY = newCenter[0];
              // TODO: change this to test only against the list of park IDs returned
              return testProjectedCircleIntersectionWithParks(newX, newY, newRadius, parks, function(err, newX, newY, newRadius, result) {
                if (result && result.length > 0) {

                  var nextDepth = depth + 1;

                  liveTaskCounter["circles"] = liveTaskCounter["circles"] + 1;
                  console.log("circle tasks:", liveTaskCounter["circles"]);
                  q.push({name: 'another task, depth ' + nextDepth, centerX: newX, centerY: newY, radius: newRadius}, instagramRecursionQueueTask(null, newY, newX, newRadius, polygon, result, nextDepth, q, callback));

                }
              });
            });
          }
        }
      }

      liveTaskCounter["circles"] = liveTaskCounter["circles"] - 1;

      console.log("circle tasks:", liveTaskCounter["circles"]);
      if (liveTaskCounter["circles"] == 0) {
        // This happens more than it should, and sooner than it should. The live task counter is not staying updated?
        console.log('all items have been processed');
        return callback(null);
      } // else, return nothing?
    });
  });
}

var getCirclesFromPostgres = function(callback) {
  var query = "select lat, lng, radius from instagram_array order by lat desc, lng, radius";
  // A few around the bay area
  //var query = "select lat, lng, radius, array_agg(su_id) as parks from instagram_array where lat < 37.8 and lat > 37.6 and lng < -122.35 group by lat, lng, radius order by lat desc, lng, radius";
  // Just one circle on SF
  //var query = "select lat, lng, radius, array_agg(su_id) as parks from instagram_array where lat < 37.8 and lat > 37.75 and lng < -122.35 and lng > -122.5 group by lat, lng, radius order by lat desc, lng, radius";

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, function(err, res) {
      done();

      if (err) {
        return callback(err);
      }

      console.log("got", res.rows.length, "circles from database that need harvesting");

      return callback(null, res.rows);
    });
  });
};

var getInstagramPhotosForAllCircles = function(callback) {
  return getCirclesFromPostgres(function(err, circles) {
    if (err) {
      return callback(err);
    }

    getInstagramPhotosForCircles(circles, function(err) {
      console.log("[*] done!");
      callback(err);
    });
  });
};

module.exports = {
  getPhotosForAllCircles: getInstagramPhotosForAllCircles,
  createInstagramArray: createInstagramArray
};
