define(["require","exports","module","jquery","stamen-super-classy","routes"], function(
  require,
  exports,
  module,
  jquery,
  StamenSuperClassy,
  Routes
) {

  "use strict";

  var state             = {},
      data              = {},
      rootNode, locateMeNode, that, old, formNode, searchFieldNode;

  module.exports=function(rootSelector, config, callback) {

    that = this;

    StamenSuperClassy.apply(this, arguments);

    var routes = new Routes();

    rootNode            = $(rootSelector);
    locateMeNode        = rootNode.find(".locate-me");
    formNode            = rootNode.find("form");
    searchFieldNode     = rootNode.find("input[type=search]");


    //
    // Load data for autocomplete and search type detection
    //
    function updateData(key, path, callback) {
      old = data[key];
      $.getJSON(path, function(json) {
        data[key] = json;

        that.fire("dataUpdated", {
          old : old,
          new : data[key]
        });

        if (callback) {
          callback(null, json);
        }
      });
    }

    //
    // Methods for the locate me button. This will use the browsers
    // location API to get the users lat/long when pressed
    //

    function setLocateMeLoadingState(show) {
      if (show) {
        locateMeNode.addClass("pulse");
        locateMeNode.find("path").css({"fill":"blue"});
      } else {
        locateMeNode.removeClass("pulse");
        locateMeNode.find("path").css({"fill":"inherit"});
      }
      that.fire("loading", {show:show});
    }

    function initLocateMe() {

      locateMeNode.get()[0].addEventListener("click", function() {
        if (navigator.geolocation) {
          setLocateMeLoadingState(true);
          navigator.geolocation.getCurrentPosition(function(r) {
            if (r.coords) {
              setLocateMeLoadingState(false);
              if (searchFieldNode.val().length) {
                location.href = "/parks/search/?q" + searchFieldNode.val() + "&near=" + parseFloat(r.coords.latitude).toFixed(4) + "," + parseFloat(r.coords.longitude).toFixed(4);
              } else {
                location.href = "/parks/near/" + parseFloat(r.coords.latitude).toFixed(4) + "," + parseFloat(r.coords.longitude).toFixed(4);
              }
            }
          }, function() {setLocateMeLoadingState(false);});
        } else {
          location.href = "/parks/near";
        }
      });
    }

    //
    // Methods for managing the form element
    //

    function paramaterizeObject(obj) {
      return JSON.stringify(obj).split("{").join("").split("}").join("").split(":").join("=").split(",").join("&").split("\"").join("").split(" ").join("+");
    }

    function initForm() {
      formNode.bind("submit", function(e) {
        e.preventDefault();

        if (state.searchType.q || state.searchType.near || state.searchType.with) {
          location.href="/parks/search?" + paramaterizeObject(state.searchType);
        } else {
          if (!searchFieldNode.val().length) { //Nothing was typed in?
            searchFieldNode.val("San Francisco");
          }

          location.href="/parks/near/" + searchFieldNode.val().replace(/\s/g,"+");

        }

      });

    }

    //
    // Init function
    //
    function initialize() {
      that.on("ready", function() {
        callback(null, that);
      });

      //
      // Initialize thie whole thing
      //
      searchFieldNode.attr("value",decodeURI(routes.getParamStateFromLocationObject().near||"").replace(/\+/g," "));
      state.searchType = {};
      initLocateMe();
      initForm();
      updateData("activities", "/data/uniqueActivities.json", function(r) {
        updateData("places", "/data/californiaCities.json", function(r) {
          that.fire("ready");
        });
      });
    }

    //
    // GO GO GO!
    //
    initialize();

    return that;

  };

});
