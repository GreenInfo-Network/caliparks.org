'use strict';

module.exports = function(req, res, data, callback) {

	var map = data.parentEntities[req.params.id].children.map(function(child) {

		return {
			photoCount : (data.flickrData[child.unit_id]) ? data.flickrData[child.unit_id].length : 0,
			tweetCount : (data.twitterData[child.unit_id]) ? data.twitterData[child.unit_id].length : 0,
			properties : child
		}
	});
	
	callback(null, {
		appTitle : 'Stamen Parks',
	 	name     : data.parentEntities[req.params.id].name.split(',')[0],
	 	parks    : map
	});
}