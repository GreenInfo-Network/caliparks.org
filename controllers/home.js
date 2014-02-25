'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg');

	var contextBiggestToSmallest = require('../contexts/biggest-to-smallest.js'),
      contextMostPhotographed  = require('../contexts/most-photographed.js');

	var dbCon             = process.env.DATABASE_URL,
      pgClient          = new pg.Client(dbCon),
      suIdsByHashtag    = require('../public/data/suIdsByHashtag.json'),
      hashtags          = require('../public/data/hashtagsBySuId.json'),
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

      contextBiggestToSmallestDecorated.length = 20;
      contextDataMostPhotographed.parks.length = 20;

      return callback(null, {
        appTitle           : 'Stamen Parks',
        parks              : contextBiggestToSmallestDecorated,
        most_photographed  : contextDataMostPhotographed,
        suIdsByHashtagJSON : JSON.stringify(suIdsByHashtag),
        hashtags           : hashtags
      });

    });

	});

}