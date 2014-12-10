define([ "require", "exports", "module", "handlebars", "jquery", "stamen-super-classy" ], function(require, exports, module, Handlebars, jquery, StamenSuperClassy) {
    "use strict";
    module.exports = function(rootSelector, templatePath, src, responsePath, options) {
        function getDataByStringPath(data, path) {
            for (var pathArray = path.split("."), dataLevel = data, i = 0; pathArray.length > i; i++) dataLevel = dataLevel[pathArray[i]];
            return dataLevel;
        }
        function _fetch(data) {
            var fetchedData = responsePath && responsePath.length ? getDataByStringPath(data, responsePath) : data;
            data.status && "ok" === data.status || "object" == typeof fetchedData ? (options && options.incrementArg && (options.srcArguments[options.incrementArg] += fetchedData.length), 
            fetchedData.length >= 0 ? fetchedData.forEach(function(item) {
                $(rootSelector).append(that.compileTemplate(item));
            }) : $(rootSelector).html(that.compileTemplate(fetchedData))) : stopFetching = !0, 
            that.fire("finish-fetch"), activeFetchRequest = !1;
        }
        function init(callback) {
            return Handlebars.registerHelper("removeSpaces", function(options) {
                return options.fn(this).replace(/ /g, "_").toLowerCase();
            }), $.ajax(templatePath, {
                success: function(template) {
                    templateCache = template, callback(null, {
                        template: templateCache
                    });
                }
            });
        }
        var templateCache, that = this, stopFetching = !1, activeFetchRequest = !1, args = "";
        return StamenSuperClassy.apply(this, arguments), that.compileTemplate = function(data) {
            return Handlebars.compile(templateCache)(data);
        }, that.fetch = function(data) {
            that.fire("begin-fetch"), data && "object" == typeof data ? _fetch(data) : activeFetchRequest || stopFetching || (activeFetchRequest = !0, 
            options.srcArguments && (args = "?" + JSON.stringify(options.srcArguments).replace(/,/g, "&").replace(/[{|}]/g, "").replace(/[:]/g, "=").replace(/\"/g, "")), 
            $.getJSON(src + args, _fetch));
        }, init(function() {
            that.fire("ready"), options && options.callback && options.callback(null, that);
        }), that;
    };
});