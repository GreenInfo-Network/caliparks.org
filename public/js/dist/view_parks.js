define([ "require", "exports", "module", "jquery", "block-activity-filter", "block-search-box" ], function(require, exports, module, jquery, BlockActivityFilter, BlockSearchBox) {
    "use strict";
    new BlockSearchBox(".block-search-box", {}, function() {}), new BlockActivityFilter(".block-activity-filter", {}, function() {});
});