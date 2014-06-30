'use strict';

var flatFileContext = require('../library/flat-file-context.js')({
  name  : 'most-tweets',
  query : {
    text   : 'select su_id, unit_name from site_park',
    values : []
  },
  title : 'Most Tweeted'
});

module.exports = flatFileContext;