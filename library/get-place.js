'use strict';

var request = require('request');

var isLatLongTest = /^-?\d*.\d*\,-?\d*.\d*$/,
    loc, res;

module.exports = function getPlace(locString, callback) {

  if (locString && isLatLongTest.test(locString)) {
    loc = locString.split(',');

    // TODO fetch the map id from the environment
    request('http://api.tiles.mapbox.com/v3/stamen.hckn2ljm/geocode/'+loc[1]+','+loc[0]+'.json', function (error, response, body) {
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

    request('http://api.tiles.mapbox.com/v3/stamen.hckn2ljm/geocode/'+locString+'.json', function (error, response, body) {
      if (error) {
        return callback(error);
      }

      try {
        var geocoderRes = JSON.parse(body).results;
      } catch (e) {
        callback(e);
      }

      res = (geocoderRes && geocoderRes[0] && geocoderRes[0][0]) ? geocoderRes[0][0] : {lat:null,lon:null};

      callback(null, {
        'coordinates' : [res.lat, res.lon],
        'details'     : res
      });
    });

  } else {
    callback(null,null);
  }

}