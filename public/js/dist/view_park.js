define([ "require", "exports", "module", "jquery", "block-photo-carousel", "block-instagram-strip", "block-static-park-map", "facebook-fixer", "fullscreen-overlay", "block-search-box" ], function(require, exports, module, jquery, BlockPhotoCarousel, BlockInstagramStrip, BlockStaticParkMap, FacebookFixer, FullscreenOverlay, BlockSearchBox) {
    "use strict";
    var blocks = {};
    module.exports = {}, module.exports.map = new BlockStaticParkMap(".block-static-park-map", viewData, function() {
        module.exports.mapOverlay = new FullscreenOverlay("#content", "/js/partials/fullscreen-map.handlebars", {
            className: "map-overlay"
        }), module.exports.mapOverlay.once("show", function() {
            require([ "slippymap" ], function(Slippymap) {
                module.exports.slippyMap = new Slippymap("#content .map-overlay .slippy-map", {
                    contextBounds: [ viewData.bbox.coordinates[0][0][0], viewData.bbox.coordinates[0][0][1], viewData.bbox.coordinates[0][2][0], viewData.bbox.coordinates[0][2][1] ]
                }, function(err, slippyMap) {
                    module.exports.slippyMap = slippyMap, module.exports.slippyMap.fire("map-initialized");
                }), document.querySelector("#content .map-overlay .close-button").addEventListener("click", function() {
                    module.exports.mapOverlay.hide();
                }, !1);
            });
        }), document.querySelector("#content .fullscreen-action").addEventListener("click", function() {
            module.exports.mapOverlay.show();
        }, !1);
    }), module.exports.headerPhotos = new BlockPhotoCarousel(".block-photo-carousel", viewData, function() {}), 
    module.exports.instagramStrip = new BlockInstagramStrip(".block-instagram-strip", viewData, function() {});
    var facebookFixer = new FacebookFixer();
    facebookFixer.on("facebook-frame-change", function(e) {
        "open" === e.caller.state ? $("body").removeClass("facebook-thing-closed") : $("body").addClass("facebook-thing-closed");
    }), blocks.blockSearchBox = new BlockSearchBox(".block-search-box", {}, function() {});
});