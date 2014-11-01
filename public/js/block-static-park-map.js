define(["require","exports","module","stamen-super-classy","gmap-custom-tile-layer"], function(require,exports, module) {

  'use strict';

  var StamenSuperClassy = require("stamen-super-classy");

  var state             = {},
      data              = {};

  module.exports=function(rootSelector, options, callback) {

    var that = this;

    StamenSuperClassy.apply(that, arguments);

    var rootNode   = that.get(rootSelector)[0],
        bigMapNode = that.get('.big-park-map',rootNode)[0],
        smallMapNode = that.get('.small-park-map',rootNode)[0];

    function initBigMap() {
      that.bigMap = new google.maps.Map(bigMapNode,{
        mapTypeControl: false,
        streetViewControl: false,
        center: new google.maps.LatLng(options.centroid[0], options.centroid[1]),
        zoom                : 11,
        scrollwheel         : false,
        disableDefaultUI    : true
      });
    }

    function initSmallMap() {
      that.smallMap = new google.maps.Map(smallMapNode,{
        mapTypeControl: false,
        streetViewControl: false,
        center: new google.maps.LatLng(options.centroid[0], options.centroid[1]),
        zoom                : 15,
        scrollwheel         : false,
        disableDefaultUI    : true
      });
    }

    //
    // Init function
    //
    function initialize() {
      initBigMap();
      initSmallMap()

      that.on('ready', function() {
        callback(null, that);
      });
    }

    //
    // GO GO GO!
    //
    google.maps.event.addDomListener(window, 'load', function() {
      initialize();
    });

    return that;

  };

});
