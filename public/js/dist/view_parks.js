define([ "require", "exports", "module", "jquery", "block-activity-filter", "block-search-box", "slippymap", "stamen-super-classy", "routes" ], function(require, exports, module, jquery, BlockActivityFilter, BlockSearchBox, Slippymap, StamenSuperClassy, Routes) {
    "use strict";
    function View(options) {
        function initMap() {
            that.slippyMap = new Slippymap(".slippymap", {
                data: {}
            }, function() {
                that.fire("map-initialized");
            }), $.getJSON(options.geojsonURI, function(r) {
                that.slippyMap.updateData(r.response), that.slippyMap.resize();
            });
        }
        function initTabControl() {
            var rootNode = that.utils.get(".tab-actions")[0], bodyNode = that.utils.get("body")[0];
            bodyNode.classList.add("tab-list"), rootNode.addEventListener("click", function() {
                bodyNode.classList.toggle("tab-list"), that.slippyMap.resize();
            }, !1);
        }
        function init() {
            initMap(), initTabControl();
        }
        var that = this;
        StamenSuperClassy.apply(that, arguments), init();
    }
    var routes = new Routes(), searchState = routes.getParamStateFromLocationObject(), blocks = {};
    blocks.blockSearchBox = new BlockSearchBox(".block-search-box", {}, function() {}), 
    blocks.blockActivityFilter = new BlockActivityFilter(".block-activity-filter", {}, function() {}), 
    module.exports = new View({
        geojsonURI: "/parks/search.geojson" + routes.stringifyUrlSearchParams(searchState)
    });
});