'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg');

	var dbCon    = process.env.DATABASE_URL,
        pgClient = new pg.Client(dbCon);

    pgClient.connect(function(err) {

		if(err) {
			return console.error('could not connect to postgres', err);
		}

		pgClient.query('SELECT * FROM site_park WHERE NOT(su_id = 1045) ORDER BY park_area Desc LIMIT 6;', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}

			callback(null, {
				appTitle : 'Stamen Parks',
			 	parks    : result.rows
			});


			pgClient.end();
		});

	});

}