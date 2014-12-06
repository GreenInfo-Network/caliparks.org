define(["require","exports","module","jquery","block-activity-filter","block-search-box","slippymap", "stamen-super-classy", "routes"], function(
  require,
  exports,
  module,
  jquery,
  BlockActivityFilter,
  BlockSearchBox,
  Slippymap,
  StamenSuperClassy,
  Routes
) {

  "use strict";

  var routes      = new Routes(),
      searchState = routes.getParamStateFromLocationObject(),
      blocks      = {};

  function View(options) {

    var that = this,
        bodyNode, cleanBounds, mapTabNode;

    StamenSuperClassy.apply(that, arguments);

    bodyNode = that.utils.get("body")[0];

    function initMap() {

      mapTabNode = that.utils.get(".map-tab-pane")[0];

      that.slippyMap = new Slippymap(".slippymap", {
        "data" : viewData.parks,
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

      that.utils.get('.search-this-area-action',mapTabNode)[0].addEventListener('click', function() {
        location.href='/parks/search?bbox=' + that.slippyMap.getBounds().join(',');
      }, that);
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
    }

    init();
  }

  blocks.blockSearchBox      = new BlockSearchBox(".block-search-box",{}, function(err, blockSearchBox) {});
  blocks.blockActivityFilter = new BlockActivityFilter(".block-activity-filter",{}, function(err, blockActivityFilter) {});

  module.exports = new View({
    "geojsonURI" : "/parks/search.geojson"+routes.stringifyUrlSearchParams(searchState),
    "bounds"     : viewData.bounds
  });

});
