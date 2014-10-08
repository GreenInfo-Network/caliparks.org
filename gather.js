"use strict";

var fs = require("fs");

var async = require("async"),
    pg = require("pg"),
    request = require("request"),
    env = require("require-env");

var flickr = require("./lib/flickr"),
    instagram = require("./lib/instagram");

var zerocount = 0,
    nonzerocount = 0,
    undefcount = 0,
    existscount = 0;

// Expected to be in EPSG:3310.
var CPAD_TABLE = "cpad_superunits",
    DATABASE_URL = env.require("DATABASE_URL");

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

    flickr();

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

    instagram();

  } else {
    console.log(argv.t, "not understood");
  }
};

main();
