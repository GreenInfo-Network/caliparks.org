'use strict';

var cpad  = require('../lib/cpad.js');

module.exports = function(req, res, data, callback) {

	var pg       = require('pg'),
	    sorts    = {};

	var contextDataDecorated;

	//
	// Add querystring but don't clobber anything called query from the caller
	//
	if (data.context === 'with') {
		data.query = {
			q    : req.query.q || '',
			near : req.params.near  || req.query.near || null,
			with : req.params.query || null
		};
	} else if (data.context === 'near') {
		data.query = {
			q    : req.query.q || '',
			near : req.params.query || null,
			with : req.params.with  || req.query.with || null
		};
	} else {
		data.query = {
			q    : req.params.query || req.query.q || '',
			near : req.query.near || null,
			with : req.query.with || null
		};
	}

	data.options = {
		startat : (req.query.startat|0) || 0,
		perpage : (req.query.perpage|0) || 100,
		not     : req.query.not || null
	}

	cpad.getParks(data, function(err, parks) {

		if (err) {
			return callback(err);
		}

		return callback(null, {
			parks      : parks,
			total      : parks.length
		});

	});

}
