'use strict';

var colors = require('colors'),
    fs     = require('fs');

var uniques = {},
    config, hipcampData;

console.log('Extracting unique activities from Hipcamp'.blue);

//
// Load config
//
try {
  config = require('./config.json');
} catch (err) {
  console.error(err);
  process.exit(1);
}

//
// Load Hipcamp data
//
try {
  hipcampData = require(config.hipcamp.activities);
} catch (err) {
  console.error(err);
  process.exit(1);
}

hipcampData.forEach(function(park) {

  for (var i in park) {
    if (park.hasOwnProperty(i)) {
      uniques[i] = true;
    }
  }

});

fs.writeFile('../output/uniqueActivities.json',JSON.stringify(Object.keys(uniques)),{'encoding':'utf8'},function(err) {

  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Done'.green);
  process.exit(0);

});
