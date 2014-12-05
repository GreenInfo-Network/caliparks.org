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
      var bounds = new google.maps.LatLngBounds();

      bounds.extend(new google.maps.LatLng(GeoJSONBBoxPolygon[1], GeoJSONBBoxPolygon[0]));
      bounds.extend(new google.maps.LatLng(GeoJSONBBoxPolygon[3], GeoJSONBBoxPolygon[2]));

      return bounds;
    }

    function resize() {
      google.maps.event.trigger(that.map, "resize");
      that.map.fitBounds(geoJSONBBoxToGoogleBounds(that.pinLayer.getData().bbox));
    }

    function getBounds() {
      var gbounds = that.map.getBounds().toUrlValue().split(",").map(parseFloat);
      return [ //formatting to match http://geojson.org/geojson-spec.html#bounding-boxes
        gbounds[1],
        gbounds[0],
        gbounds[3],
        gbounds[2]
      ];
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

    function initmap() {

      that.map = new google.maps.Map(rootNode,{
        mapTypeControl: false,
        streetViewControl: false,
        center: new google.maps.LatLng(37.76,-122.41),
        zoom                : 11,
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

      that.map.mapTypes.set("parksLayer", that.parksLayer);
      that.map.setMapTypeId("parksLayer");

      var pinLayer = new GmapCustomPinLayer(that.map, {
        data : options.data
      });
      that.pinLayer = pinLayer;

      pinLayer.on("data-updated", function(newData) {
        if (newData.caller.newData) {
          that.map.fitBounds(geoJSONBBoxToGoogleBounds(options.contextBounds));
        }
      });

      that.updateData = pinLayer.updateData;

      google.maps.event.addDomListener(window, "resize", function() {
       google.maps.event.trigger(that.map.getCenter(), "resize");
       that.map.setCenter(that.map.getCenter());
      });
    }

    //
    // Init function
    //
    function initialize() {
      initStamenLayer();
      initmap();

      that.on("ready", function() {
        callback(null, that);
      });
    }

    //
    // Public interface
    //
    that.resize    = resize;
    that.getBounds = getBounds;

    //
    // GO GO GO!
    //
    initialize();


    return that;

  };

});
