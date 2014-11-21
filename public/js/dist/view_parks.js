define([ "require", "exports", "module", "jquery", "block-activity-filter", "block-search-box", "stamen-super-classy" ], function(require, exports, module, jquery, BlockActivityFilter, BlockSearchBox, StamenSuperClassy) {
    "use strict";
    function TabletViewportManager() {
        function resize() {
            contentNode.style.height = window.innerHeight - heightOffset + "px", tabNode.style.height = window.innerHeight - heightOffset + "px";
        }
        var that = this;
        StamenSuperClassy.apply(that, arguments);
        var bodyNode = that.utils.get("body")[0], headerNode = that.utils.get("header", bodyNode)[0], footerNode = that.utils.get("footer", bodyNode)[0], contentNode = that.utils.get(".content", bodyNode)[0], tabNode = that.utils.get(".search-results", bodyNode)[0], heightOffset = (headerNode ? headerNode.offsetHeight : 0) + (footerNode ? footerNode.offsetHeight : 0);
        return $(window).on("resize orientationChanged", function() {
            resize();
        }), resize(), that;
    }
    new BlockSearchBox(".block-search-box", {}, function() {}), new BlockActivityFilter(".block-activity-filter", {}, function() {}), 
    new TabletViewportManager();
});