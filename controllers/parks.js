'use strict';

module.exports = function(req, res, data, callback) {

	var context  = require('../contexts/' + data.context + '.js'),
	    hashtags = require('../public/data/hashtagsBySuId.json'),
	    pg       = require('pg');

	var contextDataDecorated;

	return context({
		limit : 200,
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

		return callback(null, {
			appTitle : 'California parks: ' + contextData.title,
		 	parks    : contextDataDecorated,
		 	empty    : !(contextDataDecorated.length)
		});

	});

}