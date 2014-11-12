'use strict';

var pg = require('pg');

var stories = require('../lib/stories.js');

module.exports = function(req, res, data, callback) {

  return callback(null, {
    appTitle               : 'California Open Spaces',
    stories                : stories.get()
  });

};
