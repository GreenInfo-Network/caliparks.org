'use strict';

var flatFileContext = require('../library/flat-file-context.js')({
  name  : 'most-checkins',
  query : {
    text   : 'select su_id, unit_name from site_park',
    values : []
  },
  title : 'Most Foursquare Checkins'
});

module.exports = flatFileContext;