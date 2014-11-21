define([ "require", "exports", "module", "jquery", "block-activity-filter", "block-search-box", "stamen-super-classy" ], function(require, exports, module, jquery, BlockActivityFilter, BlockSearchBox) {
    "use strict";
    module.exports.blockSearchBox = new BlockSearchBox(".block-search-box", {}, function() {}), 
    module.exports.blockActivityFilter = new BlockActivityFilter(".block-activity-filter", {}, function() {});
});