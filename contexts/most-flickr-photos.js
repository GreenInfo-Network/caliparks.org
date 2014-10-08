'use strict';

var flatFileContext = require('../library/flat-file-context.js')({
  name  : 'flickr-photos',
  query : {
    text   : 'select superunit_id, unit_name from cpad_superunits_4326',
    values : []
  },
  title : 'Most Flickr photos'
});

module.exports = flatFileContext;