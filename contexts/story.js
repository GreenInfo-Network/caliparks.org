'use strict';

var env       = require('require-env'),
    pg        = require('pg'),
    stories   = require('../library/stories.js');

var dbLimit = 10000,
    story, query_list, title;

module.exports = function(data, _callback) {

  story = stories.getBySlug(data.query);

  return pg.connect(env.require('DATABASE_URL'), function(err, client, done) {
    var callback = function() {
      done();
      return _callback.apply(null, arguments);
    };

    if (err || !story || !story.parks) {
      return callback(err);
    }

    query_list = story.parks.join(',');

    return client.query({
      text   : "SELECT * FROM cpad_superunits_4326 WHERE superunit_id = ANY('{"+query_list+"}'::int[]);"
    }, function(err, result) {
      if(err) {
        return callback(err);
      }

      title = story.icopy;

      return callback(null, {
        parks : result.rows,
        title : (result.rows.length) ? title : 'California Parks'
      });
    });
  });

};
