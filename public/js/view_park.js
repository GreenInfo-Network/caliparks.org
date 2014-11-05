define(["require","exports","jquery","block-photo-carousel","block-static-park-map"], function(require,exports, module) {

  var BlockStaticParkMap = require("block-static-park-map"),
      BlockPhotoCarousel = require("block-photo-carousel");

  var blockStaticParkMap = new BlockStaticParkMap('.block-static-park-map', viewData, function(err, blockStaticParkMap) {


  });

  var blockPhotoCarousel = new BlockPhotoCarousel('.block-photo-carousel', viewData, function(err, blockStaticParkMap) {


  });

});
