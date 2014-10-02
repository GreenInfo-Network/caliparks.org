"use strict";

var fs = require("fs"),
    util = require("util");

var async = require("async"),
    connect = require("connect"),
    pg = require("pg"),
    request = require("request"),
    sleep = require("sleep"),
    env = require("require-env"),
    jsts = require("jsts");

var flickr = require("./lib/flickr");

var factory = new jsts.geom.GeometryFactory();
var reader = new jsts.io.WKTReader(factory);

var zerocount = 0,
    nonzerocount = 0,
    undefcount = 0,
    existscount = 0;

// Expected to be in EPSG:3310.
var CPAD_TABLE = "cpad_superunits",
    DATABASE_URL = env.require("DATABASE_URL");

function wkt2bbox(row) {
  // WKT envelope string -> bbox string. sorry.
  var envelope = row.envelope.replace(/[A-Z\(\)]+/g, ""),
      envelope = envelope.split(",").map(function(e) { return e.split(" "); }),
      envelope = [envelope[0], envelope[2]].join();

  return envelope;
}

function wkt2swne(row) {
  // WKT envelope string -> sw,ne string. sorry.
  var envelope = row.envelope.replace(/[A-Z\(\)]+/g, ""),
      envelope = envelope.split(",").map(function(e) { return e.split(" "); }),
      sw = envelope[0].reverse().join(),
      ne = envelope[2].reverse().join();

  // 4sq requires lat,lon not lon,lat.

  return [sw, ne];
}

function wkt2geom(row) {
  var geom = reader.read(row.textgeom);

  return geom;
}

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

  var query = "insert into instagram_array (su_id, lat, lng, radius, the_geom) values ($1, $2, $3, $4, ST_Buffer(ST_Transform(ST_SetSRID(ST_MakePoint($3, $2), 4326), 3310), $4))";

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      console.log(err);
      return callback(err);
    }

    return async.each(parkIds, function(parkId, done) {
      return client.query(query, [parkId, lat, lng, radius], done);
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
    liveTaskCounter["circles"] = liveTaskCounter["circles"] + 1;
    console.log("circle tasks:", liveTaskCounter["circles"]);
    latLngToProjectedCoords(circle.lat, circle.lng, function(err, coords) {
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

// Similar venues:
// https://api.foursquare.com/v2/venues/VENUE_ID/similar


// Full venues

function getFoursquareFullVenue(venue_id, callback) {
  // More info: https://developer.foursquare.com/docs/venues/venues

  console.log("[*] getting full venue for", venue_id);

  urlstr = "https://api.foursquare.com/v2/venues/" + venue_id;
  var url = {
    url: urlstr,
    qs: {
      client_id: env.require("FOURSQUARE_CLIENT_ID"),
      client_secret: env.require("FOURSQUARE_CLIENT_SECRET"),
      v:"20140630"
    }
  };
  request(url, function (err, response, body) {
    if (err) {
      return callback(err);
    }

    if (!err && response.statusCode == 200) {
      try {
        body = JSON.parse(body);
        venue = body.response.venue;
        return callback(null, venue);
      } catch (e) {
        // if JSON parsing fails
        console.log("parsing failed:", body);
        return callback(e);
      }
    }

    if (!err && response.statusCode == 400) {
      body = JSON.parse(body);
      console.log("venue deleted:", body);
      venue = body.response.venue;
      return callback(body); // Return body as err
    }

    if (!err && response.statusCode == 403) {
      body = JSON.parse(body);
      if (body.meta.errorType == 'rate_limit_exceeded') {
        var sleeptime = 60;
        console.log("rate limited, sleeping", sleeptime, "seconds...");
        sleep.sleep(sleeptime);
        return getFoursquareFullVenue(venue_id, callback); //instead, call self again after sleeping...
      } else {
        return callback(body); // Return body as err
      }
    }

    if (!err && response.statusCode != 200) {
      try {
        body = JSON.parse(body);
        console.log("caught not 200:", body);
        return callback(null, body);
      } catch (e) {
        // if JSON parsing fails
        return callback(e);
      }
    }

    return callback();
  });
}

// Next venues

function getFoursquareNextVenues(venue_id, callback) {
  // More info: https://developer.foursquare.com/docs/venues/nextvenues

  console.log("[*] getting next venues for", venue_id);

  urlstr = "https://api.foursquare.com/v2/venues/" + venue_id + "/nextvenues"
  var url = {
    url: urlstr,
    qs: {
      client_id: env.require("FOURSQUARE_CLIENT_ID"),
      client_secret: env.require("FOURSQUARE_CLIENT_SECRET"),
      v:"20140630"
    }
  };
  request(url, function (err, response, body) {
    if (err) {
      return callback(err);
    }

    if (!err && response.statusCode == 200) {
      body = JSON.parse(body);
      count = body.response.nextVenues.count;
      if (!count || count <= 0) {
        return callback(null, []);
      } else {
        venues = body.response.nextVenues.items; // returns "compact venues" format
        return callback(null, venues);
      }
    }

    if (!err && response.statusCode != 200) {
      try {
        return callback(null, JSON.parse(body));
      } catch (e) {
        // if JSON parsing fails
        return callback(e);
      }
    }

    return callback();
  });
}

function queryFoursquareAPI(sw, ne, callback) {
  //console.log("[*] getting 4sq data for", sw, ne);
  var url = {
    url: "https://api.foursquare.com/v2/venues/search",
    qs: {
      intent: "browse",
      limit: 50,
      sw: sw,
      ne: ne,
      client_id: env.require("FOURSQUARE_CLIENT_ID"),
      client_secret: env.require("FOURSQUARE_CLIENT_SECRET"),
      v:"20140630"
    }
  };
  request(url, function (err, response, body) {
    if (err) {
      return callback(err);
    }
    if (!err && response.statusCode == 200) {
      body = JSON.parse(body);
      return callback(null, body);
    }
    if (!err && response.statusCode != 200) {
      console.log("status not 200");
      try {
        body = JSON.parse(body);
        console.log("****** ERROR *****", body);
        return callback(body.meta);
      } catch (e) {
        // if JSON parsing fails
        return callback(e);
      }
    }
    return callback();
  });
}

function foursquareRecursionQueueTask(err, sw, ne, depth, q, callback) {
  queryFoursquareAPI(sw, ne, function(err, body) {
    var venues;
    var count;
    var geocode_too_big = false;
    if (err) {
      if (err.code == 400 && err.errorType == 'geocode_too_big') {
        venues = [];
        count = 0;
        geocode_too_big = true;
      } else if (err.code = 403 && err.errorType == 'rate_limit_exceeded') {
        // If the err.errorType is rate_limit_exceeded, save that metadata differently so we can come back to it?
        // Or, simply slow down a bit?
        var sleeptime = 600; // 600 seconds, or 10 minutes
        console.log("sleeping", sleeptime, "seconds...");
        sleep.sleep(sleeptime);
        venues = [];
        count = 0;
        // Note, this won't actually redo the current park.
      } else {
        console.log(err);
        // TODO: do something here.
        return;
      }
    } else {
      //success
      venues = body.response.venues;
      count = venues.length;

    }

    console.log("depth", depth, "got", count, "venues", sw, ne);

    var swArray = sw.split(","),
        neArray = ne.split(","),
        latMin = +swArray[0],
        lngMin = +swArray[1],
        latMax = +neArray[0],
        lngMax = +neArray[1];

    var date = new Date();

    // Right now this metadata_id is faked.
    // Todo: save information about return code/status
    var metadata_id = saveFoursquareHarvesterMetadata(latMin, lngMin, latMax, lngMax, date, count);

    // Store the list of venues to the database, including the the id of the
    // metadata record, so we can track which request this came from.
    // TODO: check for error
    // TODO: possibly I should only save results if count <= 50 (a recursion leaf), to avoid duplicates in database

    saveFoursquareHarvesterResults(metadata_id, venues);

    // TODO: figure this out: will this recursion solve the problem of missing out
    // on venues inside parks of there are lots of parks outside the bounds (but
    // within the bbox)?

    if (count >= 50 || geocode_too_big) {
      // If the number of venues is 50, subdivide the bounds and recurse.

      if ((latMax - latMin < .001) && (lngMax - lngMin < .001)) {
        console.log("depth", depth, "bbox smaller than .001 degrees. Will not subdivide further");
      } else {

        var latMid = (latMin + latMax) / 2,
            lngMid = (lngMin + lngMax) / 2;

        console.log("venues >= 50, subdivide:", latMin, latMid, latMax, lngMin, lngMid, lngMax);
        var lowerLeft = [latMin,lngMin],
            centerLeft = [latMid,lngMin],
            upperLeft = [latMax,lngMin],
            lowerCenter = [latMin, lngMid],
            center = [latMid, lngMid],
            upperCenter = [latMax, lngMid],
            lowerRight = [latMin, lngMax],
            centerRight = [latMid, lngMax],
            upperRight = [latMax,lngMax];

        var bboxes = [
          [lowerLeft, center],
          [centerLeft, upperCenter],
          [lowerCenter, centerRight],
          [center, upperRight]
        ];

        // Recurse and query again for each quadrant of the original bbox.
        // Keep adding venues to the same "venues" object.
        // When the function is called recursively here, the callback simply returns
        // the collected venues. The top level function is called with a different
        // callback that writes out all the collected venues to a file.
        // TODO: I don't think the venues object is even used anymore. Remove it?

        // TODO: is this the right way to do this, asynchronously?

        bboxes.forEach(function(bbox) {
          // Test each new bbox against parks in the database (null tests against all parks)
          testBboxIntersectionWithParks(bbox, null, function(err, bbox, result) {
            if (result && result.length > 0) {

              var nextDepth = depth + 1;

              liveTaskCounter["4sqgrid"] = liveTaskCounter["4sqgrid"] + 1;
              //console.log("liveTaskCounter[", "4sqgrid", "] recursing:", liveTaskCounter["4sqgrid"]);
              q.push({name: 'another task depth ' + nextDepth, sw: bbox[0].join(), ne: bbox[1].join()}, foursquareRecursionQueueTask(null, bbox[0].join(), bbox[1].join(), nextDepth, q, callback));
            } else {
              //console.log(bbox, "does not intersect, skipping");
            }
          });
        });
      }
    }

    liveTaskCounter["4sqgrid"] = liveTaskCounter["4sqgrid"] - 1;
    //console.log("liveTaskCounter[", "4sqgrid", "]:", liveTaskCounter["4sqgrid"]);
    if (liveTaskCounter["4sqgrid"] == 0) {
      // This happens more than it should, and sooner than it should. The live task counter is not staying updated?
      console.log('all items have been processed');
      return callback(null);
    } // else, return nothing?
  });
}

var liveTaskCounter = {};

function getFoursquareData(sw, ne, depth, callback) {

  // Create a queue with a worker (that currently does nothing but call each task's callback)
  var q = async.queue(function (task, callback) {
    console.log('starting', task.name, task.sw, task.ne);
    callback();
  }, 10);  // TODO: increase this.

  // Add one task. This task will push additional tasks onto the queue if needed.
  // Callback is only called when the task counter reaches zero again
  var depth = 0;
  liveTaskCounter["4sqgrid"] = 1;
  q.push({name: 'top level', sw: sw, ne: ne}, foursquareRecursionQueueTask(null, sw, ne, depth, q, callback));

}


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
 * Get the bounding box for a park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, coords) Called with an array containing the park's bounding box.
 */
var getBoundingBoxForPark = function(park, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox
  //var query = ["select su_id, unit_name, st_astext(st_envelope(st_transform(st_buffer(st_envelope(geom), 500), 4326)))",
  //             "as envelope from ", CPAD_TABLE, " where su_id = $1 limit 1"].join("");
  var query = ["select su_id, unit_name, st_astext(st_envelope(geom)) ",
               "as envelope from ", CPAD_TABLE, " where su_id = $1 limit 1"].join("");

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, [park.id], function(err, res) {
      done();

      if (err) {
        return callback(err);
      }

      var envelope = wkt2bbox(res.rows[0]);

      return callback(null, envelope);

    });
  });
};

var getPolygonForPark = function(park, callback) {
  var query = ["select unit_name, st_astext(geom)",
               "as textgeom from ", CPAD_TABLE, " where su_id = $1 limit 1"].join("");

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, [park.id], function(err, res) {
      done();

      if (err) {
        return callback(err);
      }

      var polygon = wkt2geom(res.rows[0]);

      return callback(null, polygon);

    });
  });
};

/**
 *  The parks argument should be an array of park superunit ids.
 *  If parks is null, will test against all parks.
 *  Returns a list of park ids that intersect the bbox, or an empty array if none.
 */

var testBboxIntersectionWithParks = function(bbox, parks, callback) {
  //var query = ["select ST_Intersects(ST_MakeEnvelope(", bbox[0][1], ",", bbox[0][0], ",", bbox[1][1], ",", bbox[1][0], ",4326),geom) from ", CPAD_TABLE, " where su_id = $1"].join("");
  var query = "select su_id from " + CPAD_TABLE + " where ";
  if (parks) { // should test if it's an array, too
    query += "(";
    su_ids = []
    parks.forEach(function(park_id) {
      su_ids.push("su_id = " + park_id);
    });
    query += su_ids.join(" or ");
    query += ") and ";
  }
  query += " ST_Intersects(ST_MakeEnvelope(" + bbox[0][1] + "," + bbox[0][0] + "," + bbox[1][1] + "," + bbox[1][0] + ",4326),geom)";


  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, function(err, res) {
      done();

      if (err) {
        return callback(err);
      }

      var result = res.rows.map(function(row) { return row.su_id; });

      return callback(null, bbox, result);
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

var noop = function() {};

var writeDataToFile = function(filename, data, callback) {
  callback = callback || noop;

  fs.writeFile(filename, JSON.stringify(data, null, 4), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("[*] data written to file", filename);
    }
    callback(err);
  });
};
var getVenuesDataFromJSON = function(callback) {
  // load
  var path = "4sqdata/";
  fs.readdir(path, function (err, files) {
    files.forEach(function(file) {

      // Do this synchronously to avoid opening too many files on OSX:
      venues = JSON.parse(fs.readFileSync(path + file));
      callback(null, venues);

      // Async version:
      /*
      fs.readFile(path + file, function (err, data) {
        if(err) {
          console.log(err);
        } else {
          venues = JSON.parse(data);
          callback(null, venues);
        }
      });
      */
    });
  });
};

/**
 * only_needing_update  boolean true = only ones needing updates, false = all venues
 **/
var getVenuesDataFromPostgres = function(limit, only_needing_update, callback) {
  if (arguments.length < 3) {
    callback = arguments[arguments.length-1];
    limit = 5000;
  }

  // The "distinct" clause is probably not necessary because these venues will be distinctified
  // during the intersection with the parks shapes
  var query = ["select distinct venueid as id from park_foursquare_venues"].join("");
  if (only_needing_update) {
    // Create list of all venueids which do not have an activity record within the last 24 hours.
    query = ["select a.venueid as id, b.timestamp as timestamp from park_foursquare_venues as a left join ",
              "(select venueid, timestamp from foursquare_venue_activity where timestamp > (CURRENT_TIMESTAMP - INTERVAL '1 day')) as b ",
              "on a.venueid = b.venueid where timestamp is null order by a.venueid"].join("");
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

      var venues = res.rows.map(function(row) {
        return {
          id: row.id,
          name: row.name
        };
      });

      return callback(null, venues);
    });
  });
};

var getParksDataFromPostgres = function(socialMediaType, callback) {
  //var query = ["select su_id as id, unit_name as name, gis_acres as size from ", CPAD_TABLE, " ",
  //              "where unit_name like '%Guadalupe River Park%' order by size desc limit " + limit].join("");
  // Ignore the limit
/*
  var query = ["select su_id as id, unit_name as name, gis_acres as size from ", CPAD_TABLE, " ",
                //"where unit_name like '%Shasta%'"].join("");
                //"where unit_name like '%State Park%'"].join("");
                //"where su_id = 4454"].join("");
                "where unit_name not like '%BLM%' order by su_id"].join("");
*/
  // TODO: figure out the correct time interval to use here
  var query = "select a.su_id as id, a.unit_name as name, a.gis_acres as size from " + CPAD_TABLE + " a ";

  if (socialMediaType == "instagram") {
    query += "left join (select * from instagram_metadata where date > now() - interval '7 days') as b on a.su_id = b.su_id where ";
    query += "a.su_id != 380 and "; // Has topology error. TODO: fix
    query += "a.su_id != 1045 and "; // Sorry, BLM
    query += "a.su_id != 1651 and "; // Has topology error. TODO: fix
    query += "a.su_id != 8516 and "; // Has topology error. TODO: fix
  } else if (socialMediaType == "flickr") {
    query += "left join (select * from flickr_metadata where date > now() - interval '7 days') as b on a.su_id = b.su_id where ";
  }

  //query += "a.unit_name not like '%BLM%' and a.su_id != 380 and a.su_id != 1651 and a.su_id != 8516 and ";

  if (socialMediaType == "instagram" || socialMediaType == "flickr")
    query += "b.count is null ";

  query += "order by a.su_id";

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, function(err, res) {
      done();

      if (err) {
        return callback(err);
      }

      console.log("got", res.rows.length, "parks from database that need harvesting");
      var parks = res.rows.map(function(row) {
        return {
          id: row.id,
          name: row.name,
          size: ~~row.size
        };
      });

      return callback(null, parks);
    });
  });
};

var getCirclesFromPostgres = function(callback) {
  var query = "select lat, lng, radius, array_agg(su_id) as parks from instagram_array group by lat, lng, radius order by lat desc, lng, radius";
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
      var circles = res.rows;
      return callback(null, circles);
    });
  });
};

var getInstagramPhotosForAllCircles = function(callback) {
  return getCirclesFromPostgres(function(err, circles) {
    getInstagramPhotosForCircles(circles, function(err) {
      console.log("[*] done!");
      callback();
    });
  });
};

var getFullVenuesForAllVenues = function(callback) {
  return getVenuesDataFromPostgres(5000, true, function(err, venues) {
    async.eachLimit(venues, 10, function(venue, next) {
      getFoursquareFullVenue(venue.id, function(err, fullVenue) {
        if (err) {
          next();
        } else {
          saveFoursquareActivityResults(fullVenue, next);
        }
      });
    }, function(err) {
      var total = existscount + nonzerocount + zerocount + undefcount;
      console.log("Already exist: " + existscount + " non-zero: " + nonzerocount + " zero: " + zerocount + " undef: " + undefcount + " total: " + total);
      if (err) {
        console.log("[*] done (with error)!");
      } else {
        console.log("[*] done!");
      }
      callback();
    });
  });
};

var getNextVenuesForAllVenues = function(callback) {
  return getVenuesDataFromPostgres(5000, false, function(err, venues) {
    async.eachLimit(venues, 10, function(venue, next) {
      // TODO: don't write to .json and instead save to db
      fs.exists("4sqnextvenues/venuenext." + venue.id + ".json", function(exists) {
        if (!exists) {
          getFoursquareNextVenues(venue.id, function(err, nextVenues) {
            if (nextVenues) {
              console.log("[*] got", nextVenues.length, "next venues for id", venue.id);
              nextVenues.forEach(function(nextvenue) { nextvenue.prev = venue; });
              writeDataToFile("4sqnextvenues/venuenext." + venue.id + ".json", nextVenues, next);
              if (nextVenues.length > 0) {
                nonzerocount++;
              } else {
                zerocount++;
              }
            } else {
              console.log("[*] got no next venues for id", venue.id);
              undefcount++;
            }
          });
        } else {
          console.log("[*] nextvenues for venue " + venue.id + " already exist. skipping.");
          existscount++;
          next();
        }
      });
    }, function(err) {
      // This is getting called before everything terminates... because of nested asyncs?

      var total = existscount + nonzerocount + zerocount + undefcount;
      console.log("Already exist: " + existscount + " non-zero: " + nonzerocount + " zero: " + zerocount + " undef: " + undefcount + " total: " + total);
      if (err) {
        console.log("[*] done (with error)!");
      } else {
        console.log("[*] done!");
      }
      callback();
    });
  });
};

var getFoursquareVenuesForAllGridCells = function(callback) {
  return getGridCellsFromPostgres(function(err, cells) {
    async.eachLimit(cells, 1, function(cell, next) {
      getFoursquareData([cell.latmin,cell.lngmin].join(), [cell.latmax,cell.lngmax].join(), 0, function(err, venues) {
      //getFoursquareVenuesForBbox(cell.latmin, cell.lngmin, cell.latmax, cell.lngmax, function(err, venues) {

        if (venues) {
          console.log("[*] got", venues.length, "venues for", cell.latmin, cell.lngmin, cell.latmax, cell.lngmax);
          next();
        } else {
          // This is always happening because I'm not returning any venues back up the recursion
          // But that's okay for now...
          console.log("[*] got no venues for", cell.latmin, cell.lngmin, cell.latmax, cell.lngmax);
          next();
        }
      });
    }, function() {
      console.log("[*] done!");
      callback();
    });
  });
};

var getFoursquareVenuesForAllParks = function(callback) {
  return getParksDataFromPostgres("foursquare", function(err, parks) {
    async.eachLimit(parks, 1, function(park, next) {
      getFoursquareVenuesForPark(park, function(err, venues) {
        if (venues) {
          console.log("[*] got", venues.length, "venues for", park.name);
          next();
        } else {
          // This is always happening because I'm not returning any venues back up the recursion
          // But that's okay for now...
          console.log("[*] got no venues for", park.name);
          next();
        }
      });
    }, function() {
      console.log("[*] done!");
      callback();
    });
  });
};

var saveFoursquareHarvesterMetadata = function(latMin, lngMin, latMax, lngMax, timestamp, count) {
  //console.log(latMin, lngMin, latMax, lngMax, timestamp, count);
  var query = "insert into foursquare_metadata (su_id, latmin, lngmin, latmax, lngmax, date, count, the_geom) values ($1, $2, $3, $4, $5, $6, $7, ST_MakeEnvelope($3,$2,$5,$4,4326))";

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      throw err;
    }

    return client.query(query, [null, latMin, lngMin, latMax, lngMax, timestamp, count], function(err, res) {
      done();

      if (err) {
        console.log("harvester metadata insert error", err);
        throw err;
      }
      return 0; // TODO: change these

    });
  });

  return 1; // TODO: change these
};

/**
 * Save foursquare venues returned from the harvester.
 *
 * @param metadata_id  ...the database id of the metadata record storing information about the current API query
 * @param venues    ...an array of venues
 * @param park  ...a park object with .id and .name attributes
 * TODO: clean up my docstring formatting.
 */
var saveFoursquareHarvesterResults = function(metadata_id, venues) {
  var query = "insert into foursquare_venues (venueid, name, lat, lng, address, postcode, city, state, country, cc, categ_id, categ_name, verified, restricted, referral_id, the_geom) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, ST_SetSRID(ST_MakePoint($4, $3), 4326))";
  //console.log("saveFoursquareHarvesterResults", metadata_id, venues);

  venues.forEach(function(venue) {
    if (venue) {
      //console.log(venue);
      var params = [venue.id, venue.name, venue.location.lat, venue.location.lng, venue.location.address, venue.location.postalCode, venue.location.city, venue.location.state, venue.location.country, venue.location.cc];
      if (venue.categories.length > 0)
        params.push(venue.categories[0].id, venue.categories[0].name);
      else
        params.push("", "");
      params.push(venue.verified, venue.restricted, venue.referralId);
      // TODO: save the activity to the separate activity table in another db call
      //params.push(venue.verified, venue.restricted, venue.stats.checkinsCount, venue.stats.usersCount, venue.stats.tipCount, venue.referralId, park.id, park.name);
      return pg.connect(DATABASE_URL, function(err, client, done) {
        if (err) {
          throw err;
        }

        return client.query(query, params, function(err, res) {
          done();

          if (err) {
            console.log("harvester results insert error", err);
            throw err;
          }
        });
      });
    }
  });
  // return nothing?
};

/**
 * Save foursquare venues returned from the activity updater.
 *
 * @param venue    ...a venue object returned from the forusquare API
 * @param callback    callback to run next
 * TODO: clean up my docstring formatting.
 */
var saveFoursquareActivityResults = function(venue, callback) {
  var query = "insert into foursquare_venue_activity (venueid, checkinscount, userscount, tipcount, likescount, mayor_id, mayor_firstname, mayor_lastname) values ($1, $2, $3, $4, $5, $6, $7, $8)";
  console.log("saveFoursquareActivityResults", venue.id);

  //console.log(venue);
  var params = [venue.id, venue.stats.checkinsCount, venue.stats.usersCount, venue.stats.tipCount, venue.likes.count];
  if (venue.hasOwnProperty('mayor') && venue.mayor.hasOwnProperty('user')) {
    params.push(venue.mayor.user.id, venue.mayor.user.firstName, venue.mayor.user.lastName);
  } else {
    params.push("", "", "");
  }

  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      return callback(err);
    }

    return client.query(query, params, function(err, res) {
      done();

      if (err) {
        console.log("saveFoursquareActivity error", err, venue);
      }

      return callback(err);
    });
  });
};

var main = function() {

  var argv = require('optimist')
      .demand('t')
      .alias('t', 'type')
      .describe('t', 'type of harvest: flickr, foursquare_venues, foursquare_update, foursquare_nextvenues, twitter, instagram')
      .argv;

  if (argv.t == 'flickr') {

    flickr.getPhotosForAllGridCells(process.exit);

  } else if (argv.t == 'foursquare_venues') {

    //getFoursquareVenuesForAllParks(process.exit);
    getFoursquareVenuesForAllGridCells(process.exit);

  } else if (argv.t == 'foursquare_update') {

    getFullVenuesForAllVenues(process.exit);

  } else if (argv.t == 'foursquare_nextvenues') {

    console.log("foursquare_nextvenues not tested");
    //getNextVenuesForAllVenues();

  } else if (argv.t == 'twitter') {

    console.log("twitter not yet supported. Use python script");

  } else if (argv.t == 'instagram') {

    getInstagramPhotosForAllCircles(process.exit);

  } else if (argv.t == 'create_instagram_array') {

    createInstagramArray(function(err) {
      if (err) {
        throw err;
      }
    });

  } else {
    console.log(argv.t, "not understood");
  }
};

main();
