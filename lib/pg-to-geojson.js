"use strict";

var geojsonExtent = require('geojson-extent');

function GeoFeatureCollection(postGisRows, options) {

  options = options || {geometryColumn:'centroid'};

  var features = [],
  collection;

  (postGisRows || []).forEach(function(row) {
    features.push(new GeoFeature(row, options));
  });

  return geojsonExtent.bboxify({"type": "FeatureCollection","features": features});
}

function GeoFeature(postGisRow, options) {

  var rowObject;

  try {
    rowObject = JSON.parse(postGisRow[options.geometryColumn||'centroid']);
  } catch (err) {
    rowObject = [];
  }

  options = options || {geometryColumn:'centroid'};

  if (options.excludeProperties) {
    options.excludeProperties.forEach(function(key) {
      delete postGisRow[key];
    });
  }

  return geojsonExtent.bboxify({"type": "Feature", "geometry": rowObject, "properties": postGisRow});
}

module.exports = {
  GeoFeatureCollection : GeoFeatureCollection,
  GeoFeature           : GeoFeature
}
