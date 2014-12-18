define([ "require", "exports", "module", "handlebars", "stamen-super-classy", "../../js/helpers/__.js", "../../js/helpers/removeSpaces.js", "../../js/helpers/replace.js" ], function(require, exports, module, Handlebars, stamenSuperClassy) {
    "use strict";
    module.exports = function(options, callback) {
        function initPartials(callback) {
            that.utils.request("/js/partials.json", function(err, r) {
                err && callback(err);
                try {
                    Handlebars.partials = JSON.parse(r.responseText), callback(null);
                } catch (err) {
                    callback(err);
                }
            });
        }
        function init() {
            Object.keys(Handlebars.partials || {}).length ? callback && callback(null, that) : initPartials(function() {
                callback && callback(null, that);
            }), that.Handlebars = Handlebars;
        }
        var that = this;
        stamenSuperClassy.apply(that, arguments), init();
    };
});