define(["require","exports","module","handlebars","stamen-super-classy"], function(
  require,
  exports,
  module,
  Handlebars,
  StamenSuperClassy
) {

  "use strict";

/**
* ContentFetcher module
* Fetches content from a json endpoint, grabs a handlebars template, and appends it to a div
* @constructor
* @param {string} rootSelector - The CSS selector leading to the outermost container
* @param {string} templates    - The name of a template without the .handlebars or an array of the same
* @param {string} src          - A URI pointing to a JSON endpoint
* @param {string} responsePath - A dot separated path in the data response to an array which the module can use
* @param {object} options      - Optional parameters (srcArguments (things appended to the src request), incrementArg (the src parameter to increment after every request))
*/
 module.exports = function ContentFetcher(rootSelector, template, src, responsePath, options) {

    var that               = this,
        stopFetching       = false,
        activeFetchRequest = false,
        args               = "",
        templateRoot       = "/js/partials/",
        templateExtension  = ".handlebars",
        templateQueue;

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

      return Handlebars.compile(Handlebars.templates[template])(data);
    };

    function _fetch(data) {
      var fetchedData = (responsePath && responsePath.length) ? getDataByStringPath(data, responsePath) : data;

      if ((data.status && data.status === "ok") || typeof fetchedData === "object") {

        if (options && options.incrementArg) {
          options.srcArguments[options.incrementArg] += fetchedData.length;
        }

        if (fetchedData.length >= 0) {
          fetchedData.forEach(function(item) {
            that.utils.append(that.utils.get(rootSelector)[0], that.compileTemplate(item));
          });
        } else {
          that.utils.get(rootSelector)[0].innerHTML = that.compileTemplate(fetchedData);
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

          that.utils.request(src+args, function(err, r) {

            if (err) {
              return false;
            }

            try {
              data = JSON.parse(r.responseText);
            } catch (err) {
              return false;
            }

            _fetch(data);
          });
        }
      }

    };

    function fetchTemplate(key, path, callback) {

      if (!Handlebars.templates) {
        Handlebars.templates = {};
      }

      if (!Handlebars.templates[key]) {
        return that.utils.request(path, function(err, r) {
          if (err) {
            return callback(err);
          }

          Handlebars.templates[key] = r.responseText;

          if (templateQueue[key]) {
            delete templateQueue[key];
          }

          callback(null, r.responseText);
        });
      } else {
        if (templateQueue[key]) {
          delete templateQueue[key];
        }

        callback(null, Handlebars.templates[key]);
      }

    }

    function init(callback) {

      var queueKeys;

      //
      // Fetch a handlebars template for Flickr photos
      //
      Handlebars.registerHelper("removeSpaces", function(options) {
        return options.fn(this).replace(/ /g, "_").toLowerCase();
      });

      templateQueue = {};

      if (!options || !options.dependantTemplates) {
        templateQueue[template] = templateRoot + template + templateExtension;
      } else {
        options.dependantTemplates.push(template);
        options.dependantTemplates.forEach(function(t) {
          templateQueue[t] = templateRoot + t + templateExtension;
        });
      }

      queueKeys = Object.keys(templateQueue);

      function doneFetchingTemplate(err, template) {
        if (Object.keys(templateQueue).length) {
          callback(null);
        }
      }

      for (var i=0; queueKeys.length > i; i++) {
        fetchTemplate(queueKeys[i], templateQueue[queueKeys[i]], doneFetchingTemplate);
      }
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
