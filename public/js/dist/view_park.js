define([ "require", "exports", "jquery", "block-photo-carousel", "block-instagram-strip", "block-static-park-map" ], function(require) {
    {
        var BlockStaticParkMap = require("block-static-park-map"), BlockPhotoCarousel = require("block-photo-carousel"), BlockInstagramStrip = require("block-instagram-strip");
        new BlockStaticParkMap(".block-static-park-map", viewData, function() {}), new BlockPhotoCarousel(".block-photo-carousel", viewData, function() {}), 
        new BlockInstagramStrip(".block-instagram-strip", viewData, function() {});
    }
});