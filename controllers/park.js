'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg'),
	    gpsUtil = require('gps-util');

	var dbCon    = process.env.DATABASE_URL,
      pgClient = new pg.Client(dbCon);

	var template = 'park';

	  //
		// Get special template if one exists
		//
		if (data.overrideTemplates[req.params.id]) {
      template = data.overrideTemplates[req.params.id].template;
		  title    = data.overrideTemplates[req.params.id].title;
		}

		pgClient.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}

			pgClient.query('select * from site_park where su_id = ' + req.params.id, function(err, result) {
				if(err) {
					return console.error('error running query', err);
				}

        pgClient.query('select * from site_park_flickr_photos where containing_park_id = ' + req.params.id, function(err, flesult) {
        if(err) {
          return console.error('error running query', err);
        }
      
  				//
  				// Was a park found? if not, just 404
  				//
  				if (result.rows[0]) {

  					callback( null, {
  						appTitle        : result.rows[0].unit_name,
  				 		totalPhotos     : flesult.rows.length ? flesult.rows.length : 0,
  				 		coverPhoto      : flesult.rows.length ? flesult.rows[0] : null,
  				 		locationDisplay : {
  				 			lat : gpsUtil.getDMSLatitude(result.rows[0].centroid_latitude),
  				 			lon : gpsUtil.getDMSLongitude(result.rows[0].centroid_longitude)
  				 		},
  				 		cpadPark        : result.rows[0]
  					} );

  				} else {
  					res.send('Well, there is a park we haven\'t learned about yet. Typo perhaps?', 404);
  				}
  			
          pgClient.end();
        });
			});
		});

}