'use strict';

var flatFileContext = new require('../library/flat-file-context.js')({
  name  : 'most-tweets',
  query : 'select su_id, unit_name from site_park',
  title : 'Most Tweeted'
});

module.exports = flatFileContext;