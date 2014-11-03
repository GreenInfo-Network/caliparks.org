define([ "require", "exports", "jquery", "block-photo-carousel", "block-static-park-map" ], function(require) {
    {
        var BlockStaticParkMap = require("block-static-park-map");
        new BlockStaticParkMap(".block-static-park-map", {
            centroid: viewData.centroid,
            bbox: viewData.bbox,
            name: viewData.name
        }, function() {});
    }
});