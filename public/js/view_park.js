define(["require","exports","module","jquery","block-photo-carousel","block-instagram-strip","block-static-park-map","facebook-fixer","fullscreen-overlay"], function(
  require,
  exports,
  module,
  jquery,
  BlockPhotoCarousel,
  BlockInstagramStrip,
  BlockStaticParkMap,
  FacebookFixer,
  FullscreenOverlay
) {

  "use strict";

  module.exports = {};

  module.exports.map = new BlockStaticParkMap(".block-static-park-map",
    viewData,
  function(err, blockStaticParkMap) {
    module.exports.mapOverlay = new FullscreenOverlay("#content", "/js/partials/fullscreen-map.handlebars", {
      "className" : "map-overlay"
    });

    module.exports.mapOverlay.once("show", function() {
      require(["slippymap"], function(Slippymap) {
        module.exports.slippyMap = new Slippymap("#content .map-overlay .slippy-map", {
          contextBounds : [
            viewData.bbox.coordinates[0][0][0],
            viewData.bbox.coordinates[0][0][1],
            viewData.bbox.coordinates[0][2][0],
            viewData.bbox.coordinates[0][2][1]
          ]
        }, function(err, slippyMap) {
          module.exports.slippyMap = slippyMap;
          module.exports.slippyMap.fire("map-initialized");
        });

        document.querySelector("#content .map-overlay .close-button").addEventListener("click",function(e) {
          module.exports.mapOverlay.hide();
        }, false);

      });
    });

    /*
    module.exports.mapOverlay.on("show", function() {
      google.maps.event.trigger(module.exports.slippyMap.map.getCenter(), "resize");
      //module.exports.slippyMap.map.setCenter(module.exports.slippyMap.map.getCenter());
    });
    */

    document.querySelector("#content .fullscreen-action").addEventListener("click",function(e) {
      module.exports.mapOverlay.show();
    }, false);
  });

  module.exports.headerPhotos = new BlockPhotoCarousel(".block-photo-carousel", viewData, function(err, blockPhotoCarousel) {});

  module.exports.instagramStrip = new BlockInstagramStrip(".block-instagram-strip", viewData, function(err, blockInstagramStrip) {});

  var facebookFixer = new FacebookFixer();

  //
  // Add a class to the body when the facebook panel is open
  //
  facebookFixer.on("facebook-frame-change", function(e) {
    if (e.caller.state === "open") {
      $("body").removeClass("facebook-thing-closed");
    } else {
      $("body").addClass("facebook-thing-closed");
    }
  });

});
