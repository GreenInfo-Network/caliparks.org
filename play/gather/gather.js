/* redo, because i don't understand callbacks */

var fs = require("fs"),
    util = require("util");
var async = require("async"),
    connect = require("connect"),
    d3 = require("d3"),
    pg = require("pg"),
    request = require("request");

// postgres
var client = new pg.Client({
  user: "ggnpc",
  password: "",
  database: "ggnpc",
  host: "geo.local",
  port: 5432
});
client.connect();

console.log("[*] connected to db");

function wkt2bbox(row) {
  // WKT envelope string -> bbox string. sorry.
  var envelope = row.envelope.replace(/[A-Z\(\)]+/g, ""),
      envelope = envelope.split(",").map(function(e) { return e.split(" "); }),
      envelope = [envelope[0], envelope[2]].join();

  return envelope;
}

function hasMorePages(body) {
  return body.photos.page < body.photos.pages;
}

function getFlickrData(bbox, page, photos, callback) {
  if (arguments.length < 4) {
    callback = arguments[arguments.length-1];
    page = 1;
    photos = [];
  }

  console.log("getting page", page);
  var url = {
    url: "http://api.flickr.com/services/rest",
    qs: {
      method: "flickr.photos.search",
      api_key: "f17cc9d3f73f0b45640451a6d3c1946d",
      bbox: bbox,
      has_geo: 1,
      extras: "geo,tags",
      min_taken_date: ~~(Date.now() / 1000) - 60*60*24*365,
      format: "json",
      nojsoncallback: 1,
      page: page,
      per_page: 250   // max = 250 for geo queries
  };
  request(url, function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      
      photos = photos.concat(body.photos);

      if (hasMorePages(body)) {
        console.log("found another page for", bbox , ":", body.photos.page, "out of", body.photos.pages);
        console.log("page:", page);
        return getFlickrData(bbox, page + 1, photos, callback);

      } else {
        return callback(null, photos);  // callback(err, result)
      }
    
    } else {
      return callback(error);
    }
  });

}

/**
 * Fetch media associated with a specified park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, media[]) Called with a list of media associated with a park.
 */
 // add error checking at every level
var getFlickrPhotosForPark = function(park, callback) {
  return getBoundingBoxForPark(park, function(err, bbox) {
    return getFlickrData(bbox, function(err, photos) {
      return callback(null, photos);  // everything finished
    });
  });
};

/**
 * Fetch media associated with a specified park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, media[]) Called with a list of media associated with a park.
 */
var getInstagramPhotosForPark = function(park, callback) {
  return getBoundingBoxForPark(park, function(err, bbox) {
    return getInstagramData(bbox, function(err, photos) {
      return callback(null, photos);
    });
  });
};

/**
 * Get the bounding box for a park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, coords) Called with an array containing the park's bounding box.
 */
var getBoundingBoxForPark = function(park, callback) {
  // connect to pg
  // query pg
  // callback with parsed bbox
  var query = ["select unit_name, st_astext(st_envelope(st_transform(st_buffer(st_envelope(geom), 500), 4326)))",
               "as envelope from cpad_units where ogc_fid = $1 limit 1"].join("");

  return client.query(query, [park.id], function(err, res) {
    if (err) {
      throw err;
    }
    var envelope = wkt2bbox(res.rows[0]);
    client.end();
    return callback(null, envelope);

  });


};

getFlickrPhotosForPark({
  id: 9850
}, function(err, media) {
  console.log("These photos were taken in South Yuba River State Park: %j", media.length);
});

// [1,2,3].forEach(function(x) {
//   return; // equivalent to callback() using async
// });





