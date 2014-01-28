'use strict';

module.exports = function(req, res, data, callback) {

	var pg      = require('pg'),
	    gpsUtil = require('gps-util');

	var dbCon    = process.env.DATABASE_URL,
      pgClient = new pg.Client(dbCon);

	var parkData = {title:null, photos:[]},
	    template = 'park',
	    title    = data.parkMetadataMap[req.params.id].unit_name;

	  //
		// Transform raw cpad flatfile stuff
		//
		if (data.overrideTemplates[req.params.id]) {
			template = data.overrideTemplates[req.params.id].template;
		    title    = data.overrideTemplates[req.params.id].title;
		}

		pgClient.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}

			pgClient.query('select * from site_parks_su where su_id = ' + req.params.id, function(err, result) {
				if(err) {
					return console.error('error running query', err);
				}
			

				//
				// Was a park found? if not, just 404
				//
				if (data.parkMetadataMap[req.params.id].unit_name) {

					callback( null, {
						appTitle        : result.rows[0].unit_name,
				 		parkData        : data.parkMetadataMap[req.params.id],
				 		photos          : data.flickrData[req.params.id],
				 		totalPhotos     : data.flickrData[req.params.id] ? data.flickrData[req.params.id].length : 0,
				 		coverPhoto      : data.flickrData[req.params.id] ? data.flickrData[req.params.id][0] : null,
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

}