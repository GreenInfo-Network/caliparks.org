define(["require","exports","module","stamen-super-classy","gmap-custom-tile-layer","gmap-custom-pin-layer"], function(
  require,
  exports,
  module,
  StamenSuperClassy,
  GmapCustomTileLayer,
  GmapCustomPinLayer
) {

  "use strict";

  module.exports=function(rootSelector, options, callback) {

    var that = this;

    StamenSuperClassy.apply(that, arguments);

    var rootNode = that.utils.get(rootSelector)[0];

    //
    // Converts GeoJSON bounding box to Google Maps bounds
    // Lifted from http://stackoverflow.com/questions/23488463/zoom-to-markers-using-geojson-googlemaps-api-v3
    //
    function geoJSONBBoxToGoogleBounds(GeoJSONBBoxPolygon) {
      var bounds = new google.maps.LatLngBounds(),
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
    // Initialization methods
    //

    function initStamenLayer() {
      that.parksLayer = new GmapCustomTileLayer({
        tilePath : "http://{s}.map.parks.stamen.com/{z}/{x}/{y}.png",
        size     : 256
      });

      return that.parksLayer;
    }

    function initBigMap() {

      that.bigMap = new google.maps.Map(rootNode,{
        mapTypeControl: false,
        streetViewControl: false,
        center: new google.maps.LatLng(37.76,-122.41),
        zoom                : 15,
        scrollwheel         : false,
        disableDefaultUI    : false,
        panControl          : false,
        zoomControlOptions: {
          style: 1,
          position: 4
        },
        mapTypeControloptions : {
          mapTypeIds : ["parksLayer"]
        }
      });

      that.bigMap.mapTypes.set("parksLayer", that.parksLayer);
      that.bigMap.setMapTypeId("parksLayer");
      //that.bigMap.fitBounds(geoJSONBBoxToGoogleBounds(options.bbox));

      setTimeout(function() {
        var pinLayer = new GmapCustomPinLayer(that.bigMap, {
              data         :  { "type": "FeatureCollection",
              "features": [
              { "type": "Feature",
              "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
              "properties": {"prop0": "value0"}
            }
            ]
          }
        });
      }, 1000);

      google.maps.event.addDomListener(window, "resize", function() {
       google.maps.event.trigger(that.bigMap.getCenter(), "resize");
       that.bigMap.setCenter(that.bigMap.getCenter());
      });
    }

    //
    // Init function
    //
    function initialize() {
      initStamenLayer();
      initBigMap();

      that.on("ready", function() {
        callback(null, that);
      });
    }

    //
    // GO GO GO!
    //
    initialize();

    return that;

  };

});
