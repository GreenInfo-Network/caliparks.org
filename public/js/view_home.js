'use static';

(function(window) {

  var sliders = {};

  function SetUpCaousel(rootSelector, options) {

    var that = this,
        queue;

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
    // Image defer
    //
    queue = new STMN.QueuedElementList(rootSelector, {
      queue     : options.queue,
      template  : '<style>  #glop-park-{su_id} {    background-image:url(\'http://rasterblaster.stamen.com/cpad/{su_id}-888462-200-200.png\');  }  #glop-park-635:hover {    background-image:url(\'http://rasterblaster.stamen.com/cpad/{su_id}-85BBE1-200-200.png\');  }</style><a href="/park/{su_id}"><div id="glop-park-{su_id}" class="glop-park" style="background-position: initial;" data-park-id="{su_id}"><span class="hashtag">#{hashtag}</span><span class="park-name">{unit_name}</span></div></a>',
      batchSize : 100
    });

    $(rootSelector).on('scroll',function(e) {
      if ((e.target.scrollWidth-e.target.scrollLeft) < e.target.offsetWidth*3) {
        queue.writeNextBatch();
      }
    });

  }

  document.addEventListener('DOMContentLoaded', function() {

    var biggestCarousel  = new SetUpCaousel('#size-glop-slider',     {queue:STMN.parkShapes.parksQueue}),
        tweetsCarousel   = new SetUpCaousel('#tweets-glop-slider',   {queue:STMN.parkShapes.most_photographedQueue}),
        photosCarousel   = new SetUpCaousel('#photos-glop-slider',   {queue:STMN.parkShapes.most_tweetsQueue}),
        checkinsCarousel = new SetUpCaousel('#checkins-glop-slider', {queue:STMN.parkShapes.most_checkinsQueue});

  }, false);

}(window));