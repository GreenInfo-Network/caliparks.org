var fs = require("fs"),
    util = require("util");
var async = require("async"),
    connect = require("connect"),
    pg = require("pg"),
    request = require("request"),
    jsts = require("jsts");

var factory = new jsts.geom.GeometryFactory();
var reader = new jsts.io.WKTReader(factory);

var zerocount = 0,
    nonzerocount = 0,
    undefcount = 0,
    existscount = 0;

var startPostgresClient = function(callback) {
  // postgres
  var client = new pg.Client({
    user: "",
    user: "openspaces",
    //user: "ggnpc",
    password: "",
    database: "openspaces",
    //database: "ggnpc",
    //host: "localhost",
    host: "geo.local",
    port: 5432
  });
  client.connect();
  console.log("[*] connected to db");
  callback(null, client);
}; 

var cpad_table = "cpad_units";

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

// Similar venues:
// https://api.foursquare.com/v2/venues/VENUE_ID/similar


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

function getFoursquareData(client, sw, ne, polygon, park, depth, callback) {
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
      
      venues = body.response.venues;

      var count = venues.length;
      console.log("depth", depth, "got", count, "venues");

      var swArray = sw.split(","),  
          neArray = ne.split(","),  
          latMin = +swArray[0],
          lngMin = +swArray[1],
          latMax = +neArray[0],
          lngMax = +neArray[1];

      // TODO: here I should store the result to the database.
      //    ... Store the date, bounds, etc and metadata for the query
      
      // Maybe I should create my id here, so I already have it? 

      var date = new Date(),
          timestamp = date.getTime();

      // Right now this metadata_id is faked.
      var metadata_id = saveFoursquareMetadata(client, latMin, lngMin, latMax, lngMax, date, count);

      // Store the list of venues to the database, including the the id of the 
      // metadata record, so we can track which request this came from.
      // TODO: check for error

      saveFoursquareResults(client, metadata_id, venues, park);

      // TODO: figure this out: will this recursion solve the problem of missing out
      // on venues inside parks of there are lots of parks outside the bounds (but
      // within the bbox)? 
 
      if (count >= 50) {
        // If the number of venues is 50, subdivide the bounds and recurse.

        var latMid = (latMin + latMax) / 2,
            lngMid = (lngMin + lngMax) / 2;

        console.log("venues >= 50, subdivide:", latMin, latMid, latMax, lngMin, lngMid, lngMax);
        var lowerLeft = sw,
            centerLeft = [latMid,lngMin].join(),
            upperLeft = [latMax,lngMin].join(),
            lowerCenter = [latMin, lngMid].join(),
            center = [latMid, lngMid].join(),
            upperCenter = [latMax, lngMid].join(),
            lowerRight = [latMin, lngMax].join(),
            centerRight = [latMid, lngMax].join(),
            upperRight = ne;

        var bboxes = [
          [sw, center],
          [centerLeft, upperCenter],
          [lowerCenter, centerRight],
          [center, ne]
        ];

        // Recurse and query again for each quadrant of the original bbox.
        // Keep adding venues to the same "venues" object.
        // When the function is called recursively here, the callback simply returns 
        // the collected venues. The top level function is called with a different
        // callback that writes out all the collected venues to a file.

        // TODO: is this the right way to do this, asynchronously?

        bboxes.forEach(function(bbox) {
          // TODO later: Test each new bbox against the extent of the original polygon 

          var nextDepth = depth + 1; 
          getFoursquareData(client, bbox[0], bbox[1], polygon, park, nextDepth, function(err, newvenues) { if (newvenues) newvenues.forEach(function(venue) { venues.push(venue);});});
        });

      }
      return callback(null, venues);
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
 */
var getSwNeForPark = function(client, park, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox
  var query = ["select unit_name, st_astext(st_envelope(st_transform(st_buffer(st_envelope(geom), 500), 4326)))",
               "as envelope from ", cpad_table, " where ogc_fid = $1 limit 1"].join("");

  return client.query(query, [park.id], function(err, res) {
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
 * Get the bounding box for a park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, coords) Called with an array containing the park's bounding box.
 */
var getBoundingBoxForPark = function(client, park, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox
  var query = ["select unit_name, st_astext(st_envelope(st_transform(st_buffer(st_envelope(geom), 500), 4326)))",
               "as envelope from ", cpad_table, " where ogc_fid = $1 limit 1"].join("");

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
  var query = ["select unit_name, st_astext(st_transform(geom, 4326))",
               "as textgeom from ", cpad_table, " where ogc_fid = $1 limit 1"].join("");

  return client.query(query, [park.id], function(err, res) {
    if (err) {
      throw err;
    }
    var polygon = wkt2geom(res.rows[0]);
    // client.end();
    return callback(null, polygon);

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

var getVenuesDataFromPostgres = function(client, limit, callback) {
  if (arguments.length < 3) {
    callback = arguments[arguments.length-1];
    limit = 5000;
  }

  // TODO: only select distinct venueids.
  var query = ["select venueid as id, name, next_count, checkinscount from park_contains_la_counts ", 
                "where next_count is null order by checkinscount desc limit " + limit].join("");
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

var getParksDataFromPostgres = function(client, limit, callback) {
  if (arguments.length < 3) {
    callback = arguments[arguments.length-1];
    limit = 500;
  }
//  var query = ["select ogc_fid as id, unit_name as name, gis_acres as size from cpad19_units ", 
//               "where unit_name like '% State Park' order by size desc limit " + limit].join("");
//  var query = ["select ogc_fid as id, unit_name as name, gis_acres as size from cpad19_units ", 
//                "where unit_name not like 'BLM' order by size desc limit " + limit].join("");
  var query = ["select ogc_fid as id, unit_name as name, gis_acres as size from ", cpad_table, " ", 
                "where unit_name like '%Golden Gate%' order by size desc limit " + limit].join("");
  client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
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

var getNextVenuesForAllVenues = function() {
  return startPostgresClient(function(err, client) {
    return getVenuesDataFromPostgres(client, 5000, function(err, venues) {
      async.eachLimit(venues, 10, function(venue, next) {
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
      });
    });
  });
};

var getFoursquareVenuesForAllParks = function() {
  return startPostgresClient(function(err, client) {
    return getParksDataFromPostgres(client, 250, function(err, parks) {
      async.eachLimit(parks, 1, function(park, next) {
        fs.exists("4sqdata/" + park.id + ".json", function(exists) {
          if (!exists) {
            getFoursquareVenuesForPark(client, park, function(err, venues) {
              if (venues) {
                console.log("[*] got", venues.length, "venues for", park.name);
                venues.forEach(function(venue) { venue.park = park; });
                // TODO: remove this timestamp. It should be unnecessary if
                // we do our recursion correctly and only write to file once.
                var timestamp = new Date().getTime();
                writeDataToFile("4sqdata/" + park.id + "." + timestamp + ".json", venues, next);
              } else {
                console.log("[*] got no venues for", park.name);
              }
            });
          } else {
            console.log("[*] park " + park.name + " already exists. skipping.");
            next();
          }
        });
      }, function() { 
        console.log("[*] done!");
        client.end(); 
      });
    });
  });
};

var saveFoursquareMetadata = function(client, latMin, lngMin, latMax, lngMax, timestamp, count) {
  //console.log(latMin, lngMin, latMax, lngMax, timestamp, count);
  var query = "insert into foursquare_metadata values ($1, $2, $3, $4, $5, $6)";

  return client.query(query, [latMin, lngMin, latMax, lngMax, timestamp, count], function(err, res) {
    if (err) {
      throw err;
    }
    return 0; // TODO: change these

  });

  return 1; // TODO: change these
};

var saveFoursquareResults = function(client, metadata_id, venues, park) {
  var query = "insert into foursquare_venues (venueid, name, lat, lng, address, postcode, city, state, country, cc, categ_id, categ_name, verified, restricted, checkinscount, userscount, tipcount, referral_id, park_id, park_name) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)";
  //console.log(metadata_id, venues);

  venues.forEach(function(venue) {
    if (venue) {
      //console.log(venue);
      venue.park = park;
      var params = [venue.id, venue.name, venue.location.lat, venue.location.lng, venue.location.address, venue.location.postalCode, venue.location.city, venue.location.state, venue.location.country, venue.location.cc];
      if (venue.categories.length > 0)
        params.push(venue.categories[0].id, venue.categories[0].name);
      else
        params.push("", "");
      params.push(venue.verified, venue.restricted, venue.stats.checkinscount, venue.stats.userscount, venue.stats.tipcount, venue.referral_id, venue.park.park_id, venue.park.park_name);
      //console.log(query, params);
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

var main = function() {
  getFoursquareVenuesForAllParks();
  //getNextVenuesForAllVenues();
  // test();
};


main();
