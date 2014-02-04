'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg');

	var dbCon    = process.env.DATABASE_URL,
        pgClient = new pg.Client(dbCon);

    pgClient.connect(function(err) {

		if(err) {
			return console.error('could not connect to postgres', err);
		}

		pgClient.query('SELECT agncy_id, agncy_name, count(agncy_id) as park_count FROM site_park GROUP BY agncy_id, agncy_name ORDER BY agncy_name ASC;', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}

			callback(null, {
				app_title : 'Stamen Parks',
			 	agencies  : result.rows
			});


			pgClient.end();
		});

	});

}