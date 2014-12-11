define([ "require", "exports", "module", "handlebars", "jquery", "stamen-super-classy" ], function(require, exports, module, Handlebars, jquery, StamenSuperClassy) {
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
                $(rootSelector).append(that.compileTemplate(item));
            }) : $(rootSelector).html(that.compileTemplate(fetchedData))) : stopFetching = !0, 
            that.fire("finish-fetch"), activeFetchRequest = !1;
        }
        function fetchTemplate(key, path, callback) {
            return Handlebars.templates || (Handlebars.templates = {}), Handlebars.templates[key] ? (templateQueue[key] && delete templateQueue[key], 
            void callback(null, Handlebars.templates[key])) : that.utils.request(path, function(err, r) {
                return err ? callback(err) : (Handlebars.templates[key] = r.responseText, templateQueue[key] && delete templateQueue[key], 
                void callback(null, r.responseText));
            });
        }
        function init(callback) {
            function doneFetchingTemplate() {
                Object.keys(templateQueue).length && callback(null);
            }
            var queueKeys;
            Handlebars.registerHelper("removeSpaces", function(options) {
                return options.fn(this).replace(/ /g, "_").toLowerCase();
            }), templateQueue = {}, options && options.dependantTemplates ? (options.dependantTemplates.push(template), 
            options.dependantTemplates.forEach(function(t) {
                templateQueue[t] = templateRoot + t + templateExtension;
            })) : templateQueue[template] = templateRoot + template + templateExtension, queueKeys = Object.keys(templateQueue);
            for (var i = 0; queueKeys.length > i; i++) fetchTemplate(queueKeys[i], templateQueue[queueKeys[i]], doneFetchingTemplate);
        }
        var templateQueue, that = this, stopFetching = !1, activeFetchRequest = !1, args = "", templateRoot = "/js/partials/", templateExtension = ".handlebars";
        return StamenSuperClassy.apply(this, arguments), that.compileTemplate = function(data) {
            return Handlebars.compile(Handlebars.templates[template])(data);
        }, that.fetch = function(data) {
            that.fire("begin-fetch"), data && "object" == typeof data ? _fetch(data) : activeFetchRequest || stopFetching || (activeFetchRequest = !0, 
            options.srcArguments && (args = "?" + JSON.stringify(options.srcArguments).replace(/,/g, "&").replace(/[{|}]/g, "").replace(/[:]/g, "=").replace(/\"/g, "")), 
            $.getJSON(src + args, _fetch));
        }, init(function() {
            that.fire("ready"), options && options.callback && options.callback(null, that);
        }), that;
    };
});