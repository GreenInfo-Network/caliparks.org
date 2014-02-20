'use strict';

module.exports = function(req, res, data, callback) {

	var context = require('../contexts/' + data.context);

	return context({}, function(err, contextData) {

		if (err) {
			return callback(err);
		}


		return callback(null, {
			appTitle : 'Stamen Parks: ' + contextData.title,
		 	parks    : contextData.parks
		});

	});

}