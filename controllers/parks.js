'use strict';

var cpad    = require('../lib/cpad.js'),
    stories = require('../lib/stories.js');

module.exports = function(req, res, data, callback) {

	var pg       = require('pg'),
	    sorts    = {};

	var contextDataDecorated, story;

	//
	// Is this a story context?
	//
	if (data.context === 'story') {
		story = stories.getBySlug(req.params.query);

		if (story.parks) {
			return cpad.getParksByIdList(story.parks, function(err, parks) {

				if (err) {
					return callback(err);
				}

				go(err, parks);
			});
		}
	}

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
	} else if (data.context === 'story') {
		data.query = {
			q    : story.q    || '',
			near : story.near || null,
			with : story.with || null
		};
	} else if (req.params.query || req.query.q || req.query.near || req.query.with) {
		data.query = {
			q    : req.params.query || req.query.q || '',
			near : req.query.near || null,
			with : req.query.with || null
		};
	}

	cpad.getParks(data, function(err, parks) {

		go(err, parks);

	});

	function go(err, parks) {
		if (err) {
			return callback(err);
		}

		data.options = {
			startat : (req.query.startat|0) || 0,
			perpage : (req.query.perpage|0) || 100,
			not     : req.query.not || null
		}

		return callback(null, {
			parks   : parks,
			total   : parks.length,
			startat : data.options.startat,
			perpage : data.options.perpage,
			query   : data.query
		});
	}

}
