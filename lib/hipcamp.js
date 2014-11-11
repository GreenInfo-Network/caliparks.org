"use strict";

var env                = require("require-env"),
    pg                 = require("pg"),
    activityCategories = require('../config/activityCategories');

var DATABASE_URL = env.require("DATABASE_URL");

var getActivitiesForPark = function getActivitiesForPark(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  *",
      "FROM site_hipcamp_activities",
      "WHERE su_id=$1",
      "OFFSET $2",
      "LIMIT $3"
    ].join("\n");

    return client.query(query, [parkId, options.startat || '0', options.limit || '9000'], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      //
      // Format and filter the output of the activity data
      //
      if (result.rows[0] && result.rows[0].activities) {
        result.rows[0].activities = filterActivityData(result.rows[0].activities);
      }

      return callback(null, result.rows[0]);
    });
  });
};

//
// TODO: This function will nolonger be needed when the activity
//       column becomes an array
//
var filterActivityData = function filterActivityData(activityData) {

  var out = [];

  //
  // Filter out non activities
  //
  delete activityData['cpadparkname'];
  delete activityData['hipcampparkname'];
  delete activityData['cpadSunma'];
  delete activityData['activityCount'];
  delete activityData['other'];

  for(var i in activityData) {
    if (activityData.hasOwnProperty(i) && activityData[i]) {
      out.push({
        'name'     : i,
        'category' : activityCategories[i]
      });
    }
  }

  return out;
};

module.exports = {
  getActivitiesForPark : getActivitiesForPark,
  filterActivityData   : filterActivityData
};
