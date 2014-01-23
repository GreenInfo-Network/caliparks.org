module.exports = function(req, res, data, callback) {

	var map = data.parent_entities[req.params.id].children.map(function(child) {

		return {
			photo_count : (data.flickr_data[child.unit_id]) ? data.flickr_data[child.unit_id].length : 0,
			tweet_count : (data.twitter_data[child.unit_id]) ? data.twitter_data[child.unit_id].length : 0,
			properties  : child
		}
	});
	
	callback(null, {
		app_title : 'Stamen Parks',
	 	name      : data.parent_entities[req.params.id].name.split(',')[0],
	 	parks     : map
	});
}