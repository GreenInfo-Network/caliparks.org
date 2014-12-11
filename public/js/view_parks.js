define(["require","exports","module","jquery","block-activity-filter","block-search-box","slippymap", "stamen-super-classy", "routes", "content-fetcher"], function(
  require,
  exports,
  module,
  jquery,
  BlockActivityFilter,
  BlockSearchBox,
  Slippymap,
  StamenSuperClassy,
  Routes,
  ContentFetcher
) {

  "use strict";

  var routes      = new Routes(),
      searchState = routes.getParamStateFromLocationObject(),
      blocks      = {};

  function View(options) {

    var that = this,
        bodyNode, cleanBounds, mapTabNode, resultsNode, selectedPark, infowindow, infoWindowData;

    StamenSuperClassy.apply(that, arguments);

    bodyNode = that.utils.get("body")[0];

    function initMap() {

      mapTabNode = that.utils.get(".map-tab-pane")[0];

      that.slippyMap = new Slippymap(".slippymap", {
        "data" : options.parks,
        "contextBounds" : (options.bounds.length) ? options.bounds : viewData.parks.bbox
      }, function(err, slippyMap) {
        that.slippyMap = slippyMap;
        that.fire("map-initialized");
      });

      that.slippyMap.once("idle",function(e) {

        cleanBounds = that.slippyMap.map.getBounds(); //Saving the current bounds as clean to be used to check against other bounds for state changes
        mapTabNode.classList.remove("slippy-map-bounds-dirty");

      });

      that.slippyMap.on("bounds-changed",function(e) {

        if (cleanBounds && !cleanBounds.equals(that.slippyMap.map.getBounds())) {
          mapTabNode.classList.add("slippy-map-bounds-dirty");
        }

      });

      that.utils.get(".search-this-area-action",mapTabNode)[0].addEventListener("click", function() {
        var newSearchState = JSON.parse(JSON.stringify(searchState));
        if (newSearchState["near"]) {
          delete newSearchState["near"];
        }
        newSearchState["bbox"] = that.slippyMap.getBounds().join(",");
        location.href="/parks/search" + routes.stringifyUrlSearchParams(newSearchState);
      }, that);

      that.on("paginate", function(e) {
        that.slippyMap.pinLayer.updateData(e.caller.response);
      });
    }

    function targetIsSearchResult(eventResponse) {

      for (var i=0; eventResponse.path.length > i; i++) {
        if (eventResponse.path[i] && eventResponse.path[i].classList && eventResponse.path[i].classList.contains("search-result")) {
          return eventResponse.path[i];
        }
      }

      return false;
    }

    function getParkById(id) {

      for (var i=0; options.parks.features.length > i; i++) {
        if ((options.parks.features[i].properties.superunit_id|0) === (id|0)) {
          return options.parks.features[i];
        }
      }

      return false;
    }

    function selectPark(id, options) {

      if (!selectedPark || ((selectedPark.properties.superunit_id|0) !== (id|0))) {
        var park         = getParkById(id),
            listItemNode = that.utils.get(".search-results .result-"+id)[0],
            isInBounds   = that.slippyMap.map.getBounds().contains(new google.maps.LatLng(parseFloat(park.geometry.coordinates[1]), parseFloat(park.geometry.coordinates[0])));

        selectedPark = park;

        // Add selected class to list item dom element
        listItemNode.classList.add("selected");

        // Set pin on map as selected
        that.slippyMap.pinLayer.setMarkersAsSelected([id]);

        if (!isInBounds) {
          that.slippyMap.setCenter(park.geometry);
        }

        that.fire("park-selected", {
          newPark : park
        });
      }

    }

    function initInfoWindow() {
      infowindow = new google.maps.InfoWindow({
        "maxWidth" : 400,
        "minHeight": 400
      });

      infoWindowData = new ContentFetcher("#gmap-info-window","block-park-name",null, null, {
        dependantTemplates : ["block-activity-icons"]
      });
    }

    //
    // Anything having to do with interacting with a park
    //
    function initPark() {

      resultsNode = that.utils.get("#content .search-results")[0];

      that.slippyMap.on("marker-click", function(e) {
        that.slippyMap.pinLayer.clearMarkerSelections();
        selectPark(e.caller.marker.feature.properties.superunit_id, {
          "center" : false
        });
      });

      that.slippyMap.on("select-markers", function(e) {

        infowindow.open(that.slippyMap.map,e.caller.selectedMarkers[0].pin);
        infowindow.setContent(
          infoWindowData.compileTemplate(e.caller.selectedMarkers[0].feature.properties)
        );
      });

      resultsNode.addEventListener("mouseover", that.utils.debounce(function(e) {
        var resultNode = targetIsSearchResult(e);
        if (resultNode) {
          that.slippyMap.pinLayer.clearMarkerSelections();
          selectPark(resultNode.getAttribute("data-id"));
        }
      }, 200), true);

    }

    //
    // Anything having to do with interacting with a group of parks
    //
    function initParks() {
      var direction, perpage, startat, href, parksData;

      resultsNode.addEventListener("click", function(e) {
        if (e.target && e.target.getAttribute("data-pagination")) {
          e.preventDefault();

          direction = e.target.getAttribute("data-pagination");
          href      = e.target.getAttribute("href");
          perpage   = (href.match(/perpage=(\d+[0-10000])/)||[])[1]|0;
          startat   = (href.match(/startat=(\d+[0-10000])/)||[])[1]|0;

          loadParks({
            "perpage" : perpage,
            "startat" : startat
          });

        }
      }, false);

      parksData = new ContentFetcher("#content .search-results","parks-results",null, null, {
        dependantTemplates : ["block-park-name","block-activity-icons"]
      });

      that.on("paginate", function(e) {
        resultsNode.innerHTML = parksData.compileTemplate({
          "parks":e.caller.response.features.map(function(feature) {
            return feature.properties;
          })
        });
      });
    }

    function loadParks(stateChanges) {

      var urlState = routes.getParamStateFromLocationObject(),
          keys     = Object.keys(stateChanges);

      for(var i=0; keys.length > i; i++) {
        urlState[keys[i]] = stateChanges[keys[i]];
      }

      that.utils.request("/parks/search.geojson" + routes.stringifyUrlSearchParams(urlState), function(err, r) {
        var responseObject;

        if (err) {
          return that.fire("error",err);
        }

        try {
          responseObject = JSON.parse(r.responseText);
        } catch (err) {
          return that.fire("error",err);
        }

        if (responseObject.status === "ok") {
          return that.fire("paginate", responseObject);
        } else {
          return that.fire("error",{"message":"Response body not okay", "response" : responseObject});
        }
      });

    }

    function initTabControl() {
      var rootNode = that.utils.get(".tab-actions")[0];

      if (location.hash === "#tab-map") {
        bodyNode.classList.toggle("tab-map");
      }

      rootNode.addEventListener("click", function() {
        bodyNode.classList.toggle("tab-map");

        if (bodyNode.classList.contains("tab-map")) {
          that.slippyMap.resize();
          location.hash = "#tab-map";
        } else {
          if (location.hash === "#tab-map") {
            location.hash = "";
          }
        }
      }, false);
    }

    function init() {

      initMap();
      initTabControl();
      initPark();
      initParks();
      initInfoWindow();

      that.on("error", function(e) {
        console.log('error',e);
      });

    }

    init();
  }

  blocks.blockSearchBox      = new BlockSearchBox(".block-search-box",{}, function(err, blockSearchBox) {});
  blocks.blockActivityFilter = new BlockActivityFilter(".block-activity-filter",{}, function(err, blockActivityFilter) {});

  module.exports = new View({
    "geojsonURI" : "/parks/search.geojson"+routes.stringifyUrlSearchParams(searchState),
    "bounds"     : viewData.bounds,
    "parks"      : viewData.parks
  });

});
