'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg'),
	    gpsUtil = require('gps-util');

	var dbCon    = process.env.DATABASE_URL,
      pgClient = new pg.Client(dbCon);

	var template = 'park',
      park_id  = req.params.id,
      hashtags = require('../public/data/hashtagsBySuId.json'),
      tweets_all, tweets_filtered, tweet_iteration = 0;

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

            //
            // Was a park found? if not, just 404
            //
            if (result.rows[0]) {

              //
              // Get tweets
              //
              tweets_all      = require('../public/data/park_tweets.json'),
              tweets_filtered = [];

              tweets_all.features.forEach(function(tweet) {

                if (tweet.properties.park_name === result.rows[0].unit_name && tweet_iteration < 20) {
                  tweet_iteration++;
                  tweets_filtered.push(tweet.properties);
                }

              });

              /*
              var bbox     = JSON.parse(result.rows[0].bbox),
                  distance = (gpsUtil.getDistance(bbox.coordinates[0][3][1], bbox.coordinates[0][3][0], bbox.coordinates[0][4][1], bbox.coordinates[0][4][0])/69);
              console.log(distance + ' Miles');
              */

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
                tweets           : tweets_filtered,
                tweet_count      : tweets_filtered.length,
                top_instagram_photos : instasult.rows
              } );

            } else {
              callback( null, null );
            }
          
            pgClient.end();
          });
      
        });
			});
		});

}