'use strict';

var async    = require('async'),
    gpsUtil  = require('gps-util'),
    numeral  = require('numeral');

var cpad       = require('../lib/cpad'),
    flickr     = require('../lib/flickr'),
    foursquare = require('../lib/foursquare'),
    hipcamp    = require('../lib/hipcamp'),
    instagram  = require('../lib/instagram'),
    twitter    = require('../lib/twitter'),
    stories    = require('../library/stories.js');

var activityCategories = require('../config/activityCategories'),
    contexts = {},
    cpadModified;

module.exports = function(req, res, options, callback) {
    var park_id = req.params.id,
        positions = {};

    var template  = 'park',
        foursquare_checkins = 0,
        foursquare_tips     = 0,
        title,
        thisOne,
        centroid;

  var dbRequests = {
    cpad       : async.apply(cpad.getPark,                 park_id, options),
    flickr     : async.apply(flickr.getPhotosForPark,      park_id, options),
    instagram  : async.apply(instagram.getPhotosForPark,   park_id, options),
    foursquare : async.apply(foursquare.getVenuesForPark,  park_id, options),
    twitter    : async.apply(twitter.getTweetsForPark,     park_id, options),
    hipcamp    : async.apply(hipcamp.getActivitiesForPark, park_id, options)
  };

  //
  // Data calls can be filtered for specific types of API calls
  // and fragments
  //

  if (options.dataFilter) {
    for (var i in dbRequests) {
      if (dbRequests.hasOwnProperty(i) && i !== options.dataFilter && i !== 'cpad') {
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

      //
      // Get checkins and tips count from Foursquare
      //
      if (apiResponse.foursquare) {
        apiResponse.foursquare.forEach(function(venue) {
          foursquare_checkins += venue.checkinscount;
          foursquare_tips += venue.tipcount;
        });

        var venues_count               = numeral(apiResponse.foursquare.length).format('0,0'),
            venues_checkins            = numeral(foursquare_checkins).format('0,0'),
            venues_tips                = numeral(foursquare_tips).format('0,0');
      }

      if (apiResponse.hipcamp) {
        var hasHipcamp                 = !!apiResponse.hipcamp,
            hipcampActivities          = (hasHipcamp) ? apiResponse.hipcamp.activities : null,
            hipcampActivitiesOrganized = [];
      }

      if (apiResponse.hipcamp) {
        //
        // If the park has hipcamp activities, organize them
        //
        if (hasHipcamp) {

          //
          // Filter out non activities
          //
          delete hipcampActivities['cpadparkname'];
          delete hipcampActivities['hipcampparkname'];
          delete hipcampActivities['cpadSunma'];
          delete hipcampActivities['activityCount'];
          delete hipcampActivities['other'];

          for(var i in hipcampActivities) {
            if (hipcampActivities.hasOwnProperty(i) && hipcampActivities[i]) {
              hipcampActivitiesOrganized.push({
                'name'     : i,
                'category' : activityCategories[i]
              });
            }
          }

        }
      }

      if (apiResponse.cpad) {
        //
        // Modify CPAD to work better as an API output
        //
        cpadModified = cpad;
      }

      var output = {};

      //
      // CPAD output
      //
      if (apiResponse.cpad) {
        output['appTitle']    = 'California Open Spaces > ' + apiResponse.cpad.unit_name;
        output['park_id']     = apiResponse.cpad.superunit_id;
        output['name']        = apiResponse.cpad.unit_name;
        output['bbox']        = apiResponse.cpad.bbox;
        output['agency_slug'] = apiResponse.cpad.mng_agncy.split(' ').join('+');
        output['centroid']           = apiResponse.cpad.centroid;
        output['cpadPark']           = apiResponse.cpad;
      }

      //
      // Flickr output
      //
      if (apiResponse.flickr) {
        output.flickr = {
          'total' : apiResponse.flickr.length,
          'items' : apiResponse.flickr
        }
      }

      //
      // Twitter output
      //
      if (apiResponse.twitter) {
        output.twitter = {
          'total' : apiResponse.twitter.length,
          'items' : apiResponse.twitter
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
          'total' : apiResponse.instagram.length,
          'items' : apiResponse.instagram
        }
      }

      //
      // Foursquare output
      //
      if (apiResponse.foursquare) {
        output.foursquare = {
          'total'           : apiResponse.foursquare.length,
          'items'           : apiResponse.foursquare,
          'venues_count'    : apiResponse.foursquare.length < 1000000 ? venues_count : '1 M +',
          'venues_checkins' : foursquare_checkins < 1000000 ? venues_checkins : '1 M +',
          'venues_tips'     : foursquare_tips < 1000000 ? venues_tips : '1 M +'

        }
      }

      //
      // Hipcamp output
      //
      if (apiResponse.hipcamp) {
        output.hipcamp = {
          'items' : hipcampActivitiesOrganized
        }
      }

      //
      // Flickr + Instagram output
      //
      if (apiResponse.flickr && apiResponse.instagram) {
        output.total_any_photos = (apiResponse.flickr.length + apiResponse.instagram.length);
      }

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
