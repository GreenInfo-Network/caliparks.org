'use strict';

module.exports = function(data, callback) {

  var context = require('../public/data/context-flickr-photos.json');

  console.log('context',context);

  callback(null, {
    parks : context,
    title : 'Most Flickr photos'
  });

}