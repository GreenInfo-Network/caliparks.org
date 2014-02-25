'use strict';

var flatFileContext = new require('../library/flat-file-context.js')({
  name  : 'instagram-photos',
  query : 'select su_id, unit_name from site_park',
  title : 'Most Instagram photos'
});

module.exports = flatFileContext;