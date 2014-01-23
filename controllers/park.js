module.exports = function(req, res, data) {

	var park_data = {title:null, photos:[]},
	    template  = 'park',
	    title     = data.park_metadata_map[req.params.id].unit_name,
	    gps_util  = require('gps-util');

	if (data.override_templates[req.params.id]) {
		template = data.override_templates[req.params.id].template;
	    title    = data.override_templates[req.params.id].title;
	}

	if (data.park_metadata_map[req.params.id].unit_name) {

		return {
			app_title        : title,
	 		park_data        : data.park_metadata_map[req.params.id],
	 		photos           : data.flickr_data[req.params.id],
	 		total_photos     : data.flickr_data[req.params.id] ? data.flickr_data[req.params.id].length : 0,
	 		cover_photo      : data.flickr_data[req.params.id] ? data.flickr_data[req.params.id][0] : null,
	 		tweets           : data.twitter_data[req.params.id],
	 		total_tweets     : data.twitter_data[req.params.id] ? data.twitter_data[req.params.id].length : 0, 
	 		agency_id        : data.park_metadata_map[req.params.id].agncy_id,
	 		location_display : {
	 			lat : gps_util.getDMSLatitude(37.7598),
	 			lon : gps_util.getDMSLongitude(-122.4271)
	 		}
		}

	} else {
		res.send('Well, there is a park we haven\'t learned about yet. Typo perhaps?', 404);
	}
}