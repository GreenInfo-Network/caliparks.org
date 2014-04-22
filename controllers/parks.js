'use strict';

module.exports = function(req, res, data, callback) {

	var context;
	try {
		context = require('../contexts/' + data.context + '.js');
	} catch (err) {
		res.redirect('/404');
	}

	var hashtags = require('../public/data/hashtagsBySuId.json'),
	    pg       = require('pg'),
	    sorts    = {};

	var contextDataDecorated;

	//
	// Add querystring but don't clobber anything called query from the caller
	// 
	data._query = req.query;

	return context(data, function(err, contextData) {

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

		if (data.reverse) {
			contextDataDecorated.reverse();
		}

		var contextParts = [[],[]];

		if(!req.params.format) {
			contextDataDecorated.forEach(function(park, i) {

				if (i < 40) {
					contextParts[0].push(park);
				} else {
					contextParts[1].push(park);
				}

			});
		} else {
			contextParts = [contextDataDecorated,[]];
		}
		

		if (data.context !== 'biggest-to-smallest') {
			sorts['biggest-to-smallest'] = 'park size';
		} 

		if (data.context !== 'most-tweets') {
			sorts['most-tweets'] = 'most tweets';
		} 

		if (data.context !== 'most-photographed') {
			sorts['most-photographed'] = 'most photographed';
		}

		return callback(null, {
			appTitle   : 'California parks: ' + contextData.title,
		 	parks      : contextParts[0],
		 	parksQueue : JSON.stringify(contextParts[1]),
		 	empty      : !(contextDataDecorated.length),
		 	total      : contextDataDecorated.length,
		 	sorts      : {
		 		one : {
		 			key   : Object.keys(sorts)[0],
		 			value : sorts[Object.keys(sorts)[0]]
		 		},
		 		two : {
		 			key   : Object.keys(sorts)[1],
		 			value : sorts[Object.keys(sorts)[1]]
		 		}
		 	}
		});

	});

}