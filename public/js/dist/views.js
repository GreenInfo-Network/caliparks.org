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

          //
          // At this time we only need to support Spanish
          //
          that.utils.request("/js/locales/es.json", function(err, languageResponse) {
            if (err) {
              callback(err);
            }

            try {
              STMN.localeEs = JSON.parse(languageResponse.responseText);
              callback(null);
            } catch (err) {
              callback(err);
            }
          });

        } catch (err) {
          callback(err);
        }
      });
    }

    function init () {

      if (typeof STMN === "object" && !STMN.localeEs) {

        if (!STMN.viewInitCalled) {
          STMN.viewInitCalled = true;

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
    }

    init();

  };

});
