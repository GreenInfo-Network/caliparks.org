"use strict";

// TODO Use the one from config (requiring it doesn't work, as this is used
// in both server and client contexts
var activities = {
  "backpacking":{"category":"outdoors","label":"backpacking"},
  "ball fields":{"category":"sports","label":"ball fields"},
  "basketball":{"category":"sports","label":"basketball"},
  "biking":{"category":"outdoors","label":"biking"},
  "boating":{"category":"water","label":"boating"},
  "camping":{"category":"outdoors","label":"camping"},
  "caving":{"category":"outdoors","label":"caving"},
  "climbing":{"category":"outdoors","label":"rock climbing"},
  "covered picnic tables":{"category":"outdoors","label":"covered picnic tables"},
  "fishing":{"category":"water","label":"fishing"},
  "hiking":{"category":"outdoors","label":"hiking"},
  "horsebackRiding":{"category":"outdoors","label":"horseback riding"},
  "kayakingCanoeing":{"category":"water","label":"kayaking & canoeing"},
  "kiteboardingWindsurfing":{"category":"water","label":"kiteboarding & windsurfing"},
  "historicalSite":{"category":"historic","label":"museums"},
  "ohv":{"category":"outdoors","label":"OHV"},
  "Playground":{"category":"kids","label":"playgrounds"},
  "rusticCabins":{"category":"outdoors","label":"rustic cabins"},
  "snowSports":{"category":"snow","label":"snow sports"},
  "surfing":{"category":"water","label":"surfing"},
  "swimming":{"category":"water","label":"swimming"},
  "Tennis":{"category":"sports","label":"tennis"},
  "whitewaterRaftingKayaking":{"category":"water","label":"whitewater rafting & kayaking"},
  "wildlifeWatching":{"category":"outdoors","label":"wildlife watching"}
};

// to handle mixed casing
Object.keys(activities).forEach(function(x) {
  activities[x.toLowerCase()] = activities[x];
});

module.exports = function formatActivityList(options) {
  // i18n support
  options.__ = options.__ || function(x) {
    return x;
  };
  var list = options.fn(this).split(",");

  var activityNames = list
    .map(function(x) {
      return activities[x];
    })
    .filter(function(x) {
      return !!x;
    })
    .map(function(x) {
      return x.label;
    });

  // no commas
  if (activityNames.length === 2) {
    return activityNames.join(" " + options.__("and") + " ");
  }

  // tack on "and" to the last item
  if (activityNames.length > 1) {
    activityNames[activityNames.length - 1] = options.__("and") + " " + activityNames[activityNames.length - 1];
  }

  // Oxford commas
  return activityNames.join(", ");
};
