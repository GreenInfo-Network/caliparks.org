define(["require","exports","module","vendor/typeahead","vendor/bloodhound","jquery","stamen-super-classy","routes"], function(
  require,
  exports,
  module,
  typeahead,
  bloodhound,
  jquery,
  StamenSuperClassy,
  Routes
) {

  "use strict";

  var state             = {},
      data              = {},
      bloodHoundSources = {},
      rootNode, locateMeNode, that, old, formNode, searchFieldNode, searchParts, defaultSearchString;

  module.exports=function(rootSelector, config, callback) {

    that = this;

    StamenSuperClassy.apply(this, arguments);

    var routes = new Routes();

    rootNode            = $(rootSelector);
    locateMeNode        = rootNode.find(".locate-me");
    formNode            = rootNode.find("form");
    searchFieldNode     = rootNode.find("input[type=search]"),
    defaultSearchString = (routes.getParamStateAsSearchString() || "");


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
    // Methods for working with the Typeahead module
    //
    function initTypeahead() {

      //
      // Construct Bloodhound instances for data types
      //
      // Blood hound searches an array of data for the search string
      //
      bloodHoundSources.activities = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: $.map(data.activities, function(activity) { return { value: activity }; })
      });

      bloodHoundSources.places = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: $.map(data.places, function(city) { return { value: city }; })
      });

      //
      // Initialize Bloodhound instances
      //
      bloodHoundSources.activities.initialize();
      bloodHoundSources.places.initialize();

      //
      // Construct typeahead on the search field
      //
      return searchFieldNode.typeahead({
        hint: false,
        highlight: true,
        minLength: 1
      },
      {
        name: "places",
        displayKey: "value",
        source: bloodHoundSources.places.ttAdapter(),
        templates: {
          header : "<h3>Places</h3>"
        }
      },
      {
        name: "activities",
        displayKey: "value",
        source: bloodHoundSources.activities.ttAdapter(),
        templates: {
          header : "<h3>Activities</h3>"
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
          if (searchFieldNode.val().indexOf(" near ") > -1) {
            searchParts = searchFieldNode.val().split(" near ");
            location.href="/parks/search?with=" + searchParts[0] + "&near=" + searchParts[1];
          } else if (searchFieldNode.val().indexOf(" with ") > -1) {
            searchParts = searchFieldNode.val().split(" with ");
            location.href="/parks/search?q=" + searchParts[0] + "&with=" + searchParts[1];
          } else {
            location.href="/parks/search?q=" + searchFieldNode.val();
          }
        }

      });

      searchFieldNode.bind("keyup", function(e) {
        if (e.keyCode !== 13 && e.which !== 13 && e.keyCode !== 39 && e.which !== 39) { //Enter, Return, and Right arrow
          e.preventDefault();
        } else {
          if (e.keyCode === 13 || e.which === 13) {
            e.preventDefault();
          }
        }
      });

      searchFieldNode.bind("typeahead:selected", function(e,choice,category) {
        if (category === "places") {
          state.searchType = {
            near:choice.value
          };
        } else if (category === "activities") {
          state.searchType = {
            with:choice.value
          };
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
      if (defaultSearchString) {
        searchFieldNode.attr("value",defaultSearchString);
      }
      state.searchType = {};
      initLocateMe();
      initForm();
      updateData("activities", "/data/uniqueActivities.json", function(r) {
        updateData("places", "/data/californiaCities.json", function(r) {
          initTypeahead();
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
