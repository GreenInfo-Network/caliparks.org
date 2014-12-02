'use strict';

var cpad               = require('../lib/cpad.js'),
    stories            = require('../lib/stories.js'),
    activityCategories = require('../config/activities.json');

module.exports = function(req, res, data, callback) {

  var story;

  function getActivityFilterState(withString) {

    var activities = {},
        urlStates;

    urlStates = withString ? withString.toLowerCase().split(',') : [];

    //
    // Make a new object with the same keys as the activityCategories object.
    // and the values will be the status of that filter from the `with` parameter
    // in the URL
    //

    activities = JSON.parse(JSON.stringify(activityCategories));
    Object.keys(activities).forEach(function(key) {
      if (key && activities[key]) {
        activities[key].filterState = (urlStates.indexOf(key.toLowerCase()) > -1); //Is it in the 'with' URL param
      }
    });

    return activities;
  }

  //
  // Is this a story context?
  //
  if (data.context === 'story') {
    story = stories.getBySlug(req.params.query);

    if (story.parks) {
      return cpad.getParksByIdList(story.parks, function(err, parks) {

        if (err) {
          return callback(err);
        }

        go(err, parks);
      });
    }
  }

  //
  // Add querystring but don't clobber anything called query from the caller
  //
  if (data.context === 'with') {
    data.query = {
      q    : req.query.q || '',
      near : req.params.near  || req.query.near || null,
      with : req.params.query || null
    };
  } else if (data.context === 'near') {

    //
    // In this case, return nothing to the template so it
    // can attempt to geolocate on the client
    //
    if (!req.params.query) {
      return callback(null,[]);
    }

    data.query = {
      q    : req.query.q || '',
      near : req.params.query,
      with : req.params.with  || req.query.with || null
    };
  } else if (data.context === 'story') {
    data.query = {
      q    : story.q    || '',
      near : story.near || null,
      with : story.with || null
    };
  } else if (req.params.query || req.query.q || req.query.near || req.query.with) {
    data.query = {
      q    : req.params.query || req.query.q || '',
      near : req.query.near || null,
      with : req.query.with || null
    };
  } else {
    data.query = {
      q    : req.params.query || req.query.q || '',
      near : null,
      with : null
    };
  }

  cpad.getParks(data, function(err, parks) {

    go(err, parks);

  });

  function go(err, parks) {
    if (err) {
      return callback(err);
    }

    data.options = {
      startat : (req.query.startat|0) || 0,
      perpage : (req.query.perpage|0) || 100,
      not     : req.query.not || null
    };

    return callback(null, {
      parks          : parks,
      total          : parks.length,
      startat        : data.options.startat,
      perpage        : data.options.perpage,
      query          : data.query,
      activities     : getActivityFilterState(data.query.with)
    });
  }

};
