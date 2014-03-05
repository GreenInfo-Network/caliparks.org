'use strict';

module.exports = function(req, res, data, callback) {

	var context  = require('../contexts/' + data.context + '.js'),
	    hashtags = require('../public/data/hashtagsBySuId.json'),
	    pg       = require('pg');

	var contextDataDecorated;

	return context({
		query : data.query
	}, function(err, contextData) {

		if (err) {
			return callback(err);
		}

		//
		// Decorate the BiggestToSmallestContext
		//
		contextDataDecorated = contextData.parks.map(function(park) {
			park.hashtag = hashtags[park.su_id];
			return park;
		});

		var contextParts = [[],[]];

		contextDataDecorated.forEach(function(park, i) {

			if (i < 40) {
				contextParts[0].push(park);
			} else {
				contextParts[1].push(park);
			}

		});

		return callback(null, {
			appTitle   : 'California parks: ' + contextData.title,
		 	parks      : contextParts[0],
		 	parksQueue : JSON.stringify(contextParts[1]),
		 	empty      : !(contextDataDecorated.length)
		});

	});

}