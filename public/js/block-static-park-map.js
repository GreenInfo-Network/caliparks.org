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

    var cartoDBLayerTemplates = {};

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

    function getCartoDBTilesTemplates(layers, callback) {

      var toResolve = Object.keys(layers).length;

      Object.keys(layers).forEach(function (layerId) {

        cartodb.Tiles.getTiles({
          type: 'cartodb',
          user_name: 'stamen-org',
          api_key:"d950cf0c5c3edd5ac6b151f1e124ebca159e700a",
          sublayers: [layers[layerId]]
        },
        function(tiles, err) {
          if(tiles == null) {
            callback(err);
          }

          cartoDBLayerTemplates[layerId] = tiles;

          if (Object.keys(cartoDBLayerTemplates).length >= toResolve) {
            callback(null, cartoDBLayerTemplates);
          }

        });

      });
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

        getCartoDBTilesTemplates({
          "foursquare" : {
            "sql"      : "SELECT * FROM park_foursquare_venues_dots",
            "cartocss" : "#park_foursquare_venues{  marker-fill-opacity: 1;  marker-line-color: #FFF;  marker-line-width: 0;  marker-line-opacity: 0.75;  marker-placement: point;  marker-type: ellipse;  marker-width: 3;  marker-fill: #2e176b;marker-allow-overlap: true;}"
          },
          "instagram" : {
            "sql"      : "SELECT * FROM instagram_photos_2014_12_10",
            "cartocss" : "#instagram_photos_2014_12_10{  marker-fill-opacity: 0.7;  marker-line-color: #FFF;  marker-line-width: 0;  marker-line-opacity: 0.75;  marker-placement: point;  marker-type: ellipse;  marker-width:3;  marker-fill: #126c94;  marker-allow-overlap: true;}"
          },
          "flickr" : {
            "sql"      : "SELECT * FROM flickr_photos_2014_12_10",
            "cartocss" : "#flickr_photos_2014_12_10{  marker-fill-opacity: 0.9;  marker-line-color: #FFF;  marker-line-width: 0;  marker-line-opacity: 0.75;  marker-placement: point;  marker-type: ellipse;  marker-width: 3;  marker-fill: #f4606f;  marker-allow-overlap: true;}"
          },
          "twitter" : {
            "sql"      : "SELECT * FROM site_tweets_dots",
            "cartocss" : "#site_tweets{  marker-fill-opacity: 0.9;  marker-line-color: #FFF;  marker-line-width: 0;  marker-line-opacity: 0.75;  marker-placement: point;  marker-type: ellipse;  marker-width: 3;  marker-fill: #21cad5;  marker-allow-overlap: true;}"
          }
        }, function(err, tileSets) {

          //
          // Instagram
          //
          that.bigMap.overlayMapTypes.insertAt(0, new GmapCustomTileLayer({
            tilePath : tileSets["instagram"].tiles[0],
            size     : 256,
            r        : (window.devicePixelRatio && window.devicePixelRatio > 1) ? "@2x" : ""
          }));

          //
          // Twitter
          //
          that.bigMap.overlayMapTypes.insertAt(0, new GmapCustomTileLayer({
            tilePath : tileSets["twitter"].tiles[0],
            size     : 256,
            r        : (window.devicePixelRatio && window.devicePixelRatio > 1) ? "@2x" : ""
          }));

          //
          // Flickr
          //
          that.bigMap.overlayMapTypes.insertAt(0, new GmapCustomTileLayer({
            tilePath : tileSets["flickr"].tiles[0],
            size     : 256,
            r        : (window.devicePixelRatio && window.devicePixelRatio > 1) ? "@2x" : ""
          }));

          //
          // Foursquare
          //
          that.bigMap.overlayMapTypes.insertAt(0, new GmapCustomTileLayer({
            tilePath : tileSets["foursquare"].tiles[0],
            size     : 256,
            r        : (window.devicePixelRatio && window.devicePixelRatio > 1) ? "@2x" : ""
          }));

          rootNode.classList.add("showSocial");

        });

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
