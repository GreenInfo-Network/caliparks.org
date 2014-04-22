'use strict';

var flatFileContext = require('../library/flat-file-context.js')({
  name  : 'flickr-photos',
  query : 'select su_id, unit_name from site_park',
  title : 'Most Flickr photos'
});

module.exports = flatFileContext;