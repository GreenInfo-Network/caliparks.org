'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg');

	var contextBiggestToSmallest = require('../contexts/biggest-to-smallest.js'),
      contextMostPhotographed  = require('../contexts/most-photographed.js'),
      contextMostTweets        = require('../contexts/most-tweets.js'),
      contextMostCheckins      = require('../contexts/most-checkins.js');

	var dbCon             = process.env.DATABASE_URL,
      pgClient          = new pg.Client(dbCon),
      suIdsByHashtag    = require('../public/data/suIdsByHashtag.json'),
      hashtags          = require('../public/data/hashtagsBySuId.json'),
      glop_slider_max   = 100,
      contextBiggestToSmallestDecorated;

  return contextBiggestToSmallest({
  	//limit : 6
  }, function(err, contextDataBiggestToSmallest) {

		if (err) {
			return callback(err);
		}

    //
    // Decorate the BiggestToSmallestContext
    //
    contextBiggestToSmallestDecorated = contextDataBiggestToSmallest.parks.map(function(park) {
      park.hashtag = hashtags[park.su_id];
      return park;
    });

		return contextMostPhotographed({
      mixData : contextBiggestToSmallestDecorated
    }, function(err, contextDataMostPhotographed) {

      if (err) {
        return callback(err);
      }

      return contextMostTweets({
        mixData : contextBiggestToSmallestDecorated
      }, function(err, contextDataMostTweets) {

        if (err) {
          return callback(err);
        }

        return contextMostCheckins({
          mixData : contextBiggestToSmallestDecorated
        }, function(err, contextDataMostCheckins) {

          if (err) {
            return callback(err);
          }

          //
          // Limit each to 20... unless I have time to set up 
          // pagination
          //
          contextBiggestToSmallestDecorated.length = glop_slider_max;
          contextDataMostPhotographed.parks.length = glop_slider_max;
          contextDataMostTweets.parks.length       = glop_slider_max;
          contextDataMostCheckins.parks.length     = glop_slider_max;

          return callback(null, {
            appTitle           : 'Stamen Parks',
            parks              : contextBiggestToSmallestDecorated,
            most_photographed  : contextDataMostPhotographed,
            most_tweets        : contextDataMostTweets,
            most_checkins      : contextDataMostCheckins,
            suIdsByHashtagJSON : JSON.stringify(suIdsByHashtag),
            hashtags           : hashtags
          });

        });

      });

    });

	});

}