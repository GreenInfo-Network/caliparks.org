define([ "require", "exports", "module", "detect-os", "stamen-super-classy", "gmap-custom-tile-layer" ], function(require, exports, module, DetectOs, StamenSuperClassy, GmapCustomTileLayer) {
    "use strict";
    module.exports = function(rootSelector, viewOptions, callback) {
        function geoJSONBBoxToGoogleBounds(GeoJSONBBoxPolygon) {
            for (var a, b, point, bounds = new google.maps.LatLngBounds(), ii = 0; ii < GeoJSONBBoxPolygon.coordinates[0].length; ii++) a = GeoJSONBBoxPolygon.coordinates[0][ii][1], 
            b = GeoJSONBBoxPolygon.coordinates[0][ii][0], point = new google.maps.LatLng(a, b), 
            bounds.extend(point);
            return bounds;
        }
        function launchDirections() {
            location.href = "iOS" === new DetectOs().getMobileOperatingSystem() ? "comgooglemaps://?q=" + viewOptions.name + "@" + viewOptions.centroid.coordinates[1] + ", " + viewOptions.centroid.coordinates[0] + "&zoom=15&views=transit" : 'https://www.google.com/maps/dir//"' + viewOptions.centroid.coordinates[1] + ", " + viewOptions.centroid.coordinates[0] + '"';
        }
        function initStamenLayer() {
            return that.parksLayer = new GmapCustomTileLayer({
                tilePath: "http://{s}.map.parks.stamen.com/{z}/{x}/{y}.png",
                size: 256
            }), that.parksLayer;
        }
        function initBigMap() {
            that.bigMap = new google.maps.Map(bigMapNode, {
                mapTypeControl: !1,
                streetViewControl: !1,
                center: new google.maps.LatLng(viewOptions.centroid.coordinates[1], viewOptions.centroid.coordinates[0]),
                zoom: 15,
                scrollwheel: !1,
                disableDefaultUI: !1,
                panControl: !1,
                zoomControlOptions: {
                    style: 1,
                    position: 4
                },
                draggable: !1,
                mapTypeControlviewOptions: {
                    mapTypeIds: [ "parksLayer" ]
                }
            }), that.bigMap.mapTypes.set("parksLayer", that.parksLayer), that.bigMap.setMapTypeId("parksLayer"), 
            that.bigMap.fitBounds(geoJSONBBoxToGoogleBounds(viewOptions.bbox)), setTimeout(function() {
                var zoom = that.bigMap.getZoom();
                16 > zoom && that.bigMap.setZoom(zoom + 1);
            }, 250), google.maps.event.addDomListener(window, "resize", function() {
                google.maps.event.trigger(that.bigMap.getCenter(), "resize"), that.bigMap.setCenter(that.bigMap.getCenter());
            });
        }
        function initSmallMap() {
            that.smallMap = new google.maps.Map(smallMapNode, {
                mapTypeControl: !1,
                streetViewControl: !1,
                center: new google.maps.LatLng(viewOptions.centroid.coordinates[1], viewOptions.centroid.coordinates[0]),
                zoom: 6,
                scrollwheel: !1,
                disableDefaultUI: !0,
                draggable: !1,
                mapTypeControlOptions: {
                    mapTypeIds: [ "parksLayer" ]
                }
            }), that.smallMapRect = new google.maps.Rectangle({
                strokeColor: "#000",
                strokeOpacity: .35,
                strokeWeight: 1,
                fillColor: "#000",
                fillOpacity: .1,
                map: that.smallMap,
                bounds: geoJSONBBoxToGoogleBounds(viewOptions.bbox)
            }), that.smallMapCircle = new google.maps.Marker({
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillOpacity: 1,
                    fillColor: "black",
                    strokeOpacity: 1,
                    strokeColor: "white",
                    strokeWeight: 2,
                    scale: 4
                },
                position: new google.maps.LatLng(viewOptions.centroid.coordinates[1], viewOptions.centroid.coordinates[0])
            }), that.smallMapCircle.setMap(that.smallMap);
        }
        function initActions() {
            var directionsAction = that.utils.get(".directions-action", rootNode)[0];
            directionsAction.addEventListener("click", function() {
                return launchDirections();
            }, !1);
        }
        function initialize() {
            initStamenLayer(), initBigMap(), initSmallMap(), initActions(), that.on("ready", function() {
                callback(null, that);
            });
        }
        var that = this;
        StamenSuperClassy.apply(that, arguments);
        var rootNode = that.utils.get(rootSelector)[0], bigMapNode = that.utils.get(".big-park-map", rootNode)[0], smallMapNode = that.utils.get(".small-park-map", rootNode)[0];
        return google.maps.event.addDomListener(window, "load", function() {
            initialize();
        }), that;
    };
});