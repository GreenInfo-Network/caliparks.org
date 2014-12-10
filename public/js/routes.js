define(["require","exports","module","stamen-super-classy"], function(
  require,
  exports,
  module,
  StamenSuperClassy
) {

  "use strict";

  module.exports = function Routes() {

    var that          = this,
        knownContexts = ["search","with","near"];

    StamenSuperClassy.apply(that, arguments);

    //
    // Search contexts are after /parks/ in the URL. for example /parks/with
    // is the activity filter context. Known contexts are:
    //
    // * Search - General search context
    // * near   - Searches the area around a specific location by lat long or
    //            geocoded query
    // * with   - Filters by a comma separated list of activity names
    //
    // All of these contexts accept query params "?" which might be over-ridden
    // by the purpose of the context
    //

    that.stringifyUrlSearchParams = function stringifyUrlSearchParams(paramsObject) {
      var stringOut = "?";

      for (var i in paramsObject) {
        if (paramsObject.hasOwnProperty(i)) {
          stringOut += (i + "=" + paramsObject[i] + "&");
        }
      }

      return stringOut.substring(0, stringOut.length-1);
    };

    that.getParamStateFromLocationObject = function getParamStateFromLocationObject() {

      var urlParts = location.pathname.split("/"),
          route    = urlParts[1],
          context  = urlParts[2],
          param    = urlParts[3],
          query    = location.search.length ? JSON.parse(location.search.substring(1)
            .replace(/^/,"{\"")
            .replace(/$/, "\"}")
            .replace(/&/g,"\",\"")
            .replace(/=/g,"\":\"")) : {};

      return that.getParamState({
        route   : route,
        context : context,
        param   : param,
        query   : query
      });
    };

    //
    // Returns an object of params from the URI. Favors context arguments over
    // search query parameters. For example /with/baseball will clobber ?with=baseball
    //
    that.getParamState = function getParamState(contextData) {

      contextData = contextData || {"route":"search"};

      if (contextData.route === "parks" && knownContexts.indexOf(contextData.context) > -1) { //If this is a known context, over-ride the appropriate parameter. Contexts win over search params
        contextData.query[(contextData.context === "search") ? "q" : contextData.context] = (contextData.context === "search" && !contextData.param) ? contextData.query.q : contextData.param;
      }

      if (contextData.query.with) {
        contextData.query.with = contextData.query.with.toLowerCase();
      }

      return contextData.query;
    };

    that.updateSearchUrl = function updateSearchUrl(searchParams) {

      //
      // if search is in the `with` context, it would make the most sense to
      // redirect them to the plain old search context
      //
      // Otherwise just change the with search param
      //
      if (!searchParams["with"] && location.href.split("/")[4] === "with") {
        location.href = "/parks/search" + (location.hash||"") + that.stringifyUrlSearchParams(searchParams);
      } else {
        if (!searchParams["with"]) {
          delete searchParams["with"];
        }

        if(searchParams["with"] && location.href.split("/")[4] === "with") {
          var w = searchParams["with"],
              locationArray = location.href.split("/");

          locationArray.length = 5;

          delete searchParams["with"];
          location.href = locationArray.join("/") + "/" + w + that.stringifyUrlSearchParams(searchParams).replace(/undefined/,"");
        } else {

          if (location.href.split("/")[4] === "near") {
            delete searchParams["near"];
          }

          location.search = that.stringifyUrlSearchParams(searchParams).replace(/undefined/,"");
        }
      }
    };

    that.getParamStateAsSearchString = function getParamStateAsSearchString() {
      var params = that.getParamStateFromLocationObject(),
          outString = params.q || "";

      if (params.with) {
        if (!params.q && params.near) {
          outString += params.with;
        } else {
          outString += " with " +  params.with;
        }

        params.with = params.with.toLowerCase();
      }

      if (params.near) {
        outString += " near " +  params.near;
      }

      return decodeURI(outString).replace(/undefined/,"");
    };

    return that;

  };

});
