'use strict';

var flatFileContext = new require('../library/flat-file-context.js')({
  name  : 'photographed',
  query : 'select su_id, unit_name from site_park',
  title : 'Most photographed'
});

module.exports = flatFileContext;