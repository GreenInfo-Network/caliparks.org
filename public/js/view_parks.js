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

    var that   = this;

    StamenSuperClassy.apply(that, arguments);

    function initMap() {

      that.slippyMap = new Slippymap(".slippymap", {
        "data" : viewData.parks,
        "contextBounds" : (options.bounds.length) ? options.bounds : viewData.parks.bbox
      }, function() {
        that.fire("map-initialized");
      });
    }

    function initTabControl() {
      var rootNode = that.utils.get(".tab-actions")[0],
          bodyNode = that.utils.get("body")[0];

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
