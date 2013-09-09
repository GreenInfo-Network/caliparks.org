var fs = require("fs"),
    util = require("util");
var async = require("async"),
    connect = require("connect"),
    pg = require("pg"),
    request = require("request");

var zerocount = 0,
    nonzerocount = 0,
    undefcount = 0,
    existscount = 0;

var startPostgresClient = function(callback) {
  // postgres
  var client = new pg.Client({
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

function getFoursquareData(sw, ne, callback) {
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
 * Fetch media associated with a specified park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, media[]) Called with a list of media associated with a park.
 */
 // add error checking at every level
var getFoursquareVenuesForPark = function(client, park, callback) {
  // return startPostgresClient(function(err, client) {
    return getSwNeForPark(client, park, function(err, sw, ne) {
      return getFoursquareData(sw, ne, function(err, venues) {
        return callback(null, venues);  // everything finished
      });
    });
  // });
};

/**
 * Get the sw, ne corners for a park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, coords) Called with an array containing the park's bounding box.
 */
var getSwNeForPark = function(client, park, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox
  var query = ["select unit_name, st_astext(st_envelope(st_transform(st_buffer(st_envelope(geom), 500), 4326)))",
               "as envelope from cpad_units where ogc_fid = $1 limit 1"].join("");

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
               "as envelope from cpad_units where ogc_fid = $1 limit 1"].join("");

  return client.query(query, [park.id], function(err, res) {
    if (err) {
      throw err;
    }
    var envelope = wkt2bbox(res.rows[0]);
    // client.end();
    return callback(null, envelope);

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
//  var query = ["select ogc_fid as id, unit_name as name, gis_acres as size from cpad_units ", 
//               "where unit_name like '% State Park' order by size desc limit " + limit].join("");
  var query = ["select ogc_fid as id, unit_name as name, gis_acres as size from cpad_units ", 
                "where unit_name not like 'BLM' order by size desc limit " + limit].join("");
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
            getFoursquareNextVenues(venue.id, function(err, media) {
              if (media) {
                console.log("[*] got", media.length, "next venues for id", venue.id);
                media.forEach(function(nextvenue) { nextvenue.prev = venue; });
                writeDataToFile("4sqnextvenues/venuenext." + venue.id + ".json", media, next);
                if (media.length > 0) {
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
            getFoursquareVenuesForPark(client, park, function(err, media) {
              if (media) {
                console.log("[*] got", media.length, "venues for", park.name);
                media.forEach(function(venue) { venue.park = park; });
                writeDataToFile("4sqdata/" + park.id + ".json", media, next);
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


var main = function() {
  //getFoursquareVenuesForAllParks();
  getNextVenuesForAllVenues();
  // test();
};


main();
