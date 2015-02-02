define(["require","exports","module","jquery","block-photo-carousel","block-instagram-strip","block-static-park-map","facebook-fixer","fullscreen-overlay","block-search-box","block-stories-flexy"], function(
  require,
  exports,
  module,
  jquery,
  BlockPhotoCarousel,
  BlockInstagramStrip,
  BlockStaticParkMap,
  FacebookFixer,
  FullscreenOverlay,
  BlockSearchBox,
  BlockStoriesFlexy
) {

  "use strict";

  var blocks = {};

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
          ],
          polygon : {
            "type": "Feature",
            "geometry": viewData.geometry,
            "properties": {
              "name": viewData.unit_name
            }
          }
        }, function(err, slippyMap) {
          module.exports.slippyMap = slippyMap;
          module.exports.slippyMap.fire("map-initialized");

          module.exports.slippyMap.on("street-view-toggle", function(e) {

            var overlayNode = module.exports.slippyMap.utils.get("#content .map-overlay")[0];

            if (e.caller.visible) {
              overlayNode.classList.add("has-streetview");
            } else {
              overlayNode.classList.remove("has-streetview");
            }

          });
        });

        document.querySelector("#content .map-overlay .action.close").addEventListener("click",function(e) {
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

    document.querySelector("#content .action.fullscreen").addEventListener("click",function(e) {
      module.exports.mapOverlay.show();
    }, false);

    module.exports.headerPhotos = new BlockPhotoCarousel(".block-photo-carousel", viewData, function(err, blockPhotoCarousel) {});

    module.exports.instagramStrip = new BlockInstagramStrip(".block-instagram-strip", viewData, function(err, blockInstagramStrip) {});

  });

  (new BlockSearchBox(".block-search-box",{}, function(err, blockSearchBox) {}));
  (new BlockStoriesFlexy(".block-stories-flexy",{}, function(err, blockStoriesFlexy) {}));

});
