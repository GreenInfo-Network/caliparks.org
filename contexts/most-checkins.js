'use strict';

var flatFileContext = require('../library/flat-file-context.js')({
  name  : 'most-checkins',
  query : {
    text   : 'select superunit_id, unit_name from cpad_superunits_4326',
    values : []
  },
  title : 'Most Foursquare Checkins'
});

module.exports = flatFileContext;