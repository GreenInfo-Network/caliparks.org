define([ "require", "exports", "module", "stamen-super-classy" ], function(require, exports, module, StamenSuperClassy) {
    "use strict";
    module.exports = function() {
        var that = this, knownContexts = [ "search", "with", "near" ];
        return StamenSuperClassy.apply(that, arguments), that.stringifyUrlSearchParams = function(paramsObject) {
            var stringOut = "?";
            for (var i in paramsObject) paramsObject.hasOwnProperty(i) && void 0 !== paramsObject[i] && (stringOut += i + "=" + paramsObject[i] + "&");
            return stringOut.substring(0, stringOut.length - 1);
        }, that.getParamStateFromLocationObject = function() {
            var urlParts = location.pathname.split("/"), route = urlParts[1], context = urlParts[2], param = urlParts[3], query = location.search.length ? JSON.parse(location.search.substring(1).replace(/^/, '{"').replace(/$/, '"}').replace(/&/g, '","').replace(/=/g, '":"')) : {};
            return that.getParamState({
                route: route,
                context: context,
                param: param,
                query: query
            });
        }, that.getParamState = function(contextData) {
            return contextData = contextData || {
                route: "search"
            }, "parks" === contextData.route && knownContexts.indexOf(contextData.context) > -1 && (contextData.query["search" === contextData.context ? "q" : contextData.context] = "search" !== contextData.context || contextData.param ? contextData.param : contextData.query.q), 
            contextData.query.with && (contextData.query.with = contextData.query.with.toLowerCase()), 
            contextData.query;
        }, that.updateSearchUrl = function(searchParams) {
            if (searchParams["with"] || "with" !== location.href.split("/")[4]) if (searchParams["with"] || delete searchParams["with"], 
            searchParams["with"] && "with" === location.href.split("/")[4]) {
                var w = searchParams["with"], locationArray = location.href.split("/");
                locationArray.length = 5, delete searchParams["with"], location.href = locationArray.join("/") + "/" + w + that.stringifyUrlSearchParams(searchParams).replace(/undefined/, "");
            } else "near" === location.href.split("/")[4] && delete searchParams.near, location.search = that.stringifyUrlSearchParams(searchParams).replace(/undefined/, ""); else location.href = "/parks/search" + (location.hash || "") + that.stringifyUrlSearchParams(searchParams);
        }, that.getParamStateAsSearchString = function() {
            var params = that.getParamStateFromLocationObject(), outString = params.q || "";
            return params.with && (outString += !params.q && params.near ? params.with : " with " + params.with, 
            params.with = params.with.toLowerCase()), params.near && (outString += " near " + params.near), 
            decodeURI(outString).replace(/undefined/, "");
        }, that;
    };
});