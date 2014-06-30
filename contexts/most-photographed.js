'use strict';

var flatFileContext = require('../library/flat-file-context.js')({
  name  : 'photographed',
  query : {
    text   : 'select su_id, unit_name from site_park',
    values : []
  },
  title : 'Most photographed'
});

module.exports = flatFileContext;