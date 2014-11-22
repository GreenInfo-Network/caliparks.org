define([ "require", "exports", "module", "stamen-super-classy" ], function(require, exports, module, StamenSuperClassy) {
    "use strict";
    module.exports = function(map, config) {
        function checkGeoJSON(geojsonData) {
            return geojsonData && "FeatureCollection" === geojsonData.type && "object" == typeof geojsonData.features && geojsonData.features.length > 0 && "Feature" === geojsonData.features[0].type && "Point" === geojsonData.features[0].geometry.type ? !0 : !1;
        }
        function generateIdForGeoJSONFeature(feature) {
            return feature.properties.Type + parseInt(1e3 * feature.geometry.coordinates[0], 10) + parseInt(100 * feature.geometry.coordinates[1] * 100, 10);
        }
        function makeMarker(location, title) {
            return new google.maps.Marker({
                position: location,
                map: map,
                title: title
            });
        }
        function updateData(newData) {
            return checkGeoJSON(newData || config.data) ? (data = config.data, void self.fire("data-updated")) : !1;
        }
        function getData(filters) {
            var dataCopy = JSON.parse(JSON.stringify(data));
            return filters && Object.keys(filters).length ? (dataCopy.features = data.features.filter(function(dataItem) {
                var ok = !0;
                return Object.keys(filters).forEach(function(key) {
                    filters[key].indexOf(dataItem.properties[key]) < 0 && (ok = !1);
                }), ok;
            }), dataCopy) : data;
        }
        function setMarkerListener(type, data) {
            google.maps.event.addListener(data.pin, type, function() {
                self.fire("marker-" + type, {
                    marker: data
                });
            });
        }
        function filterGeoJSON(data) {
            function thisFilter(item) {
                var found = !1;
                return config.filter[i].forEach(function(afilter) {
                    item.properties[i] === afilter && (found = !0);
                }), found;
            }
            var filteredData = data;
            for (var i in config.filter) config.filter.hasOwnProperty(i) && config.filter[i].length && (filteredData = {
                type: "FeatureCollection",
                features: filteredData.features.filter(thisFilter)
            });
            return filteredData;
        }
        function drawMarkers() {
            var id, filteredData;
            filteredData = data, config.filter && (filteredData = filterGeoJSON(filteredData, config.filter)), 
            filteredData.features.forEach(function(feature) {
                id = generateIdForGeoJSONFeature(feature), feature.id = id, pinCache[id] || (pinCache[id] = {
                    feature: feature,
                    pin: makeMarker(new google.maps.LatLng(parseFloat(feature.geometry.coordinates[1]), parseFloat(feature.geometry.coordinates[0])), feature.properties.Type, feature),
                    selected: null
                }, setMarkerListener("click", pinCache[id]), setMarkerListener("mouseover", pinCache[id]), 
                setMarkerListener("mouseout", pinCache[id]));
            });
        }
        function setMarkersAsSelected(markersArray) {
            return (markersArray || data.features).forEach(function(feature) {
                pinCache[feature.id].selected = !1, pinCache[feature.id].pin.setIcon({
                    size: new google.maps.Size(20, 32),
                    url: "http://www.googlemapsmarkers.com/v1/5a948e/"
                }), pinCache[feature.id].pin.setZIndex(1);
            }), self.fire("select-markers"), !0;
        }
        function clearMarkerSelections(markersArray) {
            return (markersArray || data.features).forEach(function(feature) {
                pinCache[feature.id].selected = !1, pinCache[feature.id].pin.setIcon({
                    size: new google.maps.Size(20, 32),
                    url: "http://www.googlemapsmarkers.com/v1/0c617f/"
                }), pinCache[feature.id].pin.setZIndex(-1);
            }), self.fire("clear-marker-selections"), !0;
        }
        function clearMarkers() {
            for (var i in pinCache) pinCache.hasOwnProperty(i) && (pinCache[i].pin.setMap(null), 
            delete pinCache[i]);
        }
        var self = this, pinCache = {}, data = null;
        return StamenSuperClassy.apply(self, arguments), self.getData = getData, self.updateData = updateData, 
        self.drawMarkers = drawMarkers, self.clearMarkers = clearMarkers, self.setMarkersAsSelected = setMarkersAsSelected, 
        self.clearMarkerSelections = clearMarkerSelections, self.on("data-updated", function() {
            clearMarkers(), drawMarkers();
        }), updateData(), self;
    };
});