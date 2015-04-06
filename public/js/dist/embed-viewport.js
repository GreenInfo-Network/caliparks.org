define([ "require", "exports", "module", "block-static-park-map", "block-instagram-strip" ], function(require, exports, module, BlockStaticParkMap, BlockInstagramStrip) {
    "use strict";
    setTimeout(function() {
        new BlockStaticParkMap(".block-static-park-map", viewData, function(err, blockStaticParkMap) {
            blockStaticParkMap.utils.get(".block-static-park-map .big-park-map")[0].style.height = "100%", 
            google.maps.event.trigger(blockStaticParkMap.bigMap.getCenter(), "resize"), blockStaticParkMap.bigMap.setCenter(blockStaticParkMap.bigMap.getCenter());
        }), new BlockInstagramStrip(".block-instagram-strip", viewData, function() {});
    }, 100);
});