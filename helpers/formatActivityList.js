"use strict";

// TODO Use the one from config (requiring it doesn't work, as this is used
// in both server and client contexts
var activities = {
  "backpacking":{"category":"outdoors","label":"backpacking"},
  "ball fields":{"category":"sports","label":"ball fields"},
  "basketball":{"category":"sports","label":"basketball"},
  "biking":{"category":"outdoors","label":"biking"},
  "boardsports":{"category":"water","label":"board sports"},
  "boating":{"category":"water","label":"boating"},
  "camping":{"category":"outdoors","label":"camping"},
  "covered picnic tables":{"category":"outdoors","label":"covered picnic tables"},
  "dogs":{"category":"kids","label":"dogs"},
  "fishing":{"category":"water","label":"fishing"},
  "hiking":{"category":"outdoors","label":"hiking"},
  "horsebackriding":{"category":"outdoors","label":"horseback riding"},
  "kayakingcanoeing":{"category":"water","label":"kayaking & canoeing"},
  "historicalsite":{"category":"historic","label":"museums & historical sites"},
  "ohv":{"category":"outdoors","label":"OHV"},
  "playground":{"category":"kids","label":"playgrounds"},
  "rusticcabins":{"category":"outdoors","label":"rustic cabins"},
  "snowsports":{"category":"snow","label":"snow sports"},
  "swimming":{"category":"water","label":"swimming"},
  "tennis":{"category":"sports","label":"tennis"},
  "wildlifewatching":{"category":"outdoors","label":"wildlife watching"}
};

module.exports = function formatActivityList(options) {
  // i18n support
  options.__ = options.__ || function(x) {
    return x;
  };
  var list = options.fn(this).split(",");

  var activityNames = list
    .map(function(x) {
      return activities[x.toLowerCase()];
    })
    .filter(function(x) {
      return !!x;
    })
    .map(function(x) {
      return x.label;
    }),
    count;

  // no commas
  if (activityNames.length === 2) {
    return activityNames.join(" " + options.__("and") + " ");
  }

  // tack on "and" to the last item
  if (activityNames.length > 1) {
    activityNames[activityNames.length - 1] = options.__("and") + " " + activityNames[activityNames.length - 1];
  }

  // deal with a really long list
  count = activityNames.length;
  if (count > 3) {
    activityNames.length = 3;

    activityNames.push(options.__("and") + " " + ((count|0)-3) + " " + options.__("more")); 
  }

  // Oxford commas
  return activityNames.join(", ");
};
