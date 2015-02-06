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

    var that          = this,
        defaultCenter = [37.76,-122.41];

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

    function setCenter(point) {
      that.map.setCenter({lat: point.coordinates[1], lng: point.coordinates[0]});
    }

    //
    // Initialization methods
    //

    function initStamenLayer() {
      that.parksLayer = new GmapCustomTileLayer({
        tilePath : "http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png",
        size     : 256,
        r        : (window.devicePixelRatio && window.devicePixelRatio > 1) ? "@2x" : ""
      });

      return that.parksLayer;
    }

    function initmap() {

      var center = defaultCenter;

      if (options.centroid) {
        center = [
          options.centroid.coordinates[1],
          options.centroid.coordinates[0]
        ];
      }

      that.map = new google.maps.Map(rootNode,{
        mapTypeControl: false,
        center: new google.maps.LatLng(center[0], center[1]),
        zoom                : 7,
        scrollwheel         : false,
        disableDefaultUI    : false,
        panControl          : false,
        streetViewControl   : true,
        zoomControlOptions: {
          style: 1,
          position: 4
        },
        mapTypeControloptions : {
          mapTypeIds : ["parksLayer"]
        }
      });

      //new google.maps.UrlHash(that.map);

      if (options.polygon) {
        that.map.data.setStyle(options.polygonOptions || {
          fillColor:"rgba(2, 122, 187,.2)",
          strokeColor:"rgba(2, 122, 187,.7)",
          strokeWeight:1
        });

        that.map.data.addGeoJson(options.polygon);
      }

      that.map.mapTypes.set("parksLayer", that.parksLayer);
      that.map.setMapTypeId("parksLayer");

      var pinLayer = new GmapCustomPinLayer(that.map, {
        "data"              : options.data,
        "featureIdProperty" : "superunit_id"
      });
      that.pinLayer = pinLayer;

      if (options.contextBounds) {
        that.map.fitBounds(geoJSONBBoxToGoogleBounds(options.contextBounds));
      }

      that.updateData = pinLayer.updateData;

      google.maps.event.addListener(that.map, "bounds_changed", function(e) {
        that.fire("bounds-changed", {
          googleBounds:that.map.getBounds()
        });
      });

      google.maps.event.addListener(that.map, "idle", function(e) {
        that.fire("idle");
      });

      google.maps.event.addDomListener(window, "resize", function(e) {
       google.maps.event.trigger(that.map.getCenter(), "resize");
       that.map.setCenter(that.map.getCenter());
      });

      google.maps.event.addDomListener(that.map.getStreetView(), "visible_changed", function(e) {
        that.fire("street-view-toggle", {
          "visible" : that.map.getStreetView().getVisible()
        });
      });

      pinLayer.on("marker-click", function(e) {
        that.fire("marker-click", e.caller);
      });

      pinLayer.on("marker-mouseover", function(e) {
        that.fire("marker-mouseover", e.caller);
      });

      pinLayer.on("marker-mouseout", function(e) {
        that.fire("marker-mouseout", e.caller);
      });

      pinLayer.on("select-markers", function(e) {
        that.fire("select-markers", e.caller);
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
    that.setCenter = setCenter;

    //
    // GO GO GO!
    //
    initialize();

    if (callback) {
      callback(null, that);
    }

    return that;

  };

});
