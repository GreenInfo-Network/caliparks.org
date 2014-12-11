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
                return err ? callback(err) : (Handlebars.templates[key] = r.responseText, Handlebars.registerPartial(key, Handlebars.templates[key]), 
                templateQueue[key] && delete templateQueue[key], void callback(null, r.responseText));
            });
        }
        function constructPaginationArgs(pageData) {
            var paramsObject = {};
            for (var i in pageData) pageData.hasOwnProperty(i) && pageData[i] && pageData[i].toString().length && [ "startat", "perpage", "not" ].indexOf(i) > -1 && (paramsObject[i] = pageData[i]);
            for (var i in pageData.query) pageData.query.hasOwnProperty(i) && [ "q", "near", "with", "bbox" ].indexOf(i) > -1 && pageData.query[i] && pageData.query[i].toString().length && (paramsObject[i] = pageData.query[i]);
            return pageData.context && paramsObject[pageData.context] && delete paramsObject[pageData.context], 
            paramsObject;
        }
        function stringifyPaginationArgs(paramsObject) {
            return Object.keys(paramsObject).map(function(key) {
                return key + "=" + encodeURI(paramsObject[key]);
            }).join("&");
        }
        function init(callback) {
            function doneFetchingTemplate() {
                Object.keys(templateQueue).length && callback(null);
            }
            var queueKeys;
            Handlebars.registerHelper("removeSpaces", function(options) {
                return options.fn(this).replace(/ /g, "_").toLowerCase();
            }), Handlebars.registerHelper("paginationNext", function(options) {
                var paginationArgs;
                return (0 | options.data.root.total) === (0 | options.data.root.perpage) ? (paginationArgs = constructPaginationArgs(options.data.root), 
                paginationArgs.startat = parseInt(paginationArgs.startat || 0, 10) + parseInt(paginationArgs.perpage || 0, 10), 
                options.fn(this).replace(/href="#"/, 'href="?' + stringifyPaginationArgs(paginationArgs) + '"')) : void 0;
            }), Handlebars.registerHelper("paginationLast", function(options) {
                var paginationArgs;
                return (0 | options.data.root.startat) >= (0 | options.data.root.perpage) ? (paginationArgs = constructPaginationArgs(options.data.root), 
                paginationArgs.startat = parseInt(paginationArgs.startat || 0, 10) - parseInt(paginationArgs.perpage || 0, 10), 
                options.fn(this).replace(/href="#"/, 'href="?' + stringifyPaginationArgs(paginationArgs) + '"')) : void 0;
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