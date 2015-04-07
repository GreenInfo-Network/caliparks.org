define(["require","exports","module","detect-os","stamen-super-classy","gmap-custom-tile-layer"], function(
  require,
  exports,
  module,
  DetectOs,
  StamenSuperClassy,
  GmapCustomTileLayer
) {

  "use strict";

  module.exports=function(rootSelector, viewOptions, callback) {

    var that = this;

    StamenSuperClassy.apply(that, arguments);

    var rootNode   = that.utils.get(rootSelector)[0],
        bigMapNode = that.utils.get(".big-park-map",rootNode)[0],
        smallMapNode = that.utils.get(".small-park-map",rootNode)[0];

    //
    // Lifted from http://stackoverflow.com/questions/6048975/google-maps-v3-how-to-calculate-the-zoom-level-for-a-given-bounds
    //
    function getBoundsZoomLevel(bounds, mapDim) {
      var WORLD_DIM = { height: 256, width: 256 };
      var ZOOM_MAX = 21;

      function latRad(lat) {
        var sin = Math.sin(lat * Math.PI / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
      }

      function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
      }

      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();

      var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

      var lngDiff = ne.lng() - sw.lng();
      var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

      var latZoom = zoom(mapDim.offsetHeight, WORLD_DIM.height, latFraction);
      var lngZoom = zoom(mapDim.offsetWidth, WORLD_DIM.width, lngFraction);

      return Math.min(latZoom, lngZoom, ZOOM_MAX);
    }

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
    // Open directions in the right place for each platform
    // defaults to web if not sure
    //
    function launchDirections() {
      if (new DetectOs().getMobileOperatingSystem() === "iOS") {
        location.href="comgooglemaps://?q="+viewOptions.name+"@"+viewOptions.centroid.coordinates[1]+", "+viewOptions.centroid.coordinates[0]+"&zoom=15&views=transit";
      } else {
        window.open("https://www.google.com/maps/dir//"+viewOptions.centroid.coordinates[1]+", "+viewOptions.centroid.coordinates[0]);
      }

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

    function initBigMap() {

      var bounds = geoJSONBBoxToGoogleBounds(viewOptions.bbox),
          zoom   = getBoundsZoomLevel(bounds, bigMapNode),
          mapConfig;

      if (zoom > 16) {
        zoom = zoom-1;
      }

      mapConfig = {
        mapTypeControl: false,
        streetViewControl: true,
        center: bounds.getCenter(),
        zoom                : zoom,
        scrollwheel         : false,
        disableDefaultUI    : false,
        panControl          : true,
        zoomControlOptions: {
          style: 1
        },
        draggable           : true,
        mapTypeControlviewOptions : {
          mapTypeIds : ["parksLayer"]
        }
      };

      if (that.utils.get("body")[0].classList.contains("rendered-narrow")) {
        mapConfig.disableDefaultUI  = true;
        mapConfig.panControl        = false;
        mapConfig.draggable         = false;
        mapConfig.streetViewControl = false;
      }

      that.bigMap = new google.maps.Map(bigMapNode,mapConfig);


      if (!bigMapNode.offsetHeight) {
        bigMapNode.style.height = "100%";
      }

      that.bigMap.mapTypes.set("parksLayer", that.parksLayer);
      that.bigMap.setMapTypeId("parksLayer");

      if (viewOptions.showSocial) {
        //
        // Instagram
        //
        that.bigMap.overlayMapTypes.insertAt(0, new GmapCustomTileLayer({
          tilePath : "https://stamen-org.cartodb.com/api/v1/map/5471799c671ddd84c05898ed99475bf9:1418253542174.26/{z}/{x}/{y}.png?map_key=d950cf0c5c3edd5ac6b151f1e124ebca159e700a&api_key=d950cf0c5c3edd5ac6b151f1e124ebca159e700a&cache_policy=persist",
          size     : 256,
          r        : (window.devicePixelRatio && window.devicePixelRatio > 1) ? "@2x" : ""
        }));

        //
        // Twitter
        //
        that.bigMap.overlayMapTypes.insertAt(0, new GmapCustomTileLayer({
          tilePath : "https://stamen-org.cartodb.com/api/v1/map/37b29415d0242f08967a034a8f1a1dbd:1428364376213.8901/{z}/{x}/{y}.png?map_key=d950cf0c5c3edd5ac6b151f1e124ebca159e700a&api_key=d950cf0c5c3edd5ac6b151f1e124ebca159e700a&cache_policy=persist",
          size     : 256,
          r        : (window.devicePixelRatio && window.devicePixelRatio > 1) ? "@2x" : ""
        }));

        //
        // Flickr
        //
        that.bigMap.overlayMapTypes.insertAt(0, new GmapCustomTileLayer({
          tilePath : "https://stamen-org.cartodb.com/api/v1/map/96b5b2b3d458bcb2827d3d1ce6f8a8e6:1418253115682.29/{z}/{x}/{y}.png?map_key=d950cf0c5c3edd5ac6b151f1e124ebca159e700a&api_key=d950cf0c5c3edd5ac6b151f1e124ebca159e700a&cache_policy=persist",
          size     : 256,
          r        : (window.devicePixelRatio && window.devicePixelRatio > 1) ? "@2x" : ""
        }));

        //
        // Foursquare
        //
        that.bigMap.overlayMapTypes.insertAt(0, new GmapCustomTileLayer({
          tilePath : "https://stamen-org.cartodb.com/api/v1/map/6c71c420282371e13a1bb5b19d634907:1428364717332.52/{z}/{x}/{y}.png?map_key=d950cf0c5c3edd5ac6b151f1e124ebca159e700a&api_key=d950cf0c5c3edd5ac6b151f1e124ebca159e700a&cache_policy=persist",
          size     : 256,
          r        : (window.devicePixelRatio && window.devicePixelRatio > 1) ? "@2x" : ""
        }));

        rootNode.classList.add("showSocial");
      }

      that.bigMap.data.setStyle({
        fillColor:"rgba(2, 122, 187,.2)",
        strokeColor:"rgba(2, 122, 187,.7)",
        strokeWeight:1
      });

      that.bigMap.data.addGeoJson({
        "type": "Feature",
        "geometry": viewOptions.geometry,
        "properties": {
          "name": viewOptions.unit_name
        }
      });


      google.maps.event.addDomListener(window, "resize", function() {
       google.maps.event.trigger(that.bigMap.getCenter(), "resize");
       that.bigMap.setCenter(that.bigMap.getCenter());
      });

    }

    function initSmallMap() {

      if (smallMapNode) {
        that.smallMap = new google.maps.Map(smallMapNode,{
          mapTypeControl: false,
          streetViewControl: false,
          center: new google.maps.LatLng(viewOptions.centroid.coordinates[1], viewOptions.centroid.coordinates[0]),
          zoom                : 6,
          scrollwheel         : false,
          disableDefaultUI    : true,
          draggable           : false,
          mapTypeControlOptions : {
            mapTypeIds : ["parksLayer"]
          }
        });

        that.smallMap.mapTypes.set("parksLayer", that.parksLayer);
        that.smallMap.setMapTypeId("parksLayer");

        that.smallMapCircle = new google.maps.Marker({
          icon: {
            path: "M0,5a5,5 0 1,0 10,0a5,5 0 1,0 -10,0",
            scale: 1,
            fillOpacity:1,
            fillColor:"#607d8b",
            strokeColor:"white",
            strokeWeight:2
          },
          position: new google.maps.LatLng(viewOptions.centroid.coordinates[1], viewOptions.centroid.coordinates[0])
        });
        that.smallMapCircle.setMap(that.smallMap);

      }

    }

    function initActions() {
      var directionsAction = that.utils.get(".directions-action", rootNode)[0];

      if (directionsAction) {
        directionsAction.addEventListener("click", function() {
          return launchDirections();
        }, false);
      }
    }

    //
    // Init function
    //
    function initialize() {
      initStamenLayer();

      initBigMap();

      initSmallMap();

      initActions();

      callback(null, that);

    }

    //
    // GO GO GO!
    //

    initialize();

    return that;

  };

});
