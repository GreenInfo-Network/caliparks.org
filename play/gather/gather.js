var fs = require("fs"),
    util = require("util");
var async = require("async"),
    connect = require("connect"),
    pg = require("pg"),
    request = require("request"),
    sleep = require("sleep"),
    lockFile = require("lockfile"),
    jsts = require("jsts");

var factory = new jsts.geom.GeometryFactory();
var reader = new jsts.io.WKTReader(factory);

var zerocount = 0,
    nonzerocount = 0,
    undefcount = 0,
    existscount = 0;

var connString = {
    user: "openspaces",
    //user: "ggnpc",
    password: "",
    database: "openspaces",
    //database: "ggnpc",
    //host: "localhost",
    host: "geo.local",
    port: 5432
};

var startPostgresClient = function(callback) {
  // postgres
  var client = new pg.Client(connString);
  client.connect();
  console.log("[*] connected to db");
  callback(null, client);
};

// Must be in 4326, lat lng.
var cpad_table = "cpad_2013b_superunits_ids";

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

var saveInstagramHarvesterMetadata = function(client, park_id, lat, lng, radius, timestamp, count) {
  var query = "insert into instagram_metadata (su_id, lat, lng, radius, date, count, the_geom) values ($1, $2, $3, $4, $5, $6, ST_Buffer(ST_Transform(ST_SetSRID(ST_makepoint($3, $2),4326),3310), $4))";
  //console.log("saveInstagramHarvesterMetadata");

  return client.query(query, [park_id, lat, lng, radius, timestamp, count], function(err, res) {
    if (err) {
      console.log(err);
      throw err;
    }
    return 0; // TODO: change these

  });

  return 1; // TODO: change these
};


function saveInstagramHarvesterResults(client, metadata_id, photos, park) {
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
      client.query(query, params, function (err, res) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  // return nothing?
}

function createLatLngArray(callback) {
  return startPostgresClient(function(err, client) {
    var cellSize = 0.1; // In decimal degrees

    // Get bounds of all parks, in lat lng

    getSwNeForPark(client, null, function(err, sw, ne) {
      if (err) {
        console.log(err);
      }

      // create grid of latlng squares to blanket bounds

      // for each square
        // test if it intersects any parks.
        // Save metadata for square (corners, list of park ids)

      var swArray = sw.split(","),
          neArray = ne.split(","),
          yMin = +swArray[0],
          xMin = +swArray[1],
          yMax = +neArray[0],
          xMax = +neArray[1];
      console.log("bounds:", yMin, xMin, yMax, xMax);

      yMin = Math.floor(yMin/cellSize) * cellSize;
      xMin = Math.floor(xMin/cellSize) * cellSize;
      yMax = Math.ceil(yMax/cellSize) * cellSize;
      xMax = Math.ceil(xMax/cellSize) * cellSize;

      console.log("expanded bounds:", yMin, xMin, yMax, xMax);

      var totalCount = Math.round(((xMax-xMin)/cellSize) * ((yMax-yMin)/cellSize))
      var i = 1;
      console.log("testing", totalCount, "squares");
      for (var x=xMin; x < xMax; x += cellSize) {
        for (var y=yMin; y < yMax; y += cellSize) {
          var queryX = Math.round(x/cellSize) * cellSize;
          var queryY = Math.round(y/cellSize) * cellSize;
          var queryY2 = queryY+cellSize;
          var queryX2 = queryX+cellSize;
          var bbox = [[queryY,queryX],[queryY2,queryX2]];
          // test box with parks
          console.log("testing bbox intersection, y:", queryY, "x:", queryX);
          testBboxIntersectionWithParks(client, bbox, null, function(err, bbox, result) {
            if (result && result.length > 0) {

              console.log("bbox y:", bbox[0][0], "x:", bbox[0][1], "hit", result.length, "parks:", result.join(","));
              saveLatLngArrayResult(client,bbox[0][0],bbox[0][1],bbox[1][0],bbox[1][1],result);
            } 
            if (i % 100 == 0) console.log("done", i, "of", totalCount);
            i++;
          });
        }
      }
      console.log("done", i, "of", totalCount);
      callback();
    });
  });
}

var saveLatLngArrayResult = function(client, latMin, lngMin, latMax, lngMax, park_ids) {
  var query = "insert into latlng_array (su_id, latMin, lngMin, latMax, lngMax, the_geom) values ($1, $2, $3, $4, $5, ST_MakeEnvelope($3,$2,$5,$4,4326))";

  park_ids.forEach(function(park_id) {

    client.query(query, [park_id, latMin, lngMin, latMax, lngMax], function(err, res) {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  });
  // return nothing?
};

function createInstagramArray(callback) {
  return startPostgresClient(function(err, client) {

    var radius = 5000; // Instagram maximum radius allowed in metres

    // Get bounds of all parks in projected units.

    //park = {id:13647}; //yosemite
    //park = {id:9365}; //point reyes

    getProjectedSwNeForPark(client, null, function(err, sw, ne) {
      if (err) {
        console.log(err);
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


      var totalCount = (1+Math.floor((xMax-xMin)/xSpacing)) * (1+Math.floor((yMax-yMin)/ySpacing));
      var i = 1;
      var row = 0;
      console.log("testing", totalCount, "circles");
      for (var y=yMin; y < yMax; y += ySpacing, row++) {
        //console.log("y", y);
        for (var x = row % 2 ? xMin+rowOffset : xMin; x < xMax; x += xSpacing) {
          //console.log("row", row, "x", x, "y", y);
          //if (row % 2) { x += rowOffset; } // odd numbered rows will be offset
          var queryX = x;
          var queryY = y;
          testProjectedCircleIntersectionWithParks(client, queryX, queryY, radius, null, function(err, queryX, queryY, radius, result) {
            if (err) {
              console.log("error of some kind", err);
            }
            console.log("testing circle intersection, y:", queryY, "x:", queryX, radius, result);
            if (result && result.length > 0) {
              projectedCoordsToLatLng(client, queryY, queryX, function(err, latlng) {
                var latMid = latlng[0];
                var lngMid = latlng[1];

                console.log("circle y:", queryY, "x:", queryX, "hit", result.length, "parks:", result.join(","));
                saveInstagramArrayResult(client,latMid,lngMid,radius,result);
              });
            //} else {
            //  console.log("got nothing!")
            }
            if (i % 100 == 0) console.log("done", i, "of", totalCount);
            i++;
          });
        }
      }
      console.log("done", i, "of", totalCount);
      callback();
    });
  });
}

var saveInstagramArrayResult = function(client, lat, lng, radius, park_ids) {
  var query = "insert into instagram_array (su_id, lat, lng, radius, the_geom) values ($1, $2, $3, $4, ST_Buffer(ST_Transform(ST_SetSRID(ST_makepoint($3, $2),4326),3310), $4))";

  park_ids.forEach(function(park_id) {

    client.query(query, [park_id, lat, lng, radius], function(err, res) {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  });
  // return nothing?
};

function getInstagramPhotosForCircles(client, circles, callback) {

  // Create a queue with a worker (that currently does nothing but call each task's callback)
  var q = async.queue(function (task, callback) {
    console.log('starting', task.name, task.centerX, task.centerY, task.radius);
    callback();
  }, 10);  // TODO: increase this.

  circles.forEach(function(circle) {  // Can be synchronous since we're firing of queue tasks
    liveTaskCounter["circles"] = 1;
    latLngToProjectedCoords(client, circle.lat, circle.lng, function(err, coords) {
      q.push({name: "", centerX: coords[1], centerY: coords[0], radius: circle.radius}, instagramRecursionQueueTask(null, client, coords[0], coords[1], circle.radius, null, circle.parks, 1, q, callback));

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
      client_id: "a362b307ff034f53b29672a196b77b02",
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

    if (!err && response.statusCode == 400) {
      try {
        body = JSON.parse(body);
        if (body.code == 420) {
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
        console.log("caught not 200:", body);
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

function instagramRecursionQueueTask(err, client, y, x, radius, polygon, parks, depth, q, callback) {
  // This stuff should be moved into a task that can be added to a queue. 

  // Since we are using projected coordiantes, need to convert to latlng for Instagram API
  projectedCoordsToLatLng(client, y, x, function(err, latlng) {
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

          var metadata_id = saveInstagramHarvesterMetadata(client, null, latMid, lngMid, radius, new Date(), count);

          //metadata_id = 1; // It's currently fake anyway

          saveInstagramHarvesterResults(client, metadata_id, photos, null);

          if (count >= 100 && radius > 10) {	// TODO improve this. For now, stop if radius drops below X metres!

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
              testProjectedCircleIntersectionWithParks(client, newX, newY, newRadius, parks, function(err, newX, newY, newRadius, result) {
                if (result && result.length > 0) {

                  var nextDepth = depth + 1;

                  liveTaskCounter["circles"] = liveTaskCounter["circles"] + 1;
                  q.push({name: 'another task, depth ' + nextDepth, centerX: newX, centerY: newY, radius: newRadius}, instagramRecursionQueueTask(null, client, newY, newX, newRadius, polygon, result, nextDepth, q, callback));

                }
              });
            });
          }
        }
      }

      liveTaskCounter["circles"] = liveTaskCounter["circles"] - 1;

      if (liveTaskCounter["circles"] == 0) {
        // This happens more than it should, and sooner than it should. The live task counter is not staying updated?
        console.log('all items have been processed');
        //return callback(null);
      } // else, return nothing?
    });
  });
}

function hasMorePages(body) {
  return body.photos.page < body.photos.pages;
}

function getFlickrData(bbox, page, photos, callback) {
  if (arguments.length < 4) {
    callback = arguments[arguments.length-1];
    page = 1;
    photos = [];
  }

  console.log("[*] getting page", page);
  var url = {
    url: "http://api.flickr.com/services/rest",
    qs: {
      method: "flickr.photos.search",
      api_key: "f17cc9d3f73f0b45640451a6d3c1946d",
      bbox: bbox,
      has_geo: 1,
      extras: "geo,tags,date_upload,date_taken,owner_name,description,license,url_s,url_m,url_n,url_z,url_c,url_l,url_o",
      min_taken_date: ~~(Date.now() / 1000) - 60*60*24*365*30,
      //min_taken_date: ~~(Date.now() / 1000) - 60*60*24*365,
      format: "json",
      nojsoncallback: 1,
      page: page,
      per_page: 250   // max = 250 for geo queries
    }
  };
  request(url, function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      
      photos = photos.concat(body.photos.photo);

      if (hasMorePages(body) && page <= body.photos.page && page < 100) {	//Stop after 100. TODO: do this better.
        console.log("[*] found another page for", bbox , ":", body.photos.page, "out of", body.photos.pages);
        console.log("[*] current page:", page);
        return getFlickrData(bbox, page + 1, photos, callback);

      } else {
        return callback(null, photos, page);  // callback(err, result)
      }
    
    } else {
      return callback(error);
    }
  });

}

/**
 * Fetch media associated with a specified park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, media[]) Called with a list of media associated with a park.
 */
 // add error checking at every level
var getFlickrPhotosForPark = function(client, park, callback) {
  // return startPostgresClient(function(err, client) {
    return getBoundingBoxForPark(client, park, function(err, bbox) {
      // test bounding box against existing metadata?
      return getFlickrData(bbox, function(err, photos, pages) {
        var bboxArray = bbox.split(",");
        var lngMin = bboxArray[0],
            latMin = bboxArray[1],
            lngMax = bboxArray[2],
            latMax = bboxArray[3];
        var metadata_id = saveFlickrHarvesterMetadata(client, park.id, latMin, lngMin, latMax, lngMax, new Date(), photos.length, pages);
        saveFlickrHarvesterResults(client, metadata_id, photos, park);
        return callback(null, photos, pages);  // everything finished
      });
    });
  // });
};

var getFlickrPhotosForBbox = function(client, latMin, lngMin, latMax, lngMax, callback) {
  // Need to reorder the lat/lng to match expected format of bbox
  return getFlickrData([lngMin,latMin,lngMax,latMax].join(","), function(err, photos, pages) {
/*
    var bboxArray = bbox.split(",");
    var lngMin = bboxArray[0],
        latMin = bboxArray[1],
        lngMax = bboxArray[2],
        latMax = bboxArray[3];
*/
    var metadata_id = saveFlickrHarvesterMetadata(client, null, latMin, lngMin, latMax, lngMax, new Date(), photos.length, pages);
    saveFlickrHarvesterResults(client, metadata_id, photos, null);
    return callback(null, photos, pages);  // everything finished
  });
};

var saveFlickrHarvesterMetadata = function(client, park_id, latMin, lngMin, latMax, lngMax, timestamp, count, pages) {
  var query = "insert into flickr_metadata (su_id, latmin, lngmin, latmax, lngmax, date, count, pages, the_geom) values ($1, $2, $3, $4, $5, $6, $7, $8, ST_MakeEnvelope($3,$2,$5,$4,4326))";
  return client.query(query, [park_id, latMin, lngMin, latMax, lngMax, timestamp, count, pages], function(err, res) {
    if (err) {
      console.log("harvesterMetadata error", err);
      throw err;
    }
    return 0; // TODO: change these

  });

  return 1; // TODO: change these
};


var saveFlickrHarvesterResults = function(client, metadata_id, photos, park) {
  var query = "INSERT INTO flickr_photos (photoid, owner, secret, server, farm, title, latitude, longitude, accuracy, context, place_id, woeid, tags, dateupload, datetaken, ownername, description, license, url_o, width_o, height_o, url_largest, height_largest, width_largest, largest_size, the_geom) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, ST_SetSRID(ST_MakePoint($8, $7), 4326))";

  if (!park) {
    park = { id: null, name: null };
  }

  photos.forEach(function(photo) {
    if (photo) {
      //console.log(photo);
      var params = [photo.id, photo.owner, photo.secret, photo.server, photo.farm, photo.title, photo.latitude, photo.longitude, photo.accuracy, photo.context, photo.place_id, photo.woeid, photo.tags, photo.dateupload, photo.datetaken, photo.ownername];
      if (photo.description.length > 0)
        params.push(photo.description._content);
      else
        params.push("");
      // Here, figure out which is the largest photo size, and use that instead of url_l. Then save largest_size, too.
      var url_largest = photo.url_s;
      var width_largest = photo.width_s;
      var height_largest = photo.height_s;
      var largest_size = "s";
      if (photo.url_m) {
        url_largest = photo.url_m;
        width_largest = photo.width_m;
        height_largest = photo.height_m;
        largest_size = "m";
      }
      if (photo.url_n) {
        url_largest = photo.url_n;
        width_largest = photo.width_n;
        height_largest = photo.height_n;
        largest_size = "n";
      }
      if (photo.url_z) {
        url_largest = photo.url_z;
        width_largest = photo.width_z;
        height_largest = photo.height_z;
        largest_size = "z";
      }
      if (photo.url_c) {
        url_largest = photo.url_c;
        width_largest = photo.width_c;
        height_largest = photo.height_c;
        largest_size = "c";
      }
      if (photo.url_l) {
        url_largest = photo.url_l;
        width_largest = photo.width_l;
        height_largest = photo.height_l;
        largest_size = "l";
      }
      params.push(photo.license, photo.url_o, photo.width_o, photo.height_o, url_largest, height_largest, width_largest, largest_size);
      client.query(query, params, function(err, res) {
        if (err) {
          console.log("harvesterResults error", err);
          //client.end();
          //startPostgresClient(function(err, client) { return client;}); 
          //throw err;
        }
      });
    }
  });
  // return nothing?
};


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
      client_id: "FD34PSNKBUM51D3ATKTMO0G5OTS4YJSWQJ3PA4MLQRZVWELZ",
      client_secret: "MTABKIIFVMV5VNOEXCNQSZC1VZXLJHQZYCWUSIJPNOUOGRTE",
      v:"20130805"
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
      client_id: "FD34PSNKBUM51D3ATKTMO0G5OTS4YJSWQJ3PA4MLQRZVWELZ",
      client_secret: "MTABKIIFVMV5VNOEXCNQSZC1VZXLJHQZYCWUSIJPNOUOGRTE",
      v:"20130805"
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
      client_id: "FD34PSNKBUM51D3ATKTMO0G5OTS4YJSWQJ3PA4MLQRZVWELZ",
      client_secret: "MTABKIIFVMV5VNOEXCNQSZC1VZXLJHQZYCWUSIJPNOUOGRTE",
      v:"20130805"
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

function foursquareRecursionQueueTask(err, client, sw, ne, polygon, park, depth, q, callback) {
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

    console.log("park", park.id, "depth", depth, "got", count, "venues", sw, ne);

    var swArray = sw.split(","),
        neArray = ne.split(","),
        latMin = +swArray[0],
        lngMin = +swArray[1],
        latMax = +neArray[0],
        lngMax = +neArray[1];

    var date = new Date();

    // Right now this metadata_id is faked.
    // Todo: save information about return code/status
    var metadata_id = saveFoursquareHarvesterMetadata(client, park.id, latMin, lngMin, latMax, lngMax, date, count);

    // Store the list of venues to the database, including the the id of the
    // metadata record, so we can track which request this came from.
    // TODO: check for error
    // TODO: possibly I should only save results if count <= 50 (a recursion leaf), to avoid duplicates in database

    saveFoursquareHarvesterResults(client, metadata_id, venues, park);

    // TODO: figure this out: will this recursion solve the problem of missing out
    // on venues inside parks of there are lots of parks outside the bounds (but
    // within the bbox)?

    if (count >= 50 || geocode_too_big) {
      // If the number of venues is 50, subdivide the bounds and recurse.

      var latMid = (latMin + latMax) / 2,
          lngMid = (lngMin + lngMax) / 2;

      console.log("park", park.id, "venues >= 50, subdivide:", latMin, latMid, latMax, lngMin, lngMid, lngMax);
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
        // Test each new bbox against the extent of the original polygon
        testBboxIntersectionWithParks(client, bbox, park, function(err, bbox, result) {
          if (result && result.length > 0) {

            var nextDepth = depth + 1;

            liveTaskCounter[park.id] = liveTaskCounter[park.id] + 1;
            //console.log("liveTaskCounter[", park.id, "] recursing:", liveTaskCounter[park.id]);
            q.push({name: 'another task park: ' + park.id + ' depth ' + nextDepth, sw: bbox[0].join(), ne: bbox[1].join()}, foursquareRecursionQueueTask(null, client, bbox[0].join(), bbox[1].join(), polygon, park, nextDepth, q, callback));
          } else {
            //console.log(bbox, "does not intersect, skipping");
          }
        });
      });
    }

    liveTaskCounter[park.id] = liveTaskCounter[park.id] - 1;
    //console.log("liveTaskCounter[", park.id, "]:", liveTaskCounter[park.id]);
    if (liveTaskCounter[park.id] == 0) {
      // This happens more than it should, and sooner than it should. The live task counter is not staying updated?
      console.log('park', park.id, 'all items have been processed');
      return callback(null);
    } // else, return nothing?
  });
}

var liveTaskCounter = {};

function getFoursquareData(client, sw, ne, polygon, park, depth, callback) {

  // Create a queue with a worker (that currently does nothing but call each task's callback)
  var q = async.queue(function (task, callback) {
    console.log('starting', task.name, task.sw, task.ne);
    callback();
  }, 10);  // TODO: increase this.

  // Add one task. This task will push additional tasks onto the queue if needed.
  // Callback is only called when the task counter reaches zero again
  var depth = 0;
  liveTaskCounter[park.id] = 1;
  q.push({name: 'top level park: '+ park.id, sw: sw, ne: ne}, foursquareRecursionQueueTask(null, client, sw, ne, polygon, park, depth, q, callback));

}


/**
 * Fetch venues associated with a specified park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, venues[]) Called with a list of venues associated with a park.
 */
 // add error checking at every level
var getFoursquareVenuesForPark = function(client, park, callback) {
  // return startPostgresClient(function(err, client) {
  return getPolygonForPark(client, park, function(err, polygon) {

    return getSwNeFromPolygon(client, polygon, function(err, sw, ne) {
    //return getSwNeForPark(client, park, function(err, sw, ne) {
      return getFoursquareData(client, sw, ne, polygon, park, 0, function(err, venues) {
        return callback(null, venues);  // everything finished
      });
    });
  });
};

/**
 * Get the sw, ne corners of a polygon.
 *
 * @param polygon object.
 * @param callback Function(err, sw, ne) Called with the sw and nw coordinates (as strings).
 */
var getSwNeFromPolygon = function(client, polygon, callback) {
  var envelope = polygon.getEnvelope().getCoordinates();

  // For some reason getEnvelope returns a geometry, not an envelope
  
  var sw = [envelope[0].y,envelope[0].x].join(),
      ne = [envelope[2].y,envelope[2].x].join();

  return callback(null, sw, ne);
};

/**
 * Get the sw, ne corners for a park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, sw, ne) Called with the sw and nw coordinates (as strings).
 *
 * If park is null, will return sw, ne corners containing all parks
 */
var getSwNeForPark = function(client, park, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox

  if (park)
    var query = "select su_id, unit_name, st_astext(st_envelope(geom)) as envelope from " + cpad_table + " where su_id = " + park.id + " limit 1";
  else
    var query = "select st_astext(st_envelope(st_setsrid(st_extent(geom),4326))) as envelope from " + cpad_table;

  return client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    var envelope = wkt2swne(res.rows[0]);
    var sw = envelope[0],
        ne = envelope[1];
    // client.end();
    return callback(null, sw, ne);

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
var getProjectedSwNeForPark = function(client, park, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox

  if (park)
    var query = "select su_id, unit_name, st_astext(st_envelope(st_transform(geom,3310))) as envelope from " + cpad_table + " where su_id = " + park.id + " limit 1";
  else
    var query = "select st_astext(st_envelope(st_transform(st_setsrid(st_extent(geom),4326),3310))) as envelope from " + cpad_table;

  return client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    var envelope = wkt2swne(res.rows[0]);
    var sw = envelope[0],
        ne = envelope[1];
    // client.end();
    return callback(null, sw, ne);

  });
};

var latLngToProjectedCoords = function(client, lat, lng, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox

  var query = "select st_y(a) as y, st_x(a) as x from (select st_astext(st_transform(ST_GeomFromText('POINT(" + lng + " " + lat + ")',4326),3310)) as a) as query";

  return client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    var coords = [res.rows[0].y, res.rows[0].x];
    return callback (null, coords);

  });
};

var projectedCoordsToLatLng = function(client, y, x, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox

  var query = "select st_y(a) as lat, st_x(a) as lng from (select st_astext(st_transform(ST_GeomFromText('POINT(" + x + " " + y + ")',3310),4326)) as a) as query";

  return client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    var coords = [res.rows[0].lat, res.rows[0].lng];
    return callback (null, coords);

  });
};

/**
 * Get the bounding box for a park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, coords) Called with an array containing the park's bounding box.
 */
var getBoundingBoxForPark = function(client, park, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox
  //var query = ["select su_id, unit_name, st_astext(st_envelope(st_transform(st_buffer(st_envelope(geom), 500), 4326)))",
  //             "as envelope from ", cpad_table, " where su_id = $1 limit 1"].join("");
  var query = ["select su_id, unit_name, st_astext(st_envelope(geom)) ",
               "as envelope from ", cpad_table, " where su_id = $1 limit 1"].join("");

  return client.query(query, [park.id], function(err, res) {
    if (err) {
      throw err;
    }
    var envelope = wkt2bbox(res.rows[0]);
    // client.end();
    return callback(null, envelope);

  });
};

var getPolygonForPark = function(client, park, callback) {
  var query = ["select unit_name, st_astext(geom)",
               "as textgeom from ", cpad_table, " where su_id = $1 limit 1"].join("");

  return client.query(query, [park.id], function(err, res) {
    if (err) {
      throw err;
    }
    var polygon = wkt2geom(res.rows[0]);
    // client.end();
    return callback(null, polygon);

  });
};

/**
 *  The parks argument should be an array of park superunit ids.
 *  If parks is null, will test against all parks.
 *  Returns a list of park ids that intersect the bbox, or an empty array if none.
 */

var testBboxIntersectionWithParks = function(client, bbox, parks, callback) {
  //var query = ["select ST_Intersects(ST_MakeEnvelope(", bbox[0][1], ",", bbox[0][0], ",", bbox[1][1], ",", bbox[1][0], ",4326),geom) from ", cpad_table, " where su_id = $1"].join("");
  var query = "select su_id from " + cpad_table + " where ";
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


  return client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    var result = res.rows.map(function(row) { return row.su_id; });
    // client.end();
    callback(null, bbox, result);
  });
};


/**
 *  The parks argument should be an array of park superunit ids.
 *  If parks is null, will test against all parks.
 *  Returns a list of park ids that intersect the circle, or an empty array if none.
 */

var testProjectedCircleIntersectionWithParks = function(client, centerX, centerY, radius, parks, callback) {
  //var query = ["select su_id from cpad_2013b_superunits_ids where (su_id = $1) and ST_Intersects(ST_Buffer(ST_SetSRID(ST_MakePoint(", centerX, ",", centerY, "),3310),", radius, "),st_transform(geom,3310))"].join("")
  var query = "select su_id from " + cpad_table + " where ";
  if (parks) { // should test if it's an array, too
    query += "(";
    su_ids = []
    parks.forEach(function(park_id) {
      su_ids.push("su_id = " + park_id);
    });
    query += su_ids.join(" or ");
    query += ") and ";
  }
  query += " ST_Intersects(ST_Buffer(ST_SetSRID(ST_MakePoint(" + centerX + "," + centerY + "),3310)," + radius + "),st_transform(geom,3310))";

  //console.log("testProjectedCircle", query);
  return client.query(query, function(err, res) {
    if (err) {
      //throw err;
      // TODO: deal with this better
      console.log("projection test error, proceeding...", centerX, centerY, radius, "park:", park.id);
      return callback(null, centerX, centerY, radius, false);
    }
    //var result = res.rows;
    var result = res.rows.map(function(row) { return row.su_id; });
    // client.end();
    console.log("testProjectedCircle result:", result);
    return callback(null, centerX, centerY, radius, result);
  });
};

var noop = function() {};

var writeDataToFile = function(filename, data, callback) {
  callback = callback || noop;

  fs.writeFile(filename, JSON.stringify(data, null, 4), function(err) {
    if(err) {
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
var getVenuesDataFromPostgres = function(client, limit, only_needing_update, callback) {
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
  client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    var venues = res.rows.map(function(row) { 
      return {
        id: row.id, 
        name: row.name 
      }; 
    });
    callback(null, venues);
  });
};

var getParksDataFromPostgres = function(client, socialMediaType, callback) {
  //var query = ["select su_id as id, unit_name as name, gis_acres as size from ", cpad_table, " ", 
  //              "where unit_name like '%Guadalupe River Park%' order by size desc limit " + limit].join("");
  // Ignore the limit
/*
  var query = ["select su_id as id, unit_name as name, gis_acres as size from ", cpad_table, " ", 
                //"where unit_name like '%Shasta%'"].join("");
                //"where unit_name like '%State Park%'"].join("");
                //"where su_id = 4454"].join("");
                "where unit_name not like '%BLM%' order by su_id"].join("");
*/
  // TODO: figure out the correct time interval to use here
  var query = "select a.su_id as id, a.unit_name as name, a.gis_acres as size from " + cpad_table + " a ";

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

  client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    console.log("got", res.rows.length, "parks from database that need harvesting");
    var parks = res.rows.map(function(row) { 
      return {
        id: row.id, 
        name: row.name, 
        size: ~~row.size
      }; 
    });
    callback(null, parks);
  });
};

var getGridCellsFromPostgres = function(client, callback) {
  var query = "select distinct latmin, lngmin, latmax, lngmax from latlng_array order by latmin, lngmin, latmax, lngmax";

  client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    console.log("got", res.rows.length, "grid cells from database that need harvesting");
    var cells = res.rows;
    callback(null, cells);
  });
};

var getCirclesFromPostgres = function(client, callback) {
  var query = "select lat, lng, radius, array_agg(su_id) as parks from instagram_array group by lat, lng, radius order by lat desc, lng, radius";
  // A few around the bay area 
  //var query = "select lat, lng, radius, array_agg(su_id) as parks from instagram_array where lat < 37.8 and lat > 37.6 and lng < -122.35 group by lat, lng, radius order by lat desc, lng, radius";
  // Just one circle on SF
  //var query = "select lat, lng, radius, array_agg(su_id) as parks from instagram_array where lat < 37.8 and lat > 37.75 and lng < -122.35 and lng > -122.5 group by lat, lng, radius order by lat desc, lng, radius";

  client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    console.log("got", res.rows.length, "circles from database that need harvesting");
    var circles = res.rows;
    callback(null, client, circles);
  });
};

var getInstagramPhotosForAllCircles = function(callback) {
  return startPostgresClient(function(err, client) {
    return getCirclesFromPostgres(client, function(err, client, circles) {
      getInstagramPhotosForCircles(client, circles, function(err) {
        console.log("[*] done!");
        callback();
      });
    });
  });
};

var getFlickrPhotosForAllGridCells = function(callback) {
  return startPostgresClient(function(err, client) {
    return getGridCellsFromPostgres(client, function(err, cells) {
      async.eachLimit(cells, 1, function(cell, next) {
        getFlickrPhotosForBbox(client, cell.latmin, cell.lngmin, cell.latmax, cell.lngmax, function(err, media, pages) {
          console.log("[*] got", media.length, "photos for ", cell.latmin, cell.lngmin, cell.latmax, cell.lngmax, "after", pages, "page(s)");
          next();
        });
      }, function() { 
        console.log("[*] done!");
        callback();
      });
    });
  });
};

var getFlickrPhotosForAllParks = function() {
  return startPostgresClient(function(err, client) {
    return getParksDataFromPostgres(client, "flickr", function(err, parks) {
      async.eachLimit(parks, 1, function(park, next) {
        getFlickrPhotosForPark(client, park, function(err, media, pages) {
          console.log("[*] got", media.length, "photos for", park.id, park.name, "after", pages, "page(s)");
          next();
        });
      }, function() { 
        console.log("[*] done!");
        //client.end(); 
      });
    });
  });
};

var getFullVenuesForAllVenues = function(callback) {
  return startPostgresClient(function(err, client) {
    return getVenuesDataFromPostgres(client, 5000, true, function(err, venues) {
      async.eachLimit(venues, 10, function(venue, next) {
        getFoursquareFullVenue(venue.id, function(err, fullVenue) {
          if (err) {
            next();
          } else {
            saveFoursquareActivityResults(client, fullVenue, next);
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
  });
};

var getNextVenuesForAllVenues = function(callback) {
  return startPostgresClient(function(err, client) {
    return getVenuesDataFromPostgres(client, 5000, false, function(err, venues) {
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
  });
};

var getFoursquareVenuesForAllParks = function(callback) {
  return startPostgresClient(function(err, client) {
    return getParksDataFromPostgres(client, "foursquare", function(err, parks) {
      async.eachLimit(parks, 1, function(park, next) {
        getFoursquareVenuesForPark(client, park, function(err, venues) {
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
  });
};

var saveFoursquareHarvesterMetadata = function(client, park_id, latMin, lngMin, latMax, lngMax, timestamp, count) {
  //console.log(latMin, lngMin, latMax, lngMax, timestamp, count);
  var query = "insert into foursquare_metadata (su_id, latmin, lngmin, latmax, lngmax, date, count, the_geom) values ($1, $2, $3, $4, $5, $6, $7, ST_MakeEnvelope($3,$2,$5,$4,4326))";

  return client.query(query, [park_id, latMin, lngMin, latMax, lngMax, timestamp, count], function(err, res) {
    if (err) {
      console.log(err);
      throw err;
    }
    return 0; // TODO: change these

  });

  return 1; // TODO: change these
};

/**
 * Save foursquare venues returned from the harvester.
 *
 * @param client    ...the database connection
 * @param metadata_id  ...the database id of the metadata record storing information about the current API query
 * @param venues    ...an array of venues
 * @param park  ...a park object with .id and .name attributes
 * TODO: clean up my docstring formatting.
 */
var saveFoursquareHarvesterResults = function(client, metadata_id, venues, park) {
  var query = "insert into foursquare_venues (venueid, name, lat, lng, address, postcode, city, state, country, cc, categ_id, categ_name, verified, restricted, referral_id, harvested_park_id, harvested_park_name, the_geom) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, ST_SetSRID(ST_MakePoint($4, $3), 4326))";
  console.log("saveFoursquareHarvesterResults", metadata_id, venues, park);

  venues.forEach(function(venue) {
    if (venue) {
      //console.log(venue);
      venue.park = park;
      var params = [venue.id, venue.name, venue.location.lat, venue.location.lng, venue.location.address, venue.location.postalCode, venue.location.city, venue.location.state, venue.location.country, venue.location.cc];
      if (venue.categories.length > 0)
        params.push(venue.categories[0].id, venue.categories[0].name);
      else
        params.push("", "");
      params.push(venue.verified, venue.restricted, venue.referralId, park.id, park.name);
      // TODO: save the activity to the separate activity table in another db call
      //params.push(venue.verified, venue.restricted, venue.stats.checkinsCount, venue.stats.usersCount, venue.stats.tipCount, venue.referralId, park.id, park.name);
      client.query(query, params, function(err, res) {
        if (err) {
          console.log(err);
          //client.end();
          //startPostgresClient(function(err, client) { return client;}); 
          //throw err;
        }
      });
    }
  });
  // return nothing?
};

/**
 * Save foursquare venues returned from the activity updater.
 *
 * @param client    ...the database connection
 * @param venue    ...a venue object returned from the forusquare API
 * @param callback    callback to run next 
 * TODO: clean up my docstring formatting.
 */
var saveFoursquareActivityResults = function(client, venue, callback) {
  var query = "insert into foursquare_venue_activity (venueid, checkinscount, userscount, tipcount, likescount, mayor_id, mayor_firstname, mayor_lastname) values ($1, $2, $3, $4, $5, $6, $7, $8)";
  console.log("saveFoursquareActivityResults", venue.id);

  //console.log(venue);
  var params = [venue.id, venue.stats.checkinsCount, venue.stats.usersCount, venue.stats.tipCount, venue.likes.count];
  if (venue.hasOwnProperty('mayor') && venue.mayor.hasOwnProperty('user'))
    params.push(venue.mayor.user.id, venue.mayor.user.firstName, venue.mayor.user.lastName);
  else
    params.push("", "", "");
  client.query(query, params, function(err, res) {
    if (err) {
      console.log("saveFoursquareActivity error", err, venue);
      //client.end();
      //startPostgresClient(function(err, client) { return client;}); 
      //throw err;
    }
    callback(err);
  });
  // return nothing?
};

var main = function() {

  var argv = require('optimist')
      .demand('t')
      .alias('t', 'type')
      .describe('t', 'type of harvest: flickr, foursquare_venues, foursquare_update, foursquare_nextvenues, twitter, instagram')
      .argv;

  if (argv.t == 'flickr') {

    lockFile.lock('gather_flickr.lock', function (err) {
      if (err) {
        console.log("could not acquire lock for gather_flickr.lock");
      } else {
        getFlickrPhotosForAllGridCells(function() {
          lockFile.unlock('gather_flickr.lock', function (err) {
            if (err) console.log("couldn't unlock gather_flickr.lock")
            else console.log("unlocked gather_flickr.lock")
          });
          process.exit();
        });
      }
    });

  } else if (argv.t == 'foursquare_venues') {

    getFoursquareVenuesForAllParks(function() {
      process.exit();
    });

  } else if (argv.t == 'foursquare_update') {

    lockFile.lock('gather_foursquare_update.lock', function (err) {
      if (err) {
        console.log("could not acquire lock for gather_foursquare_update.lock");
      } else {
        getFullVenuesForAllVenues(function() {
          lockFile.unlock('gather_foursquare_update.lock', function (err) {
            if (err) console.log("couldn't unlock gather_foursquare_update.lock")
            else console.log("unlocked gather_foursquare_update.lock")
          });
          process.exit();
        });
      }
    });

  } else if (argv.t == 'foursquare_nextvenues') {

    console.log("foursquare_nextvenues not tested");
    //getNextVenuesForAllVenues();

  } else if (argv.t == 'twitter') {

    console.log("twitter not yet supported. Use python script");

  } else if (argv.t == 'instagram') {

    lockFile.lock('gather_instagram.lock', function (err) {
      if (err) {
        console.log("could not acquire lock for gather_instagram.lock");
      } else {

        getInstagramPhotosForAllCircles(function() {
          lockFile.unlock('gather_instagram.lock', function (err) {
            if (err) console.log("couldn't unlock gather_instagram.lock")
            else console.log("unlocked gather_instagram.lock")
          });
          process.exit()
        });
      }
    });

  } else if (argv.t == 'create_instagram_array') {

    createInstagramArray(function() { process.exit() });

  } else if (argv.t == 'create_latlng_array') {

    createLatLngArray(function() { process.exit() });

  } else {
    console.log(argv.t, "not understood");
  }
};

main();
