'use strict';

var flatFileContext = require('../library/flat-file-context.js')({
  name  : 'instagram-photos',
  query : {
    text   : 'select su_id, unit_name from site_park',
    values : []
  },
  title : 'Most Instagram photos'
});

module.exports = flatFileContext;