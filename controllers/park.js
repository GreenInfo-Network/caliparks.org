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

contexts.tweets = require('../public/data/context-tweets.json');
contexts.foursquareCheckins = require('../public/data/context-foursquare-checkins.json');
contexts.foursquareVenues = require('../public/data/context-foursquare-venues.json');
contexts.flickrPhotos = require('../public/data/context-flickr-photos.json');
contexts.instagramPhotos = require('../public/data/context-instagram-photos.json');

module.exports = function(req, res, data, callback) {
    var park_id = req.params.id,
        positions = {};

    var template  = 'park',
        foursquare_checkins = 0,
        foursquare_tips     = 0,
        instagramPreload    = [],
        instagramPostload   = [],
        tweetsPreload       = [],
        tweetsPostload      = [],
        flickrPreload       = [],
        flickrPostload      = [],
        title,
        thisOne,
        centroid;

    //
    // Get positions
    //
    contexts.tweets.forEach(function(pos, i) {
      if ((pos.superunit_id | 0) === (park_id | 0)) {
        positions.tweets = i;
      }
    });
    contexts.foursquareCheckins.forEach(function(pos, i) {
      if ((pos.superunit_id | 0) === (park_id | 0)) {
        positions.foursquareCheckins = i;
      }
    });
    contexts.foursquareVenues.forEach(function(pos, i) {
      if ((pos.superunit_id | 0) === (park_id | 0)) {
        positions.foursquareVenues = i;
      }
    });

    // Equivalent SQL (slow):
    //   SELECT rank AS position
    //   FROM (
    //     SELECT superunit_id,
    //            rank() OVER (ORDER BY photos DESC),
    //            photos
    //     FROM (
    //       SELECT superunit_id,
    //              COUNT(id) photos
    //       FROM flickr_photos
    //       GROUP BY superunit_id
    //     ) AS _
    //   ) AS _
    //   WHERE superunit_id = 1396

    contexts.flickrPhotos.forEach(function(pos, i) {
      if ((pos.superunit_id | 0) === (park_id | 0)) {
        positions.flickrPhotos = i;
      }
    });
    contexts.instagramPhotos.forEach(function(pos, i) {
      if ((pos.superunit_id | 0) === (park_id | 0)) {
        positions.instagramPhotos = i;
      }
    });

  var dbRequests = {
    result: async.apply(cpad.getPark, park_id, data),
    flesult: async.apply(flickr.getPhotosForPark, park_id, data),
    instasult: async.apply(instagram.getPhotosForPark, park_id, data),
    foursult: async.apply(foursquare.getVenuesForPark, park_id, data),
    tweetsult: async.apply(twitter.getTweetsForPark, park_id, data),
    hipcampsult: async.apply(hipcamp.getActivitiesForPark, park_id, data)
  };

  //
  // Data calls can be filtered for specific types of API calls
  // and fragments
  //
  if (data.dataFilter) {
    if (data.dataFilter === 'flickr') {
      delete dbRequests['instasult'];
      delete dbRequests['foursult'];
      delete dbRequests['tweetsult'];
      delete dbRequests['hipcampsult'];
    }
  }

  return async.parallel(dbRequests, function(err, apiResponse) {
    if (err) {
      return callback(err);
    }

    var result      = apiResponse.result,
        flesult     = apiResponse.flesult,
        instasult   = apiResponse.instasult,
        foursult    = apiResponse.foursult,
        tweetsult   = apiResponse.tweetsult,
        hipcampsult = apiResponse.hipcampsult;

    //
    // Was a park found? if not, just 404
    //
    if (result) {

      //
      // Get checkins and tips count from Foursquare
      //
      if (foursult) {
        foursult.forEach(function(venue) {
          foursquare_checkins += venue.checkinscount;
          foursquare_tips += venue.tipcount;
        });

        var venues_count               = numeral(foursult.length).format('0,0'),
            venues_checkins            = numeral(foursquare_checkins).format('0,0'),
            venues_tips                = numeral(foursquare_tips).format('0,0');
      }

      if (hipcampsult) {
        var hasHipcamp                 = !!hipcampsult,
            hipcampActivities          = (hasHipcamp) ? hipcampsult.activities : null,
            hipcampActivitiesOrganized = [];
      }


      //separate the instagram into preload and post load
      // preloading 32
      var instographer_count = {};
      if (instasult) {
        instasult.forEach(function(photo, i) {

          instographer_count[photo.username] = true;

          thisOne = photo;
          thisOne.thumb = thisOne.standard_resolution.split('_7').join('_5');
          thisOne.thumb = thisOne.standard_resolution.split('_7').join('_5');

          if(i < 32) {
            instagramPreload.push(photo);
          } else {
            instagramPostload.push(photo);
          }
        });
      }

      //separate the tweets into preload and post load
      // preloading 10
      var tweeter_count = {};
      if (tweetsult) {
        tweetsult.forEach(function(tweet, i) {

          tweeter_count[tweet.username] = true;

          if(i < 10) {
            tweetsPreload.push(tweet);
          } else {
            tweetsPostload.push(tweet);
          }
        });
      }

      //separate flickr into preload and post load
      // preloading 5
      var flotographer_count = {};
      if (flesult) {
        flesult.forEach(function(photo, i) {

          flotographer_count[photo.ownername] = true;

          if(i < 5) {
            flickrPreload.push(photo);
          } else {
            flickrPostload.push(photo);
          }
        });
      }

      if (hipcampsult) {
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

      if (result) {
        //
        // Modify CPAD to work better as an API output
        //
        cpadModified = result;
      }

      var output = {};

      //
      // CPAD output
      //
      if (result) {
        output['appTitle']    = 'California Open Spaces > ' + result.unit_name;
        output['park_id']     = result.superunit_id;
        output['name']        = result.unit_name;
        output['bbox']        = result.bbox;
        output['agency_slug'] = result.mng_agncy.split(' ').join('+');
        output['centroid']           = result.centroid;
        output['cpadPark']           = result;
      }

      //
      // Flickr output
      //
      if (flesult) {
        output['totalPhotos']        = flesult.length ? flesult.length : 0;
        output['hasFlickr']          = (output['totalPhotos'] > 0);
        output['flickrPhotos']       = flickrPreload;
        output['flotographer_count'] = Object.keys(flotographer_count).length;
      }

      //
      // Twitter output
      //
      if (tweetsult) {
        output['tweets']             = tweetsPreload;
        output['tweets_queue']       = JSON.stringify(tweetsPostload);
        output['tweets_queue_count'] = tweetsPostload.length;
        output['tweet_count']        = tweetsult.length ? tweetsult.length : null;
        output['tweeter_count']      = Object.keys(tweeter_count).length;
        output['has_tweets']         = tweetsult.length > 0;
      }

      //
      // Instagram output
      //
      if (instasult) {
        output['has_instagram_photos']   = instasult.length > 0;
        output['top_instagram_photos']   = instagramPreload;
        output['instographer_count']     = Object.keys(instographer_count).length;
        output['queue_instagram_photos'] = JSON.stringify(instagramPostload);
        output['queue_instagram_length'] = instagramPostload.length;
        output['instagram_count']        = instasult.length;
      }

      //
      // Foursquare output
      //
      if (foursult) {
        output['has_foursquare']  = (venues_count > 0);
        output['venues_activity'] = foursult;
        output['venues_count']    = foursult.length < 1000000 ? venues_count : '1 M +';
        output['venues_checkins'] = foursquare_checkins < 1000000 ? venues_checkins : '1 M +';
        output['venues_tips']     = foursquare_tips < 1000000 ? venues_tips : '1 M +';
      }

      //
      // Hipcamp output
      //
      if (hipcampsult) {
        output['hasHipcamp']        = hasHipcamp;
        output['hipcampActivities'] = hipcampActivitiesOrganized;
      }

      //
      // Flickr + Instagram output
      //
      if (flesult && instasult) {
        output['total_any_photos'] = (flesult.length + instasult.length);
      }

      //
      // We always get
      //
      output['stories'] = stories.get();


      return callback(null, output);

    } else {
      return callback();
    }
  });
};
