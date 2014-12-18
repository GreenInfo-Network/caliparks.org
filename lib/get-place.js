"use strict";

var assert = require("assert");

var request = require("request"),
    env     = require("require-env");

var LAT_LON_TEST = /^-?\d*.\d*\,-?\d*.\d*$/,
    GOOGLE_APP_KEY = env.require("GOOGLE_APP_KEY");

var isLatLon = function(str) {
  return LAT_LON_TEST.test(str);
};

var toBounds = function(geometry) {

  if (geometry && geometry.southwest && geometry.northeast) {
    return [
      geometry.southwest.lng,
      geometry.southwest.lat,
      geometry.northeast.lng,
      geometry.northeast.lat
    ];
  } else {
    return [];
  }

};

module.exports = function getPlace(location, callback) {
  assert.ok(location, "A target location should be provided.");

  if (isLatLon(location)) {
    // defer to match caller expectations
    return setImmediate(callback, null, {
      coordinates: location.split(",", 2)
    });
  } else {
    return request({
      uri: "https://maps.googleapis.com/maps/api/geocode/json",
      qs: {
        region: "us",
        address: location,
        key: GOOGLE_APP_KEY
      },
      json: true
    }, function (err, response, body) {
      if (err) {
        return callback(err);
      }

      if (body.results.length === 0) {
        return callback(new Error("Failed to geocode '" + location + "'"));
      }

      var geometry = body.results[0].geometry,
          establishment = body.results[0].address_components
            .filter(function(x) {
              return x.types.indexOf("establishment") >= 0;
            })
            .map(function(x) {
              return x.long_name;
            }).shift(),
          placeName = body.results[0].formatted_address
            .replace(/, CA( \d+)?, USA/, "");

      if (establishment) {
        placeName = placeName.replace(establishment + ", ", "");
      }

      return callback(null, {
        name: placeName,
        coordinates: [geometry.location.lat, geometry.location.lng],
        bounds: toBounds(geometry.bounds),
        viewport: toBounds(geometry.viewport)
      });
    });
  }
};
