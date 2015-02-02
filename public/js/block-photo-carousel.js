define(["require","exports","module","content-carousel","stamen-super-classy","content-fetcher"], function(
  require,
  exports,
  module,
  ContentCarousel,
  StamenSuperClassy,
  ContentFetcher
) {

  "use strict";

 /**
 * UI Block for displaying a photo Carousel
 * @constructor
 * @param {string} rootSelector - The CSS selector leading to the outermost container
 * @param {object} viewData - Data passed to the template
 */
 module.exports = function BlockPhotoCarousel(rootSelector, viewData) {

    var that = this,
        backButtonSelector    = ".carousel-back-button",
        forwardButtonSelector = ".carousel-forward-button",
        contentFetcher;

    StamenSuperClassy.apply(this, arguments);

    var rootNode = that.utils.get(rootSelector)[0],
        backButtonNode     = that.utils.get(backButtonSelector, rootNode)[0],
        forwardButtonNode  = that.utils.get(forwardButtonSelector, rootNode)[0],
        slideContainerNode = that.utils.get(".slide-container",rootNode)[0];

    function fetchPhotos() {
      contentFetcher.fetch();
    }

    function init() {

      var carouselSliderSelector = rootSelector + " .slide-container";

      that.carouselInstance = new ContentCarousel(rootSelector + " .slide-container", {
        slideClass : "coverphoto",
        snapToSlide : true,
        showLoader: true
      });

      backButtonNode.addEventListener("click", function() {
        that.carouselInstance.goBackward();
      }, false);

      forwardButtonNode.addEventListener("click", function() {
        that.carouselInstance.goForward();
      }, false);

      that.utils.get(carouselSliderSelector)[0].addEventListener("scroll",function(e) {
        if ((e.target.scrollWidth-e.target.scrollLeft) < e.target.offsetWidth*4) {
          fetchPhotos();
        }
      }, false);

      that.carouselInstance.on("forward", function(e) {

        if (e.caller.target.scrollLeft > (e.caller.target.scrollWidth-(e.caller.target.offsetWidth+e.caller.target.offsetWidth/2))) {
          rootNode.parentNode.parentNode.classList.add("scrolled-furthest");
        } else {
          rootNode.parentNode.parentNode.classList.remove("scrolled-furthest");
        }

        if (e.caller.target.scrollLeft < (e.caller.target.offsetWidth/2)) {
          rootNode.parentNode.parentNode.classList.add("not-scrolled");
        } else {
          rootNode.parentNode.parentNode.classList.remove("not-scrolled");
        }
      });

      that.carouselInstance.on("backward", function(e) {

        if (e.caller.target.scrollLeft > (e.caller.target.scrollWidth-(e.caller.target.offsetWidth+e.caller.target.offsetWidth/2))) {
          rootNode.parentNode.parentNode.classList.add("scrolled-furthest");
        } else {
          rootNode.parentNode.parentNode.classList.remove("scrolled-furthest");
        }

        if (e.caller.target.scrollLeft < (e.caller.target.offsetWidth/2)) {
          rootNode.parentNode.parentNode.classList.add("not-scrolled");
        } else {
          rootNode.parentNode.parentNode.classList.remove("not-scrolled");
        }
      });

      //
      // Set up a fetcher which binds templates, content, and
      // this page together... awww
      //
      contentFetcher = new ContentFetcher(
        slideContainerNode,
        "flickr_coverphoto",
        location.href+"/flickr.json",
        "response.flickr.items",
        {
          startat : 5,
          incrementArg : "startat",
          srcArguments : {
            startat : 20,
            limit   : 20
          }
        }
      );

    }

    //
    // Go Go Go
    //
    if (rootNode) {

      init();

      return that;
    } else {
      return null;
    }

 };

});
