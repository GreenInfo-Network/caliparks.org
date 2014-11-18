"use strict";

var env                = require("require-env"),
    pg                 = require("pg"),
    activityCategories = require('../config/activities.json');

var DATABASE_URL = env.require("DATABASE_URL");

var getActivitiesForPark = function getActivitiesForPark(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  activities",
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

var filterActivityData = function filterActivityData(activities) {

  return activities.map(function(x) {

    if (x && activityCategories[x]) {
      return {
        id       : x,
        name     : activityCategories[x].label,
        category : activityCategories[x].category
      };
    } else {
      console.log(x);
    }

  });
};

module.exports = {
  getActivitiesForPark : getActivitiesForPark,
  filterActivityData   : filterActivityData
};
