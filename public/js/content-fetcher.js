define(["require","exports","module","handlebars","jquery","stamen-super-classy"], function(require, exports, module, Handlebars) {

 var StamenSuperClassy = require("stamen-super-classy");

 module.exports = function ContentFetcher(rootSelector, templatePath, src, responsePath, options) {

    var that               = this,
        stopFetching       = false,
        activeFetchRequest = false,
        fetchStartat       = options.startat || 0,
        args               = '',
        templateCache;

    StamenSuperClassy.apply(this, arguments);

    function getDataByStringPath(data, path) {
      var pathArray = path.split('.'),
          dataLevel = data;

      for (var i=0; pathArray.length > i; i++) {
        dataLevel = dataLevel[pathArray[i]];
      }

      return dataLevel;
    }

    that.fetch = function fetch() {
      that.fire('begin-fetch');

      if (!activeFetchRequest && !stopFetching) {
        activeFetchRequest = true;

        if (options.srcArguments) {
          args = '?'+JSON.stringify(options.srcArguments).replace(/,/g, '&').replace(/[{|}]/g, '').replace(/[:]/g, '=').replace(/\"/g, '');
        }

        $.getJSON(src+args, function(data) {
          var array = (responsePath.length) ? getDataByStringPath(data, responsePath) : data;

          if (data.status === 'ok' && array.length) {

            if (options.incrementArg) {
              options.srcArguments[options.incrementArg] += array.length;
            }

            array.forEach(function(item) {
              $(rootSelector).append(Handlebars.compile(templateCache)(item));
            });

          } else {
            stopFetching = true;
          }

          that.fire('finish-fetch');

          activeFetchRequest = false;
        });
      }

    };

    function init(callback) {
      //
      // Fetch a handlebars template for Flickr photos
      //
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
      that.fire('ready');

      if (options.callback) {
        options.callback(null, that);
      }
    });

    return that;

 };

});
