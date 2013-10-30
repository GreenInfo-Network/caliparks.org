// Based on extractFeatures: https://gist.github.com/jkutianski/6177718

// Sample use: node geojsonSplitter.js inputfile.geojson

var path = require('path');
var fs = require('fs');
var async = require('async');
var origin = require(process.argv[2]);


async.eachLimit(origin.features, 1, function(origin_e, next) {
  //console.log(origin_e);
  var name = origin_e.properties.unit_name + " " + origin_e.properties.agncy_id;
  //console.log(name);

  var destination = {
    "type": "FeatureCollection",
    "features": []
  };
  destination.features[0] = origin_e;
  //console.log( JSON.stringify(destination));

  name = name.replace(/\'/g, '');
  name = name.replace(/\"/g, '');
  var filename = "park_outlines/" + name.replace(/\//g, '--') + ".json";
  //console.log(filename);
  fs.exists(filename, function(exists) {
    if (!exists) {
      fs.writeFile(filename, JSON.stringify(destination), function(err) {
        if(err) {
          console.log(err);
        }
      });
    } else {
      console.log("file " + filename + " already exists, skipping.");
    }
    next();
  });
}, function(err){
  console.log("end", err);
});