"use strict";

var geojsonExtent = require('geojson-extent');

function GeoFeatureCollection(postGisRows, options) {

  options = options || {geometryColumn:'centroid'};

  var features = [],
  collection;

  postGisRows.forEach(function(row) {
    features.push(new GeoFeature(row, options));
  });

  return geojsonExtent.bboxify({"type": "FeatureCollection","features": features});
}

function GeoFeature(postGisRow, options) {
  options = options || {geometryColumn:'centroid'};

  return geojsonExtent.bboxify({"type": "Feature", "geometry": JSON.parse(postGisRow[options.geometryColumn]), "properties": postGisRow});
}

module.exports = {
  GeoFeatureCollection : GeoFeatureCollection,
  GeoFeature           : GeoFeature
}
