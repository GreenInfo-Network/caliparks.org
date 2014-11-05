define(["require","exports","module","handlebars","jquery","content-carousel","stamen-super-classy"], function(require, exports, module, Handlebars) {

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
        forwardButtonSelector = '.carousel-forward-button',
        stopFetching          = false,
        activeFetchRequest    = false,
        fetchStartat          = 20,
        fetchLimit            = 50,
        photoTemplate         = null,
        handlebars;

    StamenSuperClassy.apply(this, arguments);

    var rootNode = that.get(rootSelector)[0],
        backButtonNode     = that.get(backButtonSelector, rootNode)[0],
        forwardButtonNode  = that.get(forwardButtonSelector, rootNode)[0],
        slideContainerNode = that.get('.slide-container',rootNode)[0];

    function fetchPhotos() {

      if (!activeFetchRequest && !stopFetching) {
        activeFetchRequest = true;
        $.getJSON(location.href+'/flickr.json?startat='+fetchStartat+'&limit='+fetchLimit, function(data) {

          if (data.status === 'ok' && data.response.flickr.total) {

            if (data.response.flickr.total < fetchLimit) {
              stopFetching = true;
            }

            fetchStartat += data.response.flickr.total;

            data.response.flickr.items.forEach(function(photo) {
              $(slideContainerNode).append(Handlebars.compile(photoTemplate)(photo));
            });

          } else {
            stopFetching = true;
          }

          activeFetchRequest = false;
        });
      }

    }

    function init() {

      var carouselSliderSelector = rootSelector + ' .slide-container';

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

      $(carouselSliderSelector).on('scroll',function(e) {
        if ((e.target.scrollWidth-e.target.scrollLeft) < e.target.offsetWidth*4) {
          fetchPhotos();
        }
      });

      that.carouselInstance.on('forward', function(e) {

        if (e.caller.target.scrollLeft > (e.caller.target.scrollWidth-(e.caller.target.offsetWidth+e.caller.target.offsetWidth/2))) {
          rootNode.parentNode.parentNode.classList.add('scrolled-furthest');
        } else {
          rootNode.parentNode.parentNode.classList.remove('scrolled-furthest');
        }

        if (e.caller.target.scrollLeft < (e.caller.target.offsetWidth/2)) {
          rootNode.parentNode.parentNode.classList.add('not-scrolled');
        } else {
          rootNode.parentNode.parentNode.classList.remove('not-scrolled');
        }
      });

      that.carouselInstance.on('backward', function(e) {

        if (e.caller.target.scrollLeft > (e.caller.target.scrollWidth-(e.caller.target.offsetWidth+e.caller.target.offsetWidth/2))) {
          rootNode.parentNode.parentNode.classList.add('scrolled-furthest');
        } else {
          rootNode.parentNode.parentNode.classList.remove('scrolled-furthest');
        }

        if (e.caller.target.scrollLeft < (e.caller.target.offsetWidth/2)) {
          rootNode.parentNode.parentNode.classList.add('not-scrolled');
        } else {
          rootNode.parentNode.parentNode.classList.remove('not-scrolled');
        }
      });

      //
      // Fetch a handlebars template for Flickr photos
      //
      $.ajax('/js/partials/flickr_coverphoto.handlebars', {
        success : function(template) {
          photoTemplate = template;
        }
      });
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
