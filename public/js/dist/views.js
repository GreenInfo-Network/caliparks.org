define([ "require", "exports", "module", "handlebars", "stamen-super-classy", "../../js/helpers/__.js", "../../js/helpers/removeSpaces.js", "../../js/helpers/replace.js" ], function(require, exports, module, Handlebars, stamenSuperClassy) {
    "use strict";
    module.exports = function(options, callback) {
        function initPartials(callback) {
            that.utils.request("/js/partials.json", function(err, r) {
                err && callback(err);
                try {
                    Handlebars.partials = JSON.parse(r.responseText), that.utils.request("/js/locales/es.json", function(err, languageResponse) {
                        err && callback(err);
                        try {
                            STMN.localeEs = JSON.parse(languageResponse.responseText), callback(null);
                        } catch (err) {
                            callback(err);
                        }
                    });
                } catch (err) {
                    callback(err);
                }
            });
        }
        function init() {
            "object" != typeof STMN || STMN.localeEs || (STMN.viewInitCalled ? callback && callback(null, that) : (STMN.viewInitCalled = !0, 
            initPartials(function() {
                callback && callback(null, that);
            })), that.Handlebars = Handlebars);
        }
        var that = this;
        stamenSuperClassy.apply(that, arguments), init();
    };
});