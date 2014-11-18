define(["require","exports","module","jquery","block-photo-carousel","block-instagram-strip","block-static-park-map","facebook-fixer"], function(
  require,
  exports,
  module,
  jquery,
  BlockPhotoCarousel,
  BlockInstagramStrip,
  BlockStaticParkMap,
  FacebookFixer
) {

  var blockStaticParkMap  = new BlockStaticParkMap('.block-static-park-map', viewData, function(err, blockStaticParkMap) {});
  var blockPhotoCarousel  = new BlockPhotoCarousel('.block-photo-carousel', viewData, function(err, blockPhotoCarousel) {});
  var blockInstagramStrip = new BlockInstagramStrip('.block-instagram-strip', viewData, function(err, blockInstagramStrip) {});
  var facebookFixer       = new FacebookFixer();

  //
  // Add a class to the body when the facebook panel is open
  //
  facebookFixer.on('facebook-frame-change', function(e) {
    if (e.caller.state === 'open') {
      $('body').removeClass('facebook-thing-closed');
    } else {
      $('body').addClass('facebook-thing-closed');
    }
  });

});
