'use strict';

var pg     = require('pg'),
    colors = require('colors'),
    async  = require('async');

var noId = [],
    config, hipcampData;

console.log('Import Hipcamp data to database'.blue);

//
// Load config
//
try {
  config = require('./config.json');
} catch (err) {
  console.error(err);
  process.exit(1);
}



//
// Connect to DB
//
return pg.connect('postgres://'+config.postgres.user+'@'+config.postgres.host+'/' + config.postgres.database, function(err, client, done) {

  if (err) {
    console.error(err);
    process.exit(1);
  }

  //
  // Update Hipcamp Activity data table with each line in the
  // hipcampData object
  //
  async.each(hipcampData, function(park, callback) {

    if (parseInt(park[config.hipcamp.su_idColumn], 10).toString() !== "NaN") {
      return client.query({
        text   : 'SELECT * FROM '+config.postgres.tables.activities+' WHERE '+config.CPAD.idColumn+' = $1;',
        values : [
          park[config.hipcamp.su_idColumn]
        ]
      }, function(err, result) {
        if(err) {
          return callback(err);
        }

        if (result.rows.length) { //Update

          return client.query({
            text   : 'UPDATE '+config.postgres.tables.activities+' SET activities=$1 WHERE su_id=$2',
            values : [
              JSON.stringify(park),
              park[config.hipcamp.su_idColumn]
            ]
          }, function(err, result) {
            if(err) {
              return callback(err);
            }

            if (result) {
              console.log(('Updated ' + park[config.hipcamp.su_idColumn]).green);
              callback(null);
            }
          });

        } else { //Insert

          return client.query({
            text   : 'INSERT INTO '+config.postgres.tables.activities+' VALUES ($1,$2)',
            values : [
              park[config.hipcamp.su_idColumn],
              JSON.stringify(park)
            ]
          }, function(err, result) {
            if(err) {
              return callback(err);
            }

            if (result) {
              console.log(('Inserted ' + park[config.hipcamp.su_idColumn]).green.bold);
              callback(null);
            }
          });

        }
      });
    } else {
      noId.push(park);
      callback(null);
    }

  }, function(err){

      if (err) {
        console.error(err);
        process.exit(1);
      }

      if (noId.length) {
        console.log((noId.length + ' items were not added because they did not have an id').yellow);
      }

      console.log('Done'.green);
      process.exit(0);
      done();
  });

});
