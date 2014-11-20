define(["require","exports","module","jquery","block-activity-filter","block-search-box"], function(
  require,
  exports,
  module,
  jquery,
  BlockActivityFilter,
  BlockSearchBox
) {

  "use strict";

  var blockSearchBox = new BlockSearchBox(".block-search-box",{}, function(err, blockSearchBox) {});
  var blockActivityFilter = new BlockActivityFilter(".block-activity-filter",{}, function(err, blockActivityFilter) {});

});
