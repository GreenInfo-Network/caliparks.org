define([ "require", "exports", "module", "jquery", "block-activity-filter", "block-search-box", "slippymap", "stamen-super-classy", "routes" ], function(require, exports, module, jquery, BlockActivityFilter, BlockSearchBox, Slippymap, StamenSuperClassy, Routes) {
    "use strict";
    function View(options) {
        function initMap() {
            mapTabNode = that.utils.get(".map-tab-pane")[0], that.slippyMap = new Slippymap(".slippymap", {
                data: viewData.parks,
                contextBounds: options.bounds.length ? options.bounds : viewData.parks.bbox
            }, function(err, slippyMap) {
                that.slippyMap = slippyMap, that.fire("map-initialized");
            }), that.slippyMap.once("idle", function() {
                cleanBounds = that.slippyMap.map.getBounds(), mapTabNode.classList.remove("slippy-map-bounds-dirty");
            }), that.slippyMap.on("bounds-changed", function() {
                cleanBounds && !cleanBounds.equals(that.slippyMap.map.getBounds()) && mapTabNode.classList.add("slippy-map-bounds-dirty");
            }), that.utils.get(".search-this-area-action", mapTabNode)[0].addEventListener("click", function() {
                var newSearchState = JSON.parse(JSON.stringify(searchState));
                newSearchState.near && delete newSearchState.near, newSearchState.bbox = that.slippyMap.getBounds().join(","), 
                location.href = "/parks/search" + routes.stringifyUrlSearchParams(newSearchState);
            }, that);
        }
        function initTabControl() {
            var rootNode = that.utils.get(".tab-actions")[0];
            "#tab-map" === location.hash && bodyNode.classList.toggle("tab-map"), rootNode.addEventListener("click", function() {
                bodyNode.classList.toggle("tab-map"), bodyNode.classList.contains("tab-map") ? (that.slippyMap.resize(), 
                location.hash = "#tab-map") : "#tab-map" === location.hash && (location.hash = "");
            }, !1);
        }
        function init() {
            initMap(), initTabControl();
        }
        var bodyNode, cleanBounds, mapTabNode, that = this;
        StamenSuperClassy.apply(that, arguments), bodyNode = that.utils.get("body")[0], 
        init();
    }
    var routes = new Routes(), searchState = routes.getParamStateFromLocationObject(), blocks = {};
    blocks.blockSearchBox = new BlockSearchBox(".block-search-box", {}, function() {}), 
    blocks.blockActivityFilter = new BlockActivityFilter(".block-activity-filter", {}, function() {}), 
    module.exports = new View({
        geojsonURI: "/parks/search.geojson" + routes.stringifyUrlSearchParams(searchState),
        bounds: viewData.bounds
    });
});