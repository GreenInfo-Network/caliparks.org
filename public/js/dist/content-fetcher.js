define([ "require", "exports", "module", "handlebars", "jquery", "stamen-super-classy" ], function(require, exports, module, Handlebars) {
    var StamenSuperClassy = require("stamen-super-classy");
    module.exports = function(rootSelector, templatePath, src, responsePath, options) {
        function getDataByStringPath(data, path) {
            for (var pathArray = path.split("."), dataLevel = data, i = 0; pathArray.length > i; i++) dataLevel = dataLevel[pathArray[i]];
            return dataLevel;
        }
        function init(callback) {
            return $.ajax(templatePath, {
                success: function(template) {
                    templateCache = template, callback(null, {
                        template: templateCache
                    });
                }
            });
        }
        var templateCache, that = this, stopFetching = !1, activeFetchRequest = !1, fetchStartat = options.startat || 0, args = "";
        return StamenSuperClassy.apply(this, arguments), that.fetch = function() {
            that.fire("begin-fetch"), activeFetchRequest || stopFetching || (activeFetchRequest = !0, 
            options.srcArguments && (args = "?" + JSON.stringify(options.srcArguments).replace(/,/g, "&").replace(/[{|}]/g, "").replace(/[:]/g, "=")), 
            $.getJSON(src + args, function(data) {
                var array = responsePath.length ? getDataByStringPath(data, responsePath) : data;
                "ok" === data.status && array.length ? (fetchStartat += array.length, array.forEach(function(item) {
                    $(rootSelector).append(Handlebars.compile(templateCache)(item));
                })) : stopFetching = !0, that.fire("finish-fetch"), activeFetchRequest = !1;
            }));
        }, init(function() {
            that.fire("ready"), options.callback && options.callback(null, that);
        }), that;
    };
});