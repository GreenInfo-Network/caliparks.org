define([ "require", "exports", "module", "jquery", "block-photo-carousel", "block-instagram-strip", "block-static-park-map", "facebook-fixer" ], function(require, exports, module, jquery, BlockPhotoCarousel, BlockInstagramStrip, BlockStaticParkMap, FacebookFixer) {
    "use strict";
    new BlockStaticParkMap(".block-static-park-map", viewData, function() {}), new BlockPhotoCarousel(".block-photo-carousel", viewData, function() {}), 
    new BlockInstagramStrip(".block-instagram-strip", viewData, function() {});
    var facebookFixer = new FacebookFixer();
    facebookFixer.on("facebook-frame-change", function(e) {
        "open" === e.caller.state ? $("body").removeClass("facebook-thing-closed") : $("body").addClass("facebook-thing-closed");
    });
});