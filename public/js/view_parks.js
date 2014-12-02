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
      searchState = routes.getParamStateFromLocationObject();

  function View(options) {

    var that   = this;

    StamenSuperClassy.apply(that, arguments);

    function initMap() {

      that.map = new Slippymap(".slippymap", {
        "data" : {}
      }, function() {
        that.fire("map-initialized");
      });

      $.getJSON(options.geojsonURI, function(r) {

        that.map.updateData(r.response);

      });
    }

    function init() {

      initMap();

      that.blockSearchBox      = new BlockSearchBox(".block-search-box",{}, function(err, blockSearchBox) {});
      that.blockActivityFilter = new BlockActivityFilter(".block-activity-filter",{}, function(err, blockActivityFilter) {});
    }

    init();
  }

  module.exports = new View({
    "geojsonURI" : "/parks/search.geojson"+routes.stringifyUrlSearchParams(searchState)
  });

});
