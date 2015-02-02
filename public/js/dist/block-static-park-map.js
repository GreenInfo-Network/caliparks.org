define([ "require", "exports", "module", "detect-os", "stamen-super-classy", "gmap-custom-tile-layer" ], function(require, exports, module, DetectOs, StamenSuperClassy, GmapCustomTileLayer) {
    "use strict";
    module.exports = function(rootSelector, viewOptions, callback) {
        function getBoundsZoomLevel(bounds, mapDim) {
            function latRad(lat) {
                var sin = Math.sin(lat * Math.PI / 180), radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
                return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
            }
            function zoom(mapPx, worldPx, fraction) {
                return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
            }
            var WORLD_DIM = {
                height: 256,
                width: 256
            }, ZOOM_MAX = 21, ne = bounds.getNorthEast(), sw = bounds.getSouthWest(), latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI, lngDiff = ne.lng() - sw.lng(), lngFraction = (0 > lngDiff ? lngDiff + 360 : lngDiff) / 360, latZoom = zoom(mapDim.offsetHeight, WORLD_DIM.height, latFraction), lngZoom = zoom(mapDim.offsetWidth, WORLD_DIM.width, lngFraction);
            return Math.min(latZoom, lngZoom, ZOOM_MAX);
        }
        function geoJSONBBoxToGoogleBounds(GeoJSONBBoxPolygon) {
            for (var a, b, point, bounds = new google.maps.LatLngBounds(), ii = 0; ii < GeoJSONBBoxPolygon.coordinates[0].length; ii++) a = GeoJSONBBoxPolygon.coordinates[0][ii][1], 
            b = GeoJSONBBoxPolygon.coordinates[0][ii][0], point = new google.maps.LatLng(a, b), 
            bounds.extend(point);
            return bounds;
        }
        function launchDirections() {
            "iOS" === new DetectOs().getMobileOperatingSystem() ? location.href = "comgooglemaps://?q=" + viewOptions.name + "@" + viewOptions.centroid.coordinates[1] + ", " + viewOptions.centroid.coordinates[0] + "&zoom=15&views=transit" : window.open("https://www.google.com/maps/dir//" + viewOptions.centroid.coordinates[1] + ", " + viewOptions.centroid.coordinates[0]);
        }
        function initStamenLayer() {
            return that.parksLayer = new GmapCustomTileLayer({
                tilePath: "http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png",
                size: 256,
                r: window.devicePixelRatio && window.devicePixelRatio > 1 ? "@2x" : ""
            }), that.parksLayer;
        }
        function initBigMap() {
            var mapConfig, bounds = geoJSONBBoxToGoogleBounds(viewOptions.bbox), zoom = getBoundsZoomLevel(bounds, bigMapNode);
            zoom > 16 && (zoom -= 1), mapConfig = {
                mapTypeControl: !1,
                streetViewControl: !0,
                center: bounds.getCenter(),
                zoom: zoom,
                scrollwheel: !1,
                disableDefaultUI: !1,
                panControl: !0,
                zoomControlOptions: {
                    style: 1
                },
                draggable: !0,
                mapTypeControlviewOptions: {
                    mapTypeIds: [ "parksLayer" ]
                }
            }, that.utils.get("body")[0].classList.contains("rendered-narrow") && (mapConfig.disableDefaultUI = !0, 
            mapConfig.panControl = !1, mapConfig.draggable = !1, mapConfig.streetViewControl = !1), 
            that.bigMap = new google.maps.Map(bigMapNode, mapConfig), bigMapNode.offsetHeight || (bigMapNode.style.height = "100%"), 
            that.bigMap.mapTypes.set("parksLayer", that.parksLayer), that.bigMap.setMapTypeId("parksLayer"), 
            that.bigMap.data.setStyle({
                fillColor: "rgba(2, 122, 187,.2)",
                strokeColor: "rgba(2, 122, 187,.7)",
                strokeWeight: 1
            }), that.bigMap.data.addGeoJson({
                type: "Feature",
                geometry: viewOptions.geometry,
                properties: {
                    name: viewOptions.unit_name
                }
            }), google.maps.event.addDomListener(window, "resize", function() {
                google.maps.event.trigger(that.bigMap.getCenter(), "resize"), that.bigMap.setCenter(that.bigMap.getCenter());
            });
        }
        function initSmallMap() {
            smallMapNode && (that.smallMap = new google.maps.Map(smallMapNode, {
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
            }), that.smallMap.mapTypes.set("parksLayer", that.parksLayer), that.smallMap.setMapTypeId("parksLayer"), 
            that.smallMapCircle = new google.maps.Marker({
                icon: {
                    path: "M0,5a5,5 0 1,0 10,0a5,5 0 1,0 -10,0",
                    scale: 1,
                    fillOpacity: 1,
                    fillColor: "#607d8b",
                    strokeColor: "white",
                    strokeWeight: 2
                },
                position: new google.maps.LatLng(viewOptions.centroid.coordinates[1], viewOptions.centroid.coordinates[0])
            }), that.smallMapCircle.setMap(that.smallMap));
        }
        function initActions() {
            var directionsAction = that.utils.get(".directions-action", rootNode)[0];
            directionsAction && directionsAction.addEventListener("click", function() {
                return launchDirections();
            }, !1);
        }
        function initialize() {
            initStamenLayer(), initBigMap(), initSmallMap(), initActions(), callback(null, that);
        }
        var that = this;
        StamenSuperClassy.apply(that, arguments);
        var rootNode = that.utils.get(rootSelector)[0], bigMapNode = that.utils.get(".big-park-map", rootNode)[0], smallMapNode = that.utils.get(".small-park-map", rootNode)[0];
        return initialize(), that;
    };
});