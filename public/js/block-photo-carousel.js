define(["require","exports","module","jquery","content-carousel","stamen-super-classy"], function(require, exports, module) {

 var StamenSuperClassy = require("stamen-super-classy"),
     ContentCarousel   = require('content-carousel');

 /**
 * UI Block for displaying a photo Carousel
 * @constructor
 * @param {string} rootSelector - The CSS selector leading to the outermost container
 * @param {object} viewData - Data passed to the template
 */
 module.exports = function BlockPhotoCarousel(rootSelector, viewData) {

    var that = this,
        backButtonSelector    = '.carousel-back-button',
        forwardButtonSelector = '.carousel-forward-button';

    StamenSuperClassy.apply(this, arguments);

    var rootNode = that.get(rootSelector)[0],
        backButtonNode    = that.get(backButtonSelector, rootNode)[0],
        forwardButtonNode = that.get(forwardButtonSelector, rootNode)[0];

    that.carouselInstance = new ContentCarousel(rootSelector + ' .slide-container', {
      slideClass : 'coverphoto',
      snapToSlide : true,
      showLoader: true
    });

    backButtonNode.addEventListener('click', function() {
      that.carouselInstance.goBackward();
    }, false);

    forwardButtonNode.addEventListener('click', function() {
      that.carouselInstance.goForward();
    }, false);

    return that;

 };

});
