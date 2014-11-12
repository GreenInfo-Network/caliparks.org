'use strict';

module.exports = function(req, res, data, callback) {

	var context;
	try {
		context = require('../contexts/' + data.context + '.js');
	} catch (err) {
		res.status(404);
		res.render('404', {
			coverPhoto : {
				farm:9,
				server:8429,
				photoid:7492144602,
				secret:'1706ca60db',
				ownername:'Grand Canyon NPS',
				owner:'grand_canyon_nps'
			},
			appTitle : 'California Open Spaces: #BZZT',
			suggestion : null
		});
	}

	var pg       = require('pg'),
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
		if (!contextData) {
			return callback();
		}

		contextDataDecorated = contextData.parks.map(function(park) {
			park.name = park.unit_name;
			return park;
		});

		if (data.reverse) {
			contextDataDecorated.reverse();
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
			appTitle   : contextData.title,
		 	parks      : contextDataDecorated,
		 	empty      : !(contextDataDecorated.length),
		 	total      : contextDataDecorated.length
		});

	});

}
