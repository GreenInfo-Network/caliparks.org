'use strict';

var async     = require('async'),
    pg        = require('pg'),
    sanitizer = require('sanitizer');

module.exports = function(data, callback) {

  var dbCon          = process.env.DATABASE_URL,
      pgClient       = new pg.Client(dbCon);

  var dbLimit = 10000,
      dbQuery = '';

    pgClient.connect(function(err) {

    if(err) {
      return console.error('could not connect to postgres', err);
    }

    if (data.limit) {
      dbLimit = data.limit;
    }

    if (data.query) {
      dbQuery = sanitizer.sanitize(data.query).split('+').join(' ') || 'California Department of Parks and Recreation';
    }

    pgClient.query({
      text   : 'SELECT * FROM site_park WHERE agncy_name = $1 LIMIT $2;',
      values : [dbQuery,dbLimit]
    }, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }

      var titleArray = result.rows[0].agncy_name.split(','),
          title;

      if (titleArray.length === 2) {
        title = titleArray[1] + ' ' + titleArray[0];
      } else {
        title = titleArray[0];
      }

      callback(null, {
        parks : result.rows,
        title : (result.rows.length) ? title : 'California Parks'
      });


      pgClient.end();
    });

  });

}