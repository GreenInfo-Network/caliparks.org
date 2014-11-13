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
			text   : 'SELECT manager_id, mng_agncy, unit_name FROM cpad_superunits where manager_id = $1 ORDER BY mng_agncy ASC;',
			values : [req.params.id]
		}, function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}

			agency_name_parts = result.rows[0].mng_agncy.split(',');

			done();

			callback(null, {
				appTitle : 'California Open Spaces > Parks within ' + (agency_name_parts.length > 1 ? agency_name_parts[1] + ' ' + agency_name_parts[0] : agency_name_parts[0]),
			 	name     : result.rows[0].mng_agncy,
			 	parks    : result.rows
			});
		});

	});
}