'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg');

	var dbCon  = process.env.DATABASE_URL,
        pgClient = new pg.Client(dbCon);

    var agency_name_parts = null;

	pgClient.connect(function(err) {

		if(err) {
			return console.error('could not connect to postgres', err);
		}

		pgClient.query('SELECT * FROM site_park where agncy_id = ' + req.params.id + ' ORDER BY agncy_name ASC;', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}

			agency_name_parts = result.rows[0].agncy_name.split(',');

			callback(null, {
				appTitle : 'California Open Spaces > Parks within ' + (agency_name_parts.length > 1 ? agency_name_parts[1] + ' ' + agency_name_parts[0] : agency_name_parts[0]),
			 	name     : result.rows[0].agncy_name,
			 	parks    : result.rows
			});


			pgClient.end();
		});

	});
}