define(["require","exports","jquery","block-photo-carousel","block-instagram-strip","block-static-park-map"], function(require,exports, module) {

  var BlockStaticParkMap = require("block-static-park-map"),
      BlockPhotoCarousel = require("block-photo-carousel"),
      BlockInstagramStrip = require("block-instagram-strip");

  var blockStaticParkMap = new BlockStaticParkMap('.block-static-park-map', viewData, function(err, blockStaticParkMap) {


  });

  var blockPhotoCarousel = new BlockPhotoCarousel('.block-photo-carousel', viewData, function(err, blockPhotoCarousel) {


  });

  var blockInstagramStrip = new BlockInstagramStrip('.block-instagram-strip', viewData, function(err, blockInstagramStrip) {


  });

});
