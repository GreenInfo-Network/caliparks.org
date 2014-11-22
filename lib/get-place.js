'use strict';

var request = require('request'),
    env     = require('require-env');

var isLatLongTest = /^-?\d*.\d*\,-?\d*.\d*$/,
    googleApiKey  = env.require('GOOGLE_APP_KEY'),
    loc, res;

module.exports = function getPlace(locString, callback) {

  if (locString && isLatLongTest.test(locString)) {
    loc = locString.split(',');

    return request({
      uri: 'https://maps.googleapis.com/maps/api/geocode/json?region=es&latlng='+loc[0]+','+loc[1]+'&key=' + googleApiKey,
      json: true
    }, function (error, response, body) {
      if (error) {
        return callback(error);
      }

      return callback(null, {
        'coordinates' : loc,
        'details'     : body.results[0][0]
      });
    });
  } else if(locString) {

    return request({
      uri: 'https://maps.googleapis.com/maps/api/geocode/json?region=es&address='+locString+'&key=' + googleApiKey,
      json: true
    }, function (error, response, body) {
      if (error) {
        return callback(error);
      }

      var geocoderRes = body.results;

      try {
        res = geocoderRes[0].geometry.location;
      } catch (err) {
        callback(err);
      }

      return callback(null, {
        'coordinates' : [res.lat, res.lng],
        'details'     : res
      });
    });
  }

  return callback();
};
