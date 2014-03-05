'use static';

(function(window) {

  var sliders = {};

  function SetUpCaousel(rootSelector) {

    var that = this;

    //
    // Biggest to smallest carousel
    //
    this.instance    = new STMN.Carousel(rootSelector, {
      slideClass : 'glop-park'
    });
    this.rootElement = document.querySelector(rootSelector).parentNode;
    this.backElement = this.rootElement.querySelector('.carousel-back-button');
    this.backElement.addEventListener('click', function() {
      that.instance.goBackward();
    }, false);
    this.instance.on('forward', function(e) {

      if (e.target.scrollLeft > (e.target.scrollWidth-(e.target.offsetWidth+e.target.offsetWidth/2))) {
        that.rootElement.classList.add('scrolled-furthest');
      } else {
        that.rootElement.classList.remove('scrolled-furthest');
      }

      if (e.target.scrollLeft < (e.target.offsetWidth/2)) {
        that.rootElement.classList.add('not-scrolled');
      } else {
        that.rootElement.classList.remove('not-scrolled');
      }
    });
    this.instance.on('backward', function(e) {

      if (e.target.scrollLeft > (e.target.scrollWidth-(e.target.offsetWidth+e.target.offsetWidth/2))) {
        that.rootElement.classList.add('scrolled-furthest');
      } else {
        that.rootElement.classList.remove('scrolled-furthest');
      }

      if (e.target.scrollLeft < (e.target.offsetWidth/2)) {
        that.rootElement.classList.add('not-scrolled');
      } else {
        that.rootElement.classList.remove('not-scrolled');
      }
    });
    this.forwardElement = this.rootElement.querySelector('.carousel-forward-button');
    this.forwardElement.addEventListener('click', function() {
      that.instance.goForward();
    }, false);

    //
    // Make an image defer instance
    //
    /*
    this.imageDefer = new STMN.ImageDefer(rootSelector + ' .glop-park', {
      scrollSelector : rootSelector
    });
    */

  }

  document.addEventListener('DOMContentLoaded', function() {

    var biggestCarousel  = new SetUpCaousel('#size-glop-slider'),
        tweetsCarousel   = new SetUpCaousel('#tweets-glop-slider'),
        photosCarousel   = new SetUpCaousel('#photos-glop-slider'),
        checkinsCarousel = new SetUpCaousel('#checkins-glop-slider');

  }, false);

}(window));