define([ "require", "exports", "module", "jquery", "block-activity-filter", "block-search-box", "slippymap", "stamen-super-classy", "routes" ], function(require, exports, module, jquery, BlockActivityFilter, BlockSearchBox, Slippymap, StamenSuperClassy, Routes) {
    "use strict";
    function View(options) {
        function initMap() {
            that.map = new Slippymap(".slippymap", {
                data: {}
            }, function() {
                that.fire("map-initialized");
            }), $.getJSON(options.geojsonURI, function(r) {
                console.log(r.response), that.map.updateData(r.response);
            });
        }
        function init() {
            initMap(), that.blockSearchBox = new BlockSearchBox(".block-search-box", {}, function() {}), 
            that.blockActivityFilter = new BlockActivityFilter(".block-activity-filter", {}, function() {});
        }
        var that = this;
        StamenSuperClassy.apply(that, arguments), init();
    }
    var routes = new Routes(), searchState = routes.getParamStateFromLocationObject();
    module.exports = new View({
        geojsonURI: "/parks/search.geojson" + routes.stringifyUrlSearchParams(searchState)
    });
});