'use strict';

var pg = require('pg');

var contextBiggestToSmallest = require('../contexts/biggest-to-smallest.js'),
    contextMostPhotographed  = require('../contexts/most-photographed.js'),
    contextMostTweets        = require('../contexts/most-tweets.js'),
    contextMostCheckins      = require('../contexts/most-checkins.js');

var suIdsByHashtag  = require('../public/data/suIdsByHashtag.json'),
    hashtags        = require('../public/data/hashtagsBySuId.json'),
    glop_slider_max = 100,
    sortSettings    = {};

function splitItems(array, splitAt) {
  var arrays = [[],[]];

  array.forEach(function(item, i) {

    if(i < (splitAt || 20)) {
      arrays[0].push(item);
    } else {
      arrays[1].push(item);
    }

  });

  return arrays;
}

module.exports = function(req, res, data, callback) {

  var sortItem, contextBiggestToSmallestDecorated;


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
          // If there are sort params in the URL set them.
          //
          if (req.query.sort) {
            req.query.sort.split(',').forEach(function(option) {
              sortItem = option.split(':');
              sortSettings[sortItem[0]] = sortItem[1];
            });

            if (sortSettings['size'] === 'asc') {
              contextBiggestToSmallestDecorated.reverse();
            }

            if (sortSettings['photos'] === 'asc') {
              contextDataMostPhotographed.parks.reverse();
            }

            if (sortSettings['tweets'] === 'asc') {
              contextDataMostTweets.parks.reverse();
            }

            if (sortSettings['checkins'] === 'asc') {
              contextDataMostCheckins.parks.reverse();
            }
          }

          var biggestToSmallest = splitItems(contextBiggestToSmallestDecorated);
          var mostPhotographed  = splitItems(contextDataMostPhotographed.parks);
          var mostTweets        = splitItems(contextDataMostTweets.parks);
          var mostCheckins      = splitItems(contextDataMostCheckins.parks);

          return callback(null, {
            appTitle               : 'California Open Spaces',
            parks                  : biggestToSmallest[0],
            parksQueue             : JSON.stringify(biggestToSmallest[1]),
            most_photographed      : mostPhotographed[0],
            most_photographedQueue : JSON.stringify(mostPhotographed[1]),
            most_tweets            : mostTweets[0],
            most_tweetsQueue       : JSON.stringify(mostTweets[1]),
            most_checkins          : mostCheckins[0],
            most_checkinsQueue     : JSON.stringify(mostCheckins[1]),
            suIdsByHashtagJSON     : JSON.stringify(suIdsByHashtag),
            hashtags               : hashtags,
            reverseSort : {
              size:(sortSettings['size'] === 'asc'),
              photos:(sortSettings['photos'] === 'asc'),
              tweets:(sortSettings['tweets'] === 'asc'),
              checkins:(sortSettings['checkins'] === 'asc')
            }
          });

        });

      });

    });

  });

};
