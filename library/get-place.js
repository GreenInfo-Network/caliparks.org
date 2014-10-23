'use strict';

var request = require('request'),
    env     = require('require-env');

var isLatLongTest = /^-?\d*.\d*\,-?\d*.\d*$/,
    googleApiKey  = env.require('GOOGLE_APP_KEY'),
    loc, res;

module.exports = function getPlace(locString, callback) {

  if (locString && isLatLongTest.test(locString)) {
    loc = locString.split(',');

    // TODO fetch the map id from the environment
    request('https://maps.googleapis.com/maps/api/geocode/json?latlng='+loc[0]+','+loc[1]+'&key=' + googleApiKey, function (error, response, body) {
      if (error) {
        return callback(error);
      }

      try {
        callback(null, {
          'coordinates' : loc,
          'details'     : JSON.parse(body).results[0][0]
        });
      } catch (e) {
        callback(e);
      }
    });
  } else if(locString) {

    request('https://maps.googleapis.com/maps/api/geocode/json?address='+locString+'&key=' + googleApiKey, function (error, response, body) {
      if (error) {
        return callback(error);
      }

      try {
        var geocoderRes = JSON.parse(body).results;
      } catch (e) {
        callback(e);
      }

      try {
        res = geocoderRes[0].geometry.location;
      } catch (err) {
        callback(err);
      }

      callback(null, {
        'coordinates' : [ res.lat, res.lng],
        'details'     : res
      });
    });

  } else {
    callback(null,null);
  }

}
