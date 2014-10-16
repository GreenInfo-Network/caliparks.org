"use strict";

var env = require("require-env"),
    pg = require("pg");

var DATABASE_URL = env.require("DATABASE_URL");

var getVenuesForPark = function(parkId, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  id,",
      "  venueid,",
      "  name,",
      "  lat,",
      "  lng,",
      "  address,",
      "  postcode,",
      "  city,",
      "  state,",
      "  country,",
      "  cc,",
      "  categ_id,",
      "  categ_name,",
      "  verified,",
      "  restricted,",
      "  referral_id,",
      "  checkinscount,",
      "  tipcount,",
      "  likescount,",
      "  mayor_id,",
      "  mayor_firstname,",
      "  mayor_lastname",
      "FROM site_foursquare_venues_activity",
      "WHERE su_id = $1",
      "LIMIT 9000"
    ].join("\n");

    return client.query(query, [parkId], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      return callback(null, result.rows);
    });
  });
};

module.exports = {
  getVenuesForPark: getVenuesForPark
};
