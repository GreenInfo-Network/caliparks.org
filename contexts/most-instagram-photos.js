'use strict';

var flatFileContext = require('../library/flat-file-context.js')({
  name  : 'instagram-photos',
  query : {
    text   : 'select superunit_id, unit_name from cpad_superunits_4326',
    values : []
  },
  title : 'Most Instagram photos'
});

module.exports = flatFileContext;