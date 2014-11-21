define([ "require", "exports", "module", "jquery", "block-activity-filter", "block-search-box", "stamen-super-classy" ], function(require, exports, module, jquery, BlockActivityFilter, BlockSearchBox) {
    new BlockSearchBox(".block-search-box", {}, function() {}), new BlockActivityFilter(".block-activity-filter", {}, function() {});
});