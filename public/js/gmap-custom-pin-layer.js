//
// Custom map tile layer for Google Maps V3
//
// Created by Stamen Design in 2014
//
define(["require","exports","module","stamen-super-classy"], function(
  require,
  exports,
  module,
  StamenSuperClassy
) {

  "use strict";

  module.exports=function(map, config) {

    var self     = this,
    pinCache = {},
    data     = null;

    //
    //
    //
    StamenSuperClassy.apply(self, arguments);

    //
    // Check to make sure GeoJSON has the bits we expect
    //
    function checkGeoJSON(geojsonData) {

      if (
        geojsonData &&
        geojsonData.type === "FeatureCollection" &&
        typeof geojsonData.features === "object" &&
        geojsonData.features.length > 0 &&
        geojsonData.features[0].type === "Feature" &&
        geojsonData.features[0].geometry.type === "Point"
      ) {
        return true;
      } else {
        return false;
      }
    }

    //
    // Composites a unique ID for a feature using it"s
    // type, lat, and long
    //
    function generateIdForGeoJSONFeature(feature) {
      return feature.properties.Type+parseInt(feature.geometry.coordinates[0]*1000, 10)+parseInt(feature.geometry.coordinates[1]*100*100, 10);
    }

    //
    // Makes a google marker and adds it to the map.
    //
    function makeMarker(location, title, data) {
      return new google.maps.Marker({
        position: location,
        map: map,
        title: title
      });
    }

    //
    // Refreshes data in the layer
    //
    function updateData(newData) {

      if (!checkGeoJSON(newData || config.data)) {
        return false;
      }

      data = config.data;

      self.fire("data-updated");

    }

    function getData(filters) {

      var dataCopy = JSON.parse(JSON.stringify(data));

      if (filters && Object.keys(filters).length) {

        dataCopy.features = data.features.filter(function(dataItem) {

          var ok = true;

          Object.keys(filters).forEach(function(key) {

            if (filters[key].indexOf(dataItem.properties[key]) < 0) {
              ok = false;
            }
          });

          return ok;

        });
        return dataCopy;
      } else {
        return data;
      }
    }

    function setMarkerListener(type, data) {
      google.maps.event.addListener(data.pin, type, function() {
        self.fire("marker-" + type, {
          marker : data
        });
      });
    }

    //
    // Filter GeoJSON Data
    //
    function filterGeoJSON(data, filter) {

      function thisFilter(item) {
        var found = false;

        config.filter[i].forEach(function(afilter) {
          if (item.properties[i] === afilter) {
            found = true;
          }
        });

        return found;

      }

      var filteredData = data;
      for(var i in config.filter) {
        if (config.filter.hasOwnProperty(i) && config.filter[i].length) {
          filteredData = {
            type     : "FeatureCollection",
            features : filteredData.features.filter(thisFilter)
          };
        }
      }

      return filteredData;
    }

    //
    // Draws all markers and adds them to the pin cache
    //
    function drawMarkers() {

      var id, filteredData;

      filteredData = data;

      if (config.filter) {

        filteredData = filterGeoJSON(filteredData, config.filter);

      }

      filteredData.features.forEach(function(feature) {

        id = generateIdForGeoJSONFeature(feature);

        feature.id = id;

        if (!pinCache[id]) {

          pinCache[id] = {
            feature : feature,
            pin     : makeMarker(
              new google.maps.LatLng(
                parseFloat(feature.geometry.coordinates[1]),
                parseFloat(feature.geometry.coordinates[0])),
                feature.properties.Type,
                feature
              ),
              selected : null
            };

            setMarkerListener("click", pinCache[id]);
            setMarkerListener("mouseover", pinCache[id]);
            setMarkerListener("mouseout", pinCache[id]);

          }

        });
      }

      function setMarkersAsSelected(markersArray) {
        (markersArray || data.features).forEach(function(feature) {

          pinCache[feature.id].selected = false;

          pinCache[feature.id].pin.setIcon({
            size:new google.maps.Size(20,32),
            url:"http://www.googlemapsmarkers.com/v1/5a948e/"
          });

          pinCache[feature.id].pin.setZIndex(+1);

        });

        self.fire("select-markers");

        return true;
      }

      function clearMarkerSelections(markersArray) {

        (markersArray || data.features).forEach(function(feature) {

          pinCache[feature.id].selected = false;

          pinCache[feature.id].pin.setIcon({
            size:new google.maps.Size(20,32),
            url:"http://www.googlemapsmarkers.com/v1/0c617f/"
          });

          pinCache[feature.id].pin.setZIndex(-1);

        });

        self.fire("clear-marker-selections");

        return true;
      }

      //
      // Remove all pins from the map and clear the tile
      // cache
      //
      function clearMarkers() {

        for (var i in pinCache) {
          if (pinCache.hasOwnProperty(i)) {
            pinCache[i].pin.setMap(null);
            delete pinCache[i];
          }
        }

      }

      //
      // Public interface
      //
      self.getData               = getData;
      self.updateData            = updateData;
      self.drawMarkers           = drawMarkers;
      self.clearMarkers          = clearMarkers;
      self.setMarkersAsSelected  = setMarkersAsSelected;
      self.clearMarkerSelections = clearMarkerSelections;


      //
      // Init
      //
      self.on("data-updated", function() {
        clearMarkers();
        drawMarkers();
      });

      updateData();

      return self;

  };

});
