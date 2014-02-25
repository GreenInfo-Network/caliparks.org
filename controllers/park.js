'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg'),
	    gpsUtil = require('gps-util'),
      numeral = require('numeral');

	var dbCon    = process.env.DATABASE_URL,
      pgClient = new pg.Client(dbCon);

	var template  = 'park',
      park_id   = req.params.id,
      hashtags  = require('../public/data/hashtagsBySuId.json'),
      contexts  = {},
      positions = {},
      foursquare_checkins = 0, 
      foursquare_tips     = 0, 
      tweet_iteration     = 0,
      tweets_all, tweets_filtered;

  //
  // Get positions
  //
  contexts.tweets = require('../public/data/context-tweets.json');
  contexts.tweets.forEach(function(pos, i) {
    if ((pos.su_id | 0) === (park_id | 0)) {
      positions.tweets = i;
    }
  });
  contexts.foursquareCheckins = require('../public/data/context-foursquare-checkins.json');
  contexts.foursquareCheckins.forEach(function(pos, i) {
    if ((pos.su_id | 0) === (park_id | 0)) {
      positions.foursquareCheckins = i;
    }
  });
  contexts.foursquareVenues = require('../public/data/context-foursquare-venues.json');
  contexts.foursquareVenues.forEach(function(pos, i) {
    if ((pos.su_id | 0) === (park_id | 0)) {
      positions.foursquareVenues = i;
    }
  });
  contexts.flickrPhotos = require('../public/data/context-flickr-photos.json');
  contexts.flickrPhotos.forEach(function(pos, i) {
    if ((pos.su_id | 0) === (park_id | 0)) {
      positions.flickrPhotos = i;
    }
  });
  contexts.instagramPhotos = require('../public/data/context-instagram-photos.json');
  contexts.instagramPhotos.forEach(function(pos, i) {
    if ((pos.su_id | 0) === (park_id | 0)) {
      positions.instagramPhotos = i;
    }
  });

	  //
		// Get special template if one exists
		//
		if (data.overrideTemplates[park_id]) {
      template = data.overrideTemplates[park_id].template;
		  title    = data.overrideTemplates[park_id].title;
		}

		pgClient.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}

			pgClient.query('select * from site_park where su_id = ' + park_id, function(err, result) {
				if(err) {
					return console.error('error running query', err);
				}

        pgClient.query('select * from site_park_flickr_photos where containing_park_id = ' + park_id, function(err, flesult) {
        if(err) {
          return console.error('error running query', err);
        }

          pgClient.query('select * from site_instagram_photos where su_id = ' + park_id, function(err, instasult) {
            if(err) {
              return console.error('error running query', err);
            }

            pgClient.query('select * from site_foursquare_venues_activity where su_id = ' + park_id, function(err, foursult) {
              if(err) {
                return console.error('error running query', err);
              }

              pgClient.query('select * from site_tweets where su_id = ' + park_id, function(err, tweetsult) {
                if(err) {
                  return console.error('error running query', err);
                }

                //
                // Was a park found? if not, just 404
                //
                if (result.rows[0]) {

                  //
                  // Get checkins and tips count from Foursquare
                  //
                  foursult.rows.forEach(function(venue) {
                    foursquare_checkins += venue.checkinscount;
                    foursquare_tips += venue.tipcount;
                  });

                  var venues_count     = numeral(foursult.rows.length).format('0,0'),
                      venues_checkins  = numeral(foursquare_checkins).format('0,0'),
                      venues_tips      = numeral(foursquare_tips).format('0,0');


                  callback( null, {
                    appTitle         : 'Stamen Parks: California > ' + result.rows[0].unit_name,
                    park_id          : result.rows[0].su_id,
                    name             : result.rows[0].unit_name,
                    agency_slug      : result.rows[0].agncy_name.split(' ').join('+').split(',')[0],
                    totalPhotos      : flesult.rows.length ? flesult.rows.length : 0,
                    coverPhoto       : flesult.rows.length ? flesult.rows[0] : null,
                    locationDisplay  : {
                      lat : gpsUtil.getDMSLatitude(result.rows[0].centroid_latitude),
                      lon : gpsUtil.getDMSLongitude(result.rows[0].centroid_longitude)
                    },
                    cpadPark         : result.rows[0],
                    hashtag          : hashtags[result.rows[0].su_id],
                    tweets           : tweetsult.rows,
                    tweet_count      : tweetsult.rows.length,
                    has_tweets       : (tweetsult.rows.length > 0),
                    has_instagram_photos : (instasult.rows.length > 0),
                    top_instagram_photos : instasult.rows,
                    has_foursquare   : (venues_count > 0),
                    venues_activity  : foursult.rows,
                    venues_count     : foursult.rows.length < 1000000 ? venues_count : 'A lot!',
                    venues_checkins  : foursquare_checkins < 1000000 ? venues_checkins : 'A lot!',
                    venues_tips      : foursquare_tips < 1000000 ? venues_tips : 'A lot!'
                  } );

                } else {
                  callback( null, null );
                }
              
                pgClient.end();

              });

            });

          });
      
        });
			});
		});

}