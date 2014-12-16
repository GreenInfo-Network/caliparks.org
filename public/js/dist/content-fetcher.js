define([ "require", "exports", "module", "views", "stamen-super-classy" ], function(require, exports, module, Views, StamenSuperClassy) {
    "use strict";
    module.exports = function(rootSelector, template, src, responsePath, options) {
        function getDataByStringPath(data, path) {
            for (var pathArray = path.split("."), dataLevel = data, i = 0; pathArray.length > i; i++) dataLevel = dataLevel[pathArray[i]];
            return dataLevel;
        }
        function _fetch(data) {
            var fetchedData = responsePath && responsePath.length ? getDataByStringPath(data, responsePath) : data;
            data.status && "ok" === data.status || "object" == typeof fetchedData ? (options && options.incrementArg && (options.srcArguments[options.incrementArg] += fetchedData.length), 
            fetchedData.length >= 0 ? fetchedData.forEach(function(item) {
                that.utils.append(that.utils.get(rootSelector)[0], that.compileTemplate(item));
            }) : that.utils.get(rootSelector)[0].innerHTML = that.compileTemplate(fetchedData)) : stopFetching = !0, 
            that.fire("finish-fetch"), activeFetchRequest = !1;
        }
        function init(callback) {
            views = new Views({}, function(err, views) {
                Handlebars = views.Handlebars, callback();
            });
        }
        var Handlebars, views, that = this, stopFetching = !1, activeFetchRequest = !1, args = "";
        return StamenSuperClassy.apply(this, arguments), that.compileTemplate = function(data) {
            return "function" == typeof views.Handlebars.partials[template] ? views.Handlebars.partials[template](data) : views.Handlebars.compile(views.Handlebars.partials[template])(data);
        }, that.fetch = function(data) {
            that.fire("begin-fetch"), data && "object" == typeof data ? _fetch(data) : activeFetchRequest || stopFetching || (activeFetchRequest = !0, 
            options.srcArguments && (args = "?" + JSON.stringify(options.srcArguments).replace(/,/g, "&").replace(/[{|}]/g, "").replace(/[:]/g, "=").replace(/\"/g, "")), 
            that.utils.request(src + args, function(err, r) {
                if (err) return !1;
                try {
                    data = JSON.parse(r.responseText);
                } catch (err) {
                    return !1;
                }
                _fetch(data);
            }));
        }, init(function() {
            that.fire("ready"), options && options.callback && options.callback(null, that);
        }), that;
    };
});