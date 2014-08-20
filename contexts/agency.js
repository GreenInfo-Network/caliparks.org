'use strict';

var env       = require('require-env'),
    pg        = require('pg'),
    sanitizer = require('sanitizer');

module.exports = function(data, _callback) {

  var dbLimit = 10000,
      dbQuery = '';

  return pg.connect(env.require('DATABASE_URL'), function(err, client, done) {
    var callback = function() {
      done();
      return _callback.apply(null, arguments);
    };

    if (err) {
      return callback(err);
    }

    if (data.limit) {
      dbLimit = data.limit;
    }

    if (data.query) {
      dbQuery = sanitizer.sanitize(data.query).split('+').join(' ') || 'California Department of Parks and Recreation';
    }

    return client.query({
      text   : 'SELECT * FROM site_park WHERE agncy_name = $1 LIMIT $2;',
      values : [dbQuery,dbLimit]
    }, function(err, result) {
      if(err) {
        return callback(err);
      }

      var titleArray = (result.rows.length) ? sanitizer.sanitize(result.rows[0].agncy_name).split(',') : null,
          title;

      if (titleArray[1]) {
        title = titleArray[1] + ' ' + titleArray[0];
      } else {
        title = (titleArray) ? titleArray[0] : sanitizer.sanitize(result);
      }

      return callback(null, {
        parks : result.rows,
        title : (result.rows.length) ? title : 'California Parks'
      });
    });
  });
};
