'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg');

	var contextBiggestToSmallest = require('../contexts/biggest-to-smallest.js');

	var dbCon          = process.env.DATABASE_URL,
      pgClient       = new pg.Client(dbCon),
      suIdsByHashtag = require('../public/data/suIdsByHashtag.json');

  return contextBiggestToSmallest({
  	limit : 6
  }, function(err, contextDataBiggestToSmallest) {

		if (err) {
			return callback(err);
		}


		return callback(null, {
			appTitle           : 'Stamen Parks',
		 	parks              : contextDataBiggestToSmallest.parks,
		 	suIdsByHashtagJSON : JSON.stringify(suIdsByHashtag)
		});

	});

}