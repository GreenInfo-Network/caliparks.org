module.exports = function formatActivityList(options) {
  var list = options.fn(this).split(",");

  //TODO: Use the one from config
  var activities = {
    "backpacking":{"category":"outdoors","label":"Backpacking"},
    "ball fields":{"category":"sports","label":"Ball fields"},
    "basketball":{"category":"sports","label":"Basketball"},
    "biking":{"category":"outdoors","label":"Biking"},
    "boating":{"category":"water","label":"Boating"},
    "camping":{"category":"outdoors","label":"Camping"},
    "caving":{"category":"outdoors","label":"Caving"},
    "climbing":{"category":"outdoors","label":"Rock climbing"},
    "covered picnic tables":{"category":"outdoors","label":"Covered picnic tables"},
    "fishing":{"category":"water","label":"Fishing"},
    "hiking":{"category":"outdoors","label":"Hiking"},
    "horsebackRiding":{"category":"outdoors","label":"Horseback Riding"},
    "kayakingCanoeing":{"category":"water","label":"Kayaking & canoeing"},
    "kiteboardingWindsurfing":{"category":"water","label":"Kiteboarding & windsurfing"},
    "ohv":{"category":"outdoors","label":"OHV"},
    "playground":{"category":"kids","label":"Playground"},
    "snowSports":{"category":"snow","label":"Snow sports"},
    "surfing":{"category":"water","label":"Surfing"},
    "swimming":{"category":"water","label":"Swimming"},
    "tennis":{"category":"sports","label":"Tennis"},
    "whitewaterRaftingKayaking":{"category":"water","label":"Whitewater rafting & kayaking"},
    "wildlifeWatching":{"category":"outdoors","label":"Wildlife watching"},
    "rusticCabins":{"category":"outdoors","label":"Rustic cabins"},
    "historicalSite":{"category":"historic","label":"Museums"}
  };

  function findActivityKey(activity) {
    var keys = Object.keys(activities);

    return keys[keys.map(function(key) {return key.toLowerCase();}).indexOf(activity.toLowerCase())];
  }

  if (!list.length || list.length < 2) {
    return options.fn(this);
  } else {
    return list.map(function(activity, i, a) {
      var activityObject = activities[findActivityKey(activity)];
      return (i===a.length-1 ? (options.__||function(s){return s;})("and") + " " : " ") + (activityObject ? activityObject.label : (options.__||function(s){return s;})("Unofficial activity"));
    }).join(list.length > 2 ? ", " : " ");
  }

};
