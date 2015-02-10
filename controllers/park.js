'use strict';

var async    = require('async'),
    gpsUtil  = require('gps-util'),
    numeral  = require('numeral');

var cpad       = require('../lib/cpad'),
    flickr     = require('../lib/flickr'),
    instagram  = require('../lib/instagram'),
    twitter    = require('../lib/twitter'),
    stories    = require('../lib/stories.js');

// TODO why is formatting of numbers done here rather than in the view?
var formatNumber = function(number) {
  if (!number || Number.isNaN(number)) {
    return 0;
  }

  if (number < 1000000) {
    return numeral(number).format('0,0');
  }

  return '1 M +';
};

module.exports = function(req, res, options, callback) {
    var park_id = req.params.id || req.query.id,
        positions = {};

  var dbRequests = {
    cpad       : async.apply(cpad.getPark,                 park_id, options),
    flickr     : async.apply(flickr.getPhotosForPark,      park_id, options),
    instagram  : async.apply(instagram.getPhotosForPark,   park_id, options),
    twitter    : async.apply(twitter.getTweetsForPark,     park_id, options),
    stats      : async.apply(cpad.getParkStats,            park_id, options)
  };

  //
  // Data calls can be filtered for specific types of API calls
  // and fragments
  //

  if (options.dataFilter) {
    for (var i in dbRequests) {
      if (dbRequests.hasOwnProperty(i) && i !== options.dataFilter && i !== 'cpad' && i !== 'stats') {
        delete dbRequests[i];
      }
    }
  }

  return async.parallel(dbRequests, function(err, apiResponse) {

    if (err) {
      return callback(err);
    }

    //
    // Was a park found? if not, just 404
    //
    if (apiResponse.cpad) {


      var output = {};

      //
      // CPAD output
      //
      if (apiResponse.cpad) {

        var coords = JSON.parse(apiResponse.cpad.centroid).coordinates;

        output['appTitle']    = 'California Open Spaces > ' + apiResponse.cpad.unit_name;
        output['park_id']     = apiResponse.cpad.superunit_id;
        output['unit_name']   = apiResponse.cpad.unit_name;
        output['bbox']        = apiResponse.cpad.bbox;
        output['agency_slug'] = apiResponse.cpad.mng_agncy.split(' ').join('+');
        output['centroid']    = apiResponse.cpad.centroid;
        output['latitude']    = coords[1];
        output['longitude']   = coords[0];
        output['cpadPark']    = apiResponse.cpad;
      }

      //
      // Flickr output
      //
      output.flickr = {
        'total' : apiResponse.flickr ? apiResponse.flickr.length : null,
        'items' : apiResponse.flickr
      };

      //
      // Twitter output
      //
      output.twitter = {
        'total' : formatNumber(apiResponse.stats.tweet_count),
        'items' : apiResponse.twitter
      };

      //
      // Query state
      //
      // string booleans render Handlebars if statements useless!
      //
      output.query = req.query;

      for (var i in output.query) {
        if (output.query.hasOwnProperty(i)) {
          if (output.query[i] === 'false' || output.query[i] === 'true') {
            output.query[i] = (output.query[i] === 'true') ? true : false;
          }
        }
      }

      //
      // Instagram output
      //

      if (apiResponse.instagram) {

        //
        // We are only storing the path to the standard resolution version (or 7). This
        // adds a property for the thumb (or 5) version
        // TODO: Move this to the instagram lib
        //
        apiResponse.instagram = apiResponse.instagram.map(function(photo) {
          photo.thumb = photo.standard_resolution.replace(/_7\.jpg/, '_5.jpg');
          return photo;
        });

        output.instagram = {
          'total' : apiResponse.stats.instagram_photo_count,
          'items' : apiResponse.instagram
        };
      }

      //
      // Foursquare output
      //
      output.foursquare = {
        'venues_count'    : formatNumber(apiResponse.stats.foursquare_venue_count),
        'venues_checkins' : formatNumber(apiResponse.stats.swarm_checkin_count),
        'venues_tips'     : formatNumber(apiResponse.stats.foursquare_tip_count)
      };

      //
      // Hipcamp output
      //
      if (apiResponse.cpad.activity) {
        output.activity = apiResponse.cpad.activity;
      }

      //
      // Flickr + Instagram output
      //
      output.total_any_photos = formatNumber(apiResponse.stats.flickr_photo_count + apiResponse.stats.instagram_photo_count);

      //
      // We always get these unliess the the data is filtered
      //
      if (!options.dataFilter) {
        output.stories = stories.get();
      }


      return callback(null, output);

    } else {
      return callback();
    }
  });
};
