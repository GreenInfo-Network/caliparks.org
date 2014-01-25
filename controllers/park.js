module.exports = function(req, res, data, callback) {

	var pg       = require('pg'),
	    gps_util = require('gps-util');

	var park_data = {title:null, photos:[]},
	    template  = 'park',
	    title     = data.park_metadata_map[req.params.id].unit_name,
	    db_con    = process.env.DATABASE_URL,
	    pg_client = new pg.Client(db_con);

	    //
		// Transform raw cpad flatfile stuff
		//
		if (data.override_templates[req.params.id]) {
			template = data.override_templates[req.params.id].template;
		    title    = data.override_templates[req.params.id].title;
		}

		pg_client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}

			pg_client.query('select * from site_parks where unit_id = ' + req.params.id, function(err, result) {
				if(err) {
					return console.error('error running query', err);
				}
			

				//
				// Was a park found? if not, just 404
				//
				if (data.park_metadata_map[req.params.id].unit_name) {

					callback( null, {
						app_title        : result.rows[0].unit_name,
				 		park_data        : data.park_metadata_map[req.params.id],
				 		photos           : data.flickr_data[req.params.id],
				 		total_photos     : data.flickr_data[req.params.id] ? data.flickr_data[req.params.id].length : 0,
				 		cover_photo      : data.flickr_data[req.params.id] ? data.flickr_data[req.params.id][0] : null,
				 		tweets           : data.twitter_data[req.params.id],
				 		total_tweets     : data.twitter_data[req.params.id] ? data.twitter_data[req.params.id].length : 0, 
				 		agency_id        : data.park_metadata_map[req.params.id].agncy_id,
				 		location_display : {
				 			lat : gps_util.getDMSLatitude(result.rows[0].centroid_latitude),
				 			lon : gps_util.getDMSLongitude(result.rows[0].centroid_longitude)
				 		},
				 		cpad_park : result.rows[0]
					} );

				} else {
					res.send('Well, there is a park we haven\'t learned about yet. Typo perhaps?', 404);
				}
			
				pg_client.end();
			});
		});

}