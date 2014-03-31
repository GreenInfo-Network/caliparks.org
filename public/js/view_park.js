'use strict';

(function(window) {

  window.STMN = window.STMN || {};

  var bounds = bounds;

  function displayUsCa(rootSelector, options) {

    options = options || {
      //defaults
      canvasWidth  : 110,
      canvasHeight : 150,
      scale         : 600,
      fillColor    : "rgb(34, 17, 2)",
      dotLocation  : null,
      dotRadius    : 2,
      dotColor     : 'white'
    };

    var svgUsCa = d3.select(rootSelector).append("svg")
        .attr("width", options.canvasWidth)
        .attr("height", options.canvasHeight)
        .attr("viewBox", [0, 0, options.canvasWidth, options.canvasHeight])
        .attr("preserveAspectRatio", "meet xMidYMid");

    var UsCa; // background shape

    var projectionUsCa = d3.geo.albers()
        .center([0,36.5]) // For statewide view
        .rotate([119, 0]) // For statewide view
        .parallels([32,40])
        .scale(options.scale)
        .translate([options.canvasWidth / 2, options.canvasHeight / 2]);

    var pathUsCa = d3.geo.path().projection(projectionUsCa);

    d3.json("/data/gadm_california.topojson", function(error, units) {

        UsCa = svgUsCa.append("g").selectAll("path")
            .data(topojson.feature(units, units.objects.gadm_california).features)
          .enter().append("path")
            .attr("d", pathUsCa)
            .attr("fill", options.fillColor)
            .attr("stroke", "rgba(255,255,255,.4)");

        if (options.dotLocation) {
          var coordinates = projectionUsCa(options.dotLocation);
          svgUsCa.append('svg:circle')
              .attr('cx', coordinates[0])
              .attr('cy', coordinates[1])
              .attr('r', options.dotRadius)
              .attr("fill", options.dotColor)
              .attr("stroke", "rgba(0,0,0,.2)");
        }

    });

  }

  function initView(data) {

    //TODO: move some of this logic out

    var flickrPhotos, instagramPhotos, tweets;

    //
    // Invoke the header carousel
    //

    if (data.flickrQueue.display) {
      var carousel = new SetUpCaousel('#coverphoto-carousel');
      
      flickrPhotos = new STMN.QueuedElementList('#coverphoto-carousel', {
        queue     : data.flickrQueue.photos,
        template  : data.flickrQueue.template,
        batchSize : 100
      });


      $('#coverphoto-carousel').on('scroll',function(e) {
        if ((e.target.scrollWidth-e.target.scrollLeft) < e.target.offsetWidth*3) {
          flickrPhotos.writeNextBatch();
        }
      });
    }

    //
    // Draw California
    //
    if (data.UsCaShape.display) {
      displayUsCa(
        data.UsCaShape.rootSelector, 
        data.UsCaShape.options
      );
    }

    //
    // Instagram display
    //
    if (data.instagramQueue.display) {
      instagramPhotos = new STMN.QueuedElementList('#instagram-photos .instagram-photo-container', {
        queue     : data.instagramQueue.photos,
        template  : data.instagramQueue.template,
        batchSize : 100
      });

      $('#instagram-photos .instagram-photo-container').on('click', function(e) {
        if (e.target.getAttribute('data-link')) {
          location.href = e.target.getAttribute('data-link');
        }
      });

      $('#instagram-photos button').on('click', function() {
        instagramPhotos.writeNextBatch();
      });

      instagramPhotos.on('writeBatch',function(e) {
        if (!e.queue.length) {
          $('#instagram-photos button').hide();
        }
      });
    }

    if (data.twitterQueue.display) {
      tweets = new STMN.QueuedElementList('#tweets ul', {
        queue     : data.twitterQueue.tweets,
        template  : data.twitterQueue.template,
        batchSize : 100
      });

      $('#tweets .show-more').on('click', function() {

        tweets.writeNextBatch();
      });

      tweets.on('writeBatch',function(e) {
        if (!e.queue.length) {
          $('#tweets .show-more').hide();
        }
      });
    }

    if (data.nearestParks) {

      $.ajax('/parks/near/' + data.nearestParks.centroid[0] + ',' + data.nearestParks.centroid[1] + '.json?limit=6&not=' + data.su_id, {complete:function(r) {

        r.responseJSON.response.parks.forEach(function(park) {
          park.width  = '125';
          park.height = '125';
          $(data.nearestParks.rootSelector).append(STMN.processTemplate(data.nearestParks.template,park));
        });

      }});

    }

    var positions = {},
        social_nav_data = {},
        social_nav_template = '<a href="/park/{su_id}">#{hashtag}</a>';
    function processSocialNavItem(network, property, r) {
        
      if (r.responseJSON && r.responseJSON.response) {
        social_nav_data[property] = r.responseJSON.response.parks;

        r.responseJSON.response.parks.forEach(function(p, i, array) {
          if (p.su_id === data.su_id) {
            positions[property] = i;
          }
        });

        if (positions[property]-1) {
          $(data.socialNav + ' .social-nav-'+network+' .hashtag-back').html( STMN.processTemplate(social_nav_template,social_nav_data[property][positions[property]-1]) );
        }

        if (positions[property]+1) {
          $(data.socialNav + ' .social-nav-'+network+' .hashtag-forward').html( STMN.processTemplate(social_nav_template,social_nav_data[property][positions[property]+1]) );
        }
      }

    }

    if (data.socialNav) {

      $.ajax('http://api.parks.stamen.com/parks/most-flickr-photos.json', {complete:function(r) {

        processSocialNavItem('flickr','flickr', r);

        $.ajax('http://api.parks.stamen.com/parks/most-instagram-photos.json', {complete:function(r) {

          processSocialNavItem('instagram', 'instagram', r);

          $.ajax('http://api.parks.stamen.com/parks/most-checkins.json', {complete:function(r) {

            processSocialNavItem('foursquare', 'checkins', r);

            $.ajax('http://api.parks.stamen.com/parks/most-tweets.json', {complete:function(r) {

              processSocialNavItem('twitter', 'tweets', r);

            }});

          }});

        }});

      }});

    }

    if (data.contentColumns) {
      new contentColumns(data.contentColumns);
    }
  }

  function contentColumns(rootSelector) {
    var contentColumnContainer = document.querySelector(rootSelector),
        alphadog               = contentColumnContainer.querySelector('.alphadog'),
        friend                 = contentColumnContainer.querySelector('.friend'),
        holder;

    function heightCheck() {
      if(alphadog.offsetHeight > friend.offsetHeight) {
        friend.style.height = Math.max(alphadog.offsetHeight, '670') + 'px';
      }
    }

    heightCheck();

    $(alphadog).bind('DOMSubtreeModified', function() {

      if (!holder) {

        holder = true;

        setTimeout(function() {
          heightCheck();
          holder = null;
        }, 250);

      }

    });
  }

  function SetUpCaousel(rootSelector) {

    var that = this;

    this.instance    = new window.STMN.Carousel(rootSelector, {
      slideClass : 'coverphoto',
      snapToSlide : true,
      showLoader: true
    });
    this.rootElement = document.querySelector(rootSelector);
    this.backElement = this.rootElement.parentNode.parentNode.querySelector('.carousel-back-button');
    this.backElement.addEventListener('click', function() {
      that.instance.goBackward();
    }, false);
    this.instance.on('forward', function(e) {

      if (e.target.scrollLeft > (e.target.scrollWidth-(e.target.offsetWidth+e.target.offsetWidth/2))) {
        that.rootElement.parentNode.parentNode.classList.add('scrolled-furthest');
      } else {
        that.rootElement.parentNode.parentNode.classList.remove('scrolled-furthest');
      }

      if (e.target.scrollLeft < (e.target.offsetWidth/2)) {
        that.rootElement.parentNode.parentNode.classList.add('not-scrolled');
      } else {
        that.rootElement.parentNode.parentNode.classList.remove('not-scrolled');
      }
    });
    this.instance.on('backward', function(e) {

      if (e.target.scrollLeft > (e.target.scrollWidth-(e.target.offsetWidth+e.target.offsetWidth/2))) {
        that.rootElement.parentNode.parentNode.classList.add('scrolled-furthest');
      } else {
        that.rootElement.parentNode.parentNode.classList.remove('scrolled-furthest');
      }

      if (e.target.scrollLeft < (e.target.offsetWidth/2)) {
        that.rootElement.parentNode.parentNode.classList.add('not-scrolled');
      } else {
        that.rootElement.parentNode.parentNode.classList.remove('not-scrolled');
      }
    });
    this.forwardElement = this.rootElement.parentNode.parentNode.querySelector('.carousel-forward-button');
    this.forwardElement.addEventListener('click', function() {
      that.instance.goForward();
    }, false);

  }

  //Public interface
  STMN.initView = initView;

}(window));