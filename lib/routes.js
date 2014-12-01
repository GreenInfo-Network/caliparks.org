
'use strict';

var dataFormatResponders = {};

function GeoFeatureCollection(postGisRows, options) {

  options = options || {geometryColumn:'centroid'};

  var features = [],
      collection;

  postGisRows.forEach(function(row) {
    features.push(new GeoFeature(row, options));
  });

  return {"type": "FeatureCollection","features": features};
}

function GeoFeature(postGisRow, options) {
  options = options || {geometryColumn:'centroid'};

  return {"type": "Feature", "geometry": JSON.parse(postGisRow[options.geometryColumn]), "properties": postGisRow};
}

dataFormatResponders['.json'] = function dataFormatResponderJSON(res, data, format, whitelist) {

  var dataOut = {};

  if (whitelist) {
    whitelist.forEach(function(item) {
      dataOut[item] = data[item];
    });
  } else {
    dataOut = data;
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    status   : 'ok',
    response : dataOut
  });
};

dataFormatResponders['.geojson'] = function dataFormatResponderJSON(res, data, format, whitelist) {

  var dataOut = {};

  if (whitelist) {
    whitelist.forEach(function(item) {
      dataOut[item] = data[item];
    });
  } else {
    dataOut = data;
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    status   : 'ok',
    response : new GeoFeatureCollection(dataOut.parks)
  });
};

dataFormatResponders['*'] = function dataFormatResponder404(res, data, format, whitelist) {
  res.status(404);
  res.render('404', {
    coverPhoto : {
      farm:9,
      server:8429,
      photoid:7492144602,
      secret:'1706ca60db',
      ownername:'Grand Canyon NPS',
      owner:'grand_canyon_nps'
    },
    appTitle : 'California Open Spaces: #BZZT'
  });
};

function dataRouteResponse(res, data, format, whitelist) {
  data.methodDescription = data.appTitle;
  delete data.appTitle;
  return dataFormatResponders[format] ? dataFormatResponders[format].apply(this, arguments) : dataFormatResponders['*'].apply(this, arguments);
}

module.exports = {
  dataFormatResponders : dataFormatResponders,
  dataRouteResponse    : dataRouteResponse
};
