'use strict';

var flatFileContext = require('../library/flat-file-context.js')({
  name  : 'most-checkins',
  query : 'select su_id, unit_name from site_park',
  title : 'Most Foursquare Checkins'
});

module.exports = flatFileContext;