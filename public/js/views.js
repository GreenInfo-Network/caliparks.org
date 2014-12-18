define(["require","exports","module","handlebars","stamen-super-classy","../../js/helpers/__.js","../../js/helpers/removeSpaces.js","../../js/helpers/replace.js"], function(
  require,
  exports,
  module,
  Handlebars,
  stamenSuperClassy
) {

  "use strict";

  module.exports = function Views(options, callback) {

    var that = this;

    stamenSuperClassy.apply(that, arguments);

    function initPartials(callback) {

      that.utils.request("/js/partials.json", function(err, r) {
        if (err) {
          callback(err);
        }

        try {
          Handlebars.partials = JSON.parse(r.responseText);
          callback(null);
        } catch (err) {
          callback(err);
        }
      });
    }

    function init () {

      if (!Object.keys(Handlebars.partials||{}).length) {
        initPartials(function() {

          if (callback) {
            callback(null, that);
          }
        });
      } else {
        if (callback) {
          callback(null, that);
        }
      }

      that.Handlebars = Handlebars;
    }

    init();

  };

});
