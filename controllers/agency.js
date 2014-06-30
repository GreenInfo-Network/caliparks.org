'use strict';

var env = require('require-env'),
    pg  = require('pg');

module.exports = function(req, res, data, callback) {

	var pg      = require('pg');

  var agency_name_parts = null;

	pg.connect(env.require('DATABASE_URL'), function(err, client, done) {

		if(err) {
			return console.error('could not connect to postgres', err);
		}

		client.query({
			text   : 'SELECT * FROM site_park where agncy_id = $1 ORDER BY agncy_name ASC;',
			values : [req.params.id]
		}, function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}

			agency_name_parts = result.rows[0].agncy_name.split(',');

			done();

			callback(null, {
				appTitle : 'California Open Spaces > Parks within ' + (agency_name_parts.length > 1 ? agency_name_parts[1] + ' ' + agency_name_parts[0] : agency_name_parts[0]),
			 	name     : result.rows[0].agncy_name,
			 	parks    : result.rows
			});
		});

	});
}