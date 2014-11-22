define(["require","exports","module","jquery","block-activity-filter","block-search-box","slippymap"], function(
  require,
  exports,
  module,
  jquery,
  BlockActivityFilter,
  BlockSearchBox,
  Slippymap
) {

  "use strict";

  function getGeoJSONFromParkList(parks) {
    return parks;
  }

  module.exports.blockSearchBox = new Slippymap(".slippymap", {
    'data' : getGeoJSONFromParkList(viewData.parks)
  }, function() {

  });

  module.exports.blockSearchBox        = new BlockSearchBox(".block-search-box",{}, function(err, blockSearchBox) {});
  module.exports.blockActivityFilter   = new BlockActivityFilter(".block-activity-filter",{}, function(err, blockActivityFilter) {});

});
