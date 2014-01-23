module.exports = function(req, res, data) {

	var map = Object.keys(data.parent_entities).sort().map(function(id) {
		return {
			id    : id,
			name  : data.parent_entities[id].name,
			count : data.parent_entities[id].children.length
		};
	});
	
	return {
		app_title    : 'Stamen Parks',
	 	park_data    : data.park_metadata.features,
	 	flickr_data  : data.flickr_data,
	 	parent_names : map
	}
}