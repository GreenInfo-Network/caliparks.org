'use strict';

var i18n = require("i18n");

try {
  var stories = require('../config/stories.json');
} catch (err) {
  console.error(err);
}

module.exports = {
  get : function() {

    return stories.map(function(story) {

      //
      // Create a url from cofig items
      //
      if (story.parks) {
        story.url = '/parks/story/' + story.slug;
      } else {

        story.url = '/parks/search/';

        try {
          if (story.query) {
            story.url += story.query;
          }

          if (story.with || story.near) {
            story.url += '?';
          }

          if (story.with) {
            story.url += ('with=' + story.with.join('+'));
          }

          if (story.with && story.near) {
            story.url += '&';
          }

          if (story.near) {
            story.url += ('near=' + story.near);
          }
        } catch (err) {
          console.error(err);
        }

      }

      //
      // Internationalize
      //
      story.icopy = i18n.__(story.copy);

      return story;
    });
  },

  getBySlug : function(slug) {
    return module.exports.get().filter(function(story) {
      return story.slug === slug;
    })[0];
  }
}
