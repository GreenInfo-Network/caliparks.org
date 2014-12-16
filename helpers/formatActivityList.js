module.exports = function formatActivityList(options) {
  var list = options.fn(this).split(",");

  function findActivityKey(activity) {
    var keys = Object.keys(activities);

    return keys[keys.map(function(key) {return key.toLowerCase();}).indexOf(activity.toLowerCase())];
  }

  if (!list.length || list.length < 2) {
    return options.fn(this);
  } else {
    return list.map(function(activity, i, a) {
      var activityObject = activities[findActivityKey(activity)];
      return (i===a.length-1 ? i18n.__("and") + " " : " ") + (activityObject ? activityObject.label : i18n.__("Unofficial activity"));
    }).join(list.length > 2 ? ", " : " ");
  }

};
