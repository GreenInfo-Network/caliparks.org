//
// Tools for detecting the client OS
//
define(["require","exports","module","jquery","stamen-super-classy"], function(
  require,
  exports,
  module,
  jquery,
  StamenSuperClassy
) {

  "use strict";

  /**
  * Ads carousel behavior to scrolling HTML containers
  * @constructor
  * @param {string} rootSelector - The CSS selector leading to the outermost container
  * @param {object} options - Optional parameters
  */
  module.exports = function ContentCarousel(rootSelector, options) {

    var that = this,
        animationInterval;

    StamenSuperClassy.apply(this, arguments);

    options = options || {};

    var rootElement     = document.querySelector(rootSelector),
        coverPhotos,
        optionsInternal = {};

    //
    // For this to work, overflow must be set to Auto on the root element
    //
    rootElement.style.overflow = "auto";

    /* TODO: figure out a new loader
    if (options.showLoader) {
      rootElement.style.backgroundImage    = "url(/style/loader.gif)";
      rootElement.style.backgroundRepeat   = "no-repeat";
      rootElement.style.backgroundPosition = "center";
    }
    */

    if(STMN && rootElement.parentNode.classList.contains("what-scrollbars") && STMN.OSName === "Windows") {
      var ws = rootElement.parentNode;
      ws.style.overflow = "hidden";
      rootElement.style.margin = "0 -17px -17px 0";
      rootElement.style.height = rootElement.offsetHeight + 17 + "px";
      rootElement.style.width = rootElement.offsetWidth + 17 + "px";
    }

    if (STMN && STMN.ua.split(" ")[0] === "Firefox") {
      rootElement.style.overflow = "-moz-scrollbars-none";
    }

    optionsInternal.slideClass = options.slideClass || "carousel-slide";

    coverPhotos = that.utils.get(rootSelector + " ." + optionsInternal.slideClass)[0];

    if(!rootSelector || !rootElement) {
      return false;
    }

    that.goForward = function goForward() {

      if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }

      var start = rootElement.scrollLeft,
          pos, next;

      if (options.snapToSlide) {
        coverPhotos = that.utils.get(rootSelector + " ." + optionsInternal.slideClass);
        next = Math.round(rootElement.scrollLeft/coverPhotos[0].offsetWidth)+1;
        pos = (coverPhotos[next]) ? coverPhotos[next].offsetLeft : start;
      } else {
        pos = start + rootElement.offsetWidth;
      }

      $(rootElement).animate({"scrollLeft":pos}, null, null, function() {

        that.fire("forward", {
          target : rootElement
        });
      });

    };

    that.goBackward = function goBackward() {

      if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }

      var start = rootElement.scrollLeft,
          pos, next;

      if (options.snapToSlide) {
        coverPhotos = that.utils.get(rootSelector + " ." + optionsInternal.slideClass);
        next = Math.round(rootElement.scrollLeft/coverPhotos[0].offsetWidth)-1;
        pos = (coverPhotos[next]) ? coverPhotos[next].offsetLeft : start;
      } else {
        pos = start - rootElement.offsetWidth;
      }

      $(rootElement).animate({"scrollLeft":start - (rootElement.offsetWidth)}, null, null, function() {
        that.fire("backward", {
          target : rootElement
        });
      });

    };

    //
    // Add root element class
    //
    rootElement.classList.add("stmn-carousel-module");

    //
    // Set scroll style
    //
    rootElement.style.overflow  = "hidden";
    rootElement.style.overflowX = "scroll";
    rootElement.style.position  = "relative";


    return that;

  };

});
