define([ "require", "exports", "module", "block-static-park-map" ], function(require, exports, module, BlockStaticParkMap) {
    "use strict";
    new BlockStaticParkMap(".block-static-park-map", viewData, function(err, blockStaticParkMap) {
        blockStaticParkMap.utils.get(".block-static-park-map .big-park-map")[0].style.height = "100%", 
        setTimeout(function() {
            google.maps.event.trigger(blockStaticParkMap.bigMap.getCenter(), "resize"), blockStaticParkMap.bigMap.setCenter(blockStaticParkMap.bigMap.getCenter());
        }, 1e3);
    });
});