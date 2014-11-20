define([ "require", "exports", "module", "stamen-super-classy" ], function(require, exports, module, StamenSuperClassy) {
    module.exports = function() {
        function stringifyUrlSearchParams(paramsObject) {
            var stringOut = "?";
            for (var i in paramsObject) paramsObject.hasOwnProperty(i) && (stringOut += i + "=" + paramsObject[i] + "&");
            return stringOut.substring(0, stringOut.length - 1);
        }
        var that = this, knownContexts = [ "search", "with", "near" ];
        return StamenSuperClassy.apply(that, arguments), that.getParamStateFromLocationObject = function() {
            var urlParts = location.pathname.split("/"), route = urlParts[1], context = urlParts[2], param = urlParts[3], query = location.search.length ? JSON.parse(location.search.substring(1).replace(/^/, '{"').replace(/$/, '"}').replace(/&/g, '","').replace(/=/g, '":"')) : {};
            return that.getParamState({
                route: route,
                context: context,
                param: param,
                query: query
            });
        }, that.getParamState = function(contextData) {
            return "parks" === contextData.route & knownContexts.indexOf(contextData.context) > -1 && (contextData.query["search" === contextData.context ? "q" : contextData.context] = "search" !== contextData.context || contextData.param ? contextData.param : contextData.query.q), 
            contextData.query;
        }, that.updateSearchUrl = function(searchParams) {
            if (searchParams["with"] || "with" !== location.href.split("/")[4]) if (searchParams["with"] || delete searchParams["with"], 
            searchParams["with"] && "with" === location.href.split("/")[4]) {
                var w = searchParams["with"], locationArray = location.href.split("/");
                locationArray.length = 5, delete searchParams["with"], location.href = locationArray.join("/") + "/" + w + stringifyUrlSearchParams(searchParams);
            } else location.search = stringifyUrlSearchParams(searchParams); else location.href = "/parks/search" + (location.hash || "") + stringifyUrlSearchParams(searchParams);
        }, that.getParamStateAsSearchString = function() {
            var params = that.getParamStateFromLocationObject(), outString = params.q || "";
            return params.with && (outString += params.q ? " with " + params.with : params.with), 
            params.near && (outString += " near " + params.near), outString;
        }, that;
    };
});