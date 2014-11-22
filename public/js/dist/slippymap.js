define([ "require", "exports", "module", "stamen-super-classy", "gmap-custom-tile-layer", "gmap-custom-pin-layer" ], function(require, exports, module, StamenSuperClassy, GmapCustomTileLayer, GmapCustomPinLayer) {
    "use strict";
    module.exports = function(rootSelector, options, callback) {
        function initStamenLayer() {
            return that.parksLayer = new GmapCustomTileLayer({
                tilePath: "http://{s}.map.parks.stamen.com/{z}/{x}/{y}.png",
                size: 256
            }), that.parksLayer;
        }
        function initBigMap() {
            that.bigMap = new google.maps.Map(rootNode, {
                mapTypeControl: !1,
                streetViewControl: !1,
                center: new google.maps.LatLng(37.76, -122.41),
                zoom: 15,
                scrollwheel: !1,
                disableDefaultUI: !1,
                panControl: !1,
                zoomControlOptions: {
                    style: 1,
                    position: 4
                },
                mapTypeControloptions: {
                    mapTypeIds: [ "parksLayer" ]
                }
            }), that.bigMap.mapTypes.set("parksLayer", that.parksLayer), that.bigMap.setMapTypeId("parksLayer"), 
            setTimeout(function() {
                new GmapCustomPinLayer(that.bigMap, {
                    data: {
                        type: "FeatureCollection",
                        features: [ {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [ 102, .5 ]
                            },
                            properties: {
                                prop0: "value0"
                            }
                        } ]
                    }
                });
            }, 1e3), google.maps.event.addDomListener(window, "resize", function() {
                google.maps.event.trigger(that.bigMap.getCenter(), "resize"), that.bigMap.setCenter(that.bigMap.getCenter());
            });
        }
        function initialize() {
            initStamenLayer(), initBigMap(), that.on("ready", function() {
                callback(null, that);
            });
        }
        var that = this;
        StamenSuperClassy.apply(that, arguments);
        var rootNode = that.utils.get(rootSelector)[0];
        return console.log(options), initialize(), that;
    };
});