'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg');

	var dbCon  = process.env.DATABASE_URL,
      pgClient = new pg.Client(dbCon);

	pgClient.connect(function(err) {

		if(err) {
			return console.error('could not connect to postgres', err);
		}

		pgClient.query('SELECT * FROM site_park where agncy_id = ' + req.params.id + ' ORDER BY agncy_name ASC;', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}

			callback(null, {
				appTitle : 'Stamen Parks: California > Parks within ' + result.rows[0].agncy_name,
			 	name     : result.rows[0].agncy_name,
			 	parks    : result.rows
			});


			pgClient.end();
		});

	});
}