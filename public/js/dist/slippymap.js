define([ "require", "exports", "module", "stamen-super-classy", "gmap-custom-tile-layer", "gmap-custom-pin-layer" ], function(require, exports, module, StamenSuperClassy, GmapCustomTileLayer, GmapCustomPinLayer) {
    "use strict";
    module.exports = function(rootSelector, options, callback) {
        function geoJSONBBoxToGoogleBounds(GeoJSONBBoxPolygon) {
            var bounds = new google.maps.LatLngBounds();
            return bounds.extend(new google.maps.LatLng(GeoJSONBBoxPolygon[1], GeoJSONBBoxPolygon[0])), 
            bounds.extend(new google.maps.LatLng(GeoJSONBBoxPolygon[3], GeoJSONBBoxPolygon[2])), 
            bounds;
        }
        function resize() {
            google.maps.event.trigger(that.map, "resize"), that.map.fitBounds(geoJSONBBoxToGoogleBounds(that.pinLayer.getData().bbox));
        }
        function getBounds() {
            var gbounds = that.map.getBounds().toUrlValue().split(",").map(parseFloat);
            return [ gbounds[1], gbounds[0], gbounds[3], gbounds[2] ];
        }
        function setCenter(point) {
            that.map.setCenter({
                lat: point.coordinates[1],
                lng: point.coordinates[0]
            });
        }
        function initStamenLayer() {
            return that.parksLayer = new GmapCustomTileLayer({
                tilePath: "http://{s}.map.parks.stamen.com/{z}/{x}/{y}{r}.png",
                size: 256,
                r: window.devicePixelRatio && window.devicePixelRatio > 1 ? "@2x" : ""
            }), that.parksLayer;
        }
        function initmap() {
            var center = defaultCenter;
            options.centroid && (center = [ options.centroid.coordinates[1], options.centroid.coordinates[0] ]), 
            that.map = new google.maps.Map(rootNode, {
                mapTypeControl: !1,
                center: new google.maps.LatLng(center[0], center[1]),
                zoom: 7,
                scrollwheel: !1,
                disableDefaultUI: !1,
                panControl: !1,
                streetViewControl: !0,
                zoomControlOptions: {
                    style: 1,
                    position: 4
                },
                mapTypeControloptions: {
                    mapTypeIds: [ "parksLayer" ]
                }
            }), options.polygon && (that.map.data.setStyle(options.polygonOptions || {
                fillColor: "rgba(2, 122, 187,.2)",
                strokeColor: "rgba(2, 122, 187,.7)",
                strokeWeight: 1
            }), that.map.data.addGeoJson(options.polygon)), that.map.mapTypes.set("parksLayer", that.parksLayer), 
            that.map.setMapTypeId("parksLayer");
            var pinLayer = new GmapCustomPinLayer(that.map, {
                data: options.data,
                featureIdProperty: "superunit_id"
            });
            that.pinLayer = pinLayer, options.contextBounds && that.map.fitBounds(geoJSONBBoxToGoogleBounds(options.contextBounds)), 
            that.updateData = pinLayer.updateData, google.maps.event.addListener(that.map, "bounds_changed", function() {
                that.fire("bounds-changed", {
                    googleBounds: that.map.getBounds()
                });
            }), google.maps.event.addListener(that.map, "idle", function() {
                that.fire("idle");
            }), google.maps.event.addDomListener(window, "resize", function() {
                google.maps.event.trigger(that.map.getCenter(), "resize"), that.map.setCenter(that.map.getCenter());
            }), google.maps.event.addDomListener(that.map.getStreetView(), "visible_changed", function() {
                that.fire("street-view-toggle", {
                    visible: that.map.getStreetView().getVisible()
                });
            }), pinLayer.on("marker-click", function(e) {
                that.fire("marker-click", e.caller);
            }), pinLayer.on("marker-mouseover", function(e) {
                that.fire("marker-mouseover", e.caller);
            }), pinLayer.on("marker-mouseout", function(e) {
                that.fire("marker-mouseout", e.caller);
            }), pinLayer.on("select-markers", function(e) {
                that.fire("select-markers", e.caller);
            });
        }
        function initialize() {
            initStamenLayer(), initmap(), that.on("ready", function() {
                callback(null, that);
            });
        }
        var that = this, defaultCenter = [ 37.76, -122.41 ];
        StamenSuperClassy.apply(that, arguments);
        var rootNode = that.utils.get(rootSelector)[0];
        return that.resize = resize, that.getBounds = getBounds, that.setCenter = setCenter, 
        initialize(), callback && callback(null, that), that;
    };
});