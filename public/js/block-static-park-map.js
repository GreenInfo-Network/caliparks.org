define(["require","exports","module","detect-os","stamen-super-classy","gmap-custom-tile-layer"], function(require,exports, module) {

  'use strict';

  var StamenSuperClassy   = require("stamen-super-classy"),
      GmapCustomTileLayer = require("gmap-custom-tile-layer"),
      DetectOs            = require('detect-os');

  var detectOs = new DetectOs();

  var state             = {},
      data              = {};

  module.exports=function(rootSelector, viewOptions, callback) {

    var that = this;

    StamenSuperClassy.apply(that, arguments);

    var rootNode   = that.utils.get(rootSelector)[0],
        bigMapNode = that.utils.get('.big-park-map',rootNode)[0],
        smallMapNode = that.utils.get('.small-park-map',rootNode)[0];

    //
    // Converts GeoJSON bounding box to Google Maps bounds
    // Lifted from http://stackoverflow.com/questions/23488463/zoom-to-markers-using-geojson-googlemaps-api-v3
    //
    function geoJSONBBoxToGoogleBounds(GeoJSONBBoxPolygon) {
      var bounds = new google.maps.LatLngBounds(),
          data   = GeoJSONBBoxPolygon,
          a, b, point;

      for (var ii = 0; ii < GeoJSONBBoxPolygon.coordinates[0].length; ii++) {
        a = GeoJSONBBoxPolygon.coordinates[0][ii][1];
        b = GeoJSONBBoxPolygon.coordinates[0][ii][0];

        point = new google.maps.LatLng(a, b);
        bounds.extend(point);
      }

      return bounds;
    }

    //
    // Open directions in the right place for each platform
    // defaults to web if not sure
    //
    function launchDirections() {
      if (detectOs.getMobileOperatingSystem() === 'iOS') {
        location.href='comgooglemaps://?q='+viewOptions.name+'@'+viewOptions.centroid.coordinates[1]+', '+viewOptions.centroid.coordinates[0]+'&zoom=15&views=transit';
      } else {
        location.href='https://www.google.com/maps/dir//\''+viewOptions.centroid.coordinates[1]+', '+viewOptions.centroid.coordinates[0]+'\'';
      }

    }

    //
    // Initialization methods
    //

    function initStamenLayer() {
      return that.parksLayer = new GmapCustomTileLayer({
        tilePath : 'http://{s}.map.parks.stamen.com/{z}/{x}/{y}.png',
        size     : 256
      });
    }

    function initBigMap() {

      that.bigMap = new google.maps.Map(bigMapNode,{
        mapTypeControl: false,
        streetViewControl: false,
        center: new google.maps.LatLng(viewOptions.centroid.coordinates[1], viewOptions.centroid.coordinates[0]),
        zoom                : 15,
        scrollwheel         : false,
        disableDefaultUI    : false,
        panControl          : false,
        zoomControlOptions: {
          style: 1,
          position: 4
        },
        draggable           : false,
        mapTypeControlviewOptions : {
          mapTypeIds : ['parksLayer']
        }
      });

      that.bigMap.mapTypes.set('parksLayer', that.parksLayer);
      that.bigMap.setMapTypeId('parksLayer');
      that.bigMap.fitBounds(geoJSONBBoxToGoogleBounds(viewOptions.bbox));

      setTimeout(function() {
        var zoom = that.bigMap.getZoom();
        if (zoom < 16) {
          that.bigMap.setZoom(zoom+1);
        }
      }, 250);

      google.maps.event.addDomListener(window, "resize", function() {
       google.maps.event.trigger(that.bigMap.getCenter(), "resize");
       that.bigMap.setCenter(that.bigMap.getCenter());
      });
    }

    function initSmallMap() {
      that.smallMap = new google.maps.Map(smallMapNode,{
        mapTypeControl: false,
        streetViewControl: false,
        center: new google.maps.LatLng(viewOptions.centroid.coordinates[1], viewOptions.centroid.coordinates[0]),
        zoom                : 6,
        scrollwheel         : false,
        disableDefaultUI    : true,
        draggable           : false,
        mapTypeControlOptions : {
          mapTypeIds : ['parksLayer']
        }
      });

      that.smallMapRect = new google.maps.Rectangle({
        strokeColor: '#000',
        strokeOpacity: 0.35,
        strokeWeight: 1,
        fillColor: '#000',
        fillOpacity: 0.1,
        map: that.smallMap,
        bounds: geoJSONBBoxToGoogleBounds(viewOptions.bbox)
      });

      that.smallMapCircle = new google.maps.Marker({
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 1.0,
            fillColor: "black",
            strokeOpacity: 1.0,
            strokeColor: "white",
            strokeWeight: 2.0,
            scale: 4.0
        },
        position: new google.maps.LatLng(viewOptions.centroid.coordinates[1], viewOptions.centroid.coordinates[0])
      });
      that.smallMapCircle.setMap(that.smallMap);
    }

    function initActions() {
      var directionsAction = that.utils.get('.directions-action', rootNode)[0];

      directionsAction.addEventListener('click', function() {
        return launchDirections();
      }, false);
    }

    //
    // Init function
    //
    function initialize() {
      initStamenLayer();
      initBigMap();
      initSmallMap();
      initActions()

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
