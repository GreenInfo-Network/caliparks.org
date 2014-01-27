'use strict';

module.exports = function(req, res, data, callback) {

	var map = Object.keys(data.parentEntities).sort().map(function(id) {
		return {
			id    : id,
			name  : data.parentEntities[id].name,
			count : data.parentEntities[id].children.length
		};
	});
	
	callback(null, {
		app_title    : 'Stamen Parks',
	 	park_data    : data.parkMetadata.features,
	 	flickr_data  : data.flickrData,
	 	parent_names : map
	});
}