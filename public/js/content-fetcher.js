define(["require","exports","module","handlebars","jquery","stamen-super-classy"], function(
  require,
  exports,
  module,
  Handlebars,
  jquery,
  StamenSuperClassy
) {

  "use strict";

/**
* ContentFetcher module
* Fetches content from a json endpoint, grabs a handlebars template, and appends it to a div
* @constructor
* @param {string} rootSelector - The CSS selector leading to the outermost container
* @param {string} templatePath - A URI pointing to a handlebars template
* @param {string} src          - A URI pointing to a JSON endpoint
* @param {string} responsePath - A dot separated path in the data response to an array which the module can use
* @param {object} options      - Optional parameters (srcArguments (things appended to the src request), incrementArg (the src parameter to increment after every request))
*/
 module.exports = function ContentFetcher(rootSelector, templatePath, src, responsePath, options) {

    var that               = this,
        stopFetching       = false,
        activeFetchRequest = false,
        args               = "",
        templateCache;

    StamenSuperClassy.apply(this, arguments);

    function getDataByStringPath(data, path) {
      var pathArray = path.split("."),
          dataLevel = data;

      for (var i=0; pathArray.length > i; i++) {
        dataLevel = dataLevel[pathArray[i]];
      }

      return dataLevel;
    }

    that.compileTemplate = function compileTemplate(data) {
      return Handlebars.compile(templateCache)(data);
    };

    function _fetch(data) {
      var fetchedData = (responsePath && responsePath.length) ? getDataByStringPath(data, responsePath) : data;

      if ((data.status && data.status === "ok") || typeof fetchedData === "object") {

        if (options && options.incrementArg) {
          options.srcArguments[options.incrementArg] += fetchedData.length;
        }

        if (fetchedData.length) {
          fetchedData.forEach(function(item) {
            $(rootSelector).append(that.compileTemplate(item));
          });
        } else {
          $(rootSelector).html(that.compileTemplate(fetchedData));
        }

      } else {
        stopFetching = true;
      }

      that.fire("finish-fetch");

      activeFetchRequest = false;
    }

    that.fetch = function fetch(data) {
      that.fire("begin-fetch");

      if (data && typeof data === "object") {
        _fetch(data);
      } else {
        if (!activeFetchRequest && !stopFetching) {
          activeFetchRequest = true;

          if (options.srcArguments) {
            args = "?"+JSON.stringify(options.srcArguments).replace(/,/g, "&").replace(/[{|}]/g, "").replace(/[:]/g, "=").replace(/\"/g, "");
          }

          $.getJSON(src+args, _fetch);
        }
      }

    };

    function init(callback) {
      //
      // Fetch a handlebars template for Flickr photos
      //
      Handlebars.registerHelper("removeSpaces", function(options) {
        return options.fn(this).replace(/ /g, "_").toLowerCase();
      });
      return $.ajax(templatePath, {
        success : function(template) {
          templateCache = template;

          callback(null, {
            template : templateCache
          });
        }
      });
    }

    //
    // Go Go Go!
    //
    init(function(err, data) {
      that.fire("ready");

      if (options && options.callback) {
        options.callback(null, that);
      }
    });

    return that;

 };

});
