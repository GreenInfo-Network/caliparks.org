"use strict";

var fs = require("fs");

var async = require("async"),
    pg = require("pg"),
    request = require("request"),
    env = require("require-env");

var flickr = require("./lib/flickr"),
    foursquare = require("./lib/foursquare"),
    instagram = require("./lib/instagram");

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

    foursquare();

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
