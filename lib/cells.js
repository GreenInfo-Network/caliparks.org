"use strict";

var env = require("require-env"),
    pg = require("pg");

var getGridCells = function(callback) {
  //var query = "select distinct latmin, lngmin, latmax, lngmax from latlng_array order by latmin, lngmin, latmax, lngmax";
  // Find only those needing update:
  //var query = "select distinct a.latmin, a.lngmin, a.latmax, a.lngmax from latlng_array as a left join (select * from foursquare_metadata where date > (CURRENT_TIMESTAMP - INTERVAL '7 days')) as b on a.latmin = b.latmin and a.lngmin = b.lngmin and a.latmax = b.latmax and a.lngmax = b.lngmax where date is null order by a.latmin, a.lngmin, a.latmax, a.lngmax";
  //var query = "select a.latmin, a.lngmin, a.latmax, a.lngmax, a.parks, b.date, b.count from (select latmin, lngmin, latmax, lngmax, array_agg(su_id) as parks from latlng_array group by latmin, lngmin, latmax, lngmax order by latmin, lngmin, latmax, lngmax) as a left join (select distinct on (latmin, lngmin, latmax, lngmax) * from foursquare_metadata where date > (CURRENT_TIMESTAMP - INTERVAL '7 days') order by latmin, lngmin, latmax, lngmax, date desc) as b on a.latmin = b.latmin and a.lngmin = b.lngmin and a.latmax = b.latmax and a.lngmax = b.lngmax order by a.latmin, a.lngmin, a.latmax, a.lngmax";
  //var query = "select distinct latmin, lngmin, latmax, lngmax from latlng_array where latmin = 34.7 and lngmin = -120.5 order by latmin, lngmin, latmax, lngmax";
  var query = "select distinct latmin, lngmin, latmax, lngmax from latlng_array order by latmin, lngmin desc, latmax, lngmax desc";

  return pg.connect(env.require("DATABASE_URL"), function(err, client, done) {
    done();

    return client.query(query, function(err, res) {
      if (err) {
        return callback(err);
      }

      console.log("got", res.rows.length, "grid cells from database that need harvesting");

      return callback(null, res.rows);
    });
  });
};

module.exports = {
  getGridCells: getGridCells
};
