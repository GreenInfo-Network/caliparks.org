'use strict';

var env = require('require-env'),
    pg  = require('pg');

module.exports = function(req, res, data, callback) {

  pg.connect(env.require('DATABASE_URL'), function(err, client, done) {

    if(err) {
      return console.error('could not connect to postgres', err);
    }

    client.query('SELECT agncy_id, agncy_name, count(agncy_id) as park_count FROM site_park GROUP BY agncy_id, agncy_name ORDER BY agncy_name ASC', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }

      done();

      callback(null, {
        app_title : 'California Open Spaces',
        agencies  : result.rows
      });

    });

  });

}