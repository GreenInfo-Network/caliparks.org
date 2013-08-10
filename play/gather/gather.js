/* redo, because i don't understand callbacks */

var fs = require("fs"),
    util = require("util");
var async = require("async"),
    connect = require("connect"),
    d3 = require("d3"),
    pg = require("pg"),
    request = require("request");

var startPostgresClient = function(callback) {
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
  callback(null, client);
}; 

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

  // console.log("[*] getting page", page);
  console.log("[*] getting first page");
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
    }
  };
  request(url, function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      
      photos = photos.concat(body.photos.photo);

      // if (hasMorePages(body)) {
      //   console.log("[*] found another page for", bbox , ":", body.photos.page, "out of", body.photos.pages);
      //   console.log("[*] current page:", page);
      //   return getFlickrData(bbox, page + 1, photos, callback);

      // } else {
        return callback(null, photos);  // callback(err, result)
      // }
    
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
var getFlickrPhotosForPark = function(client, park, callback) {
  // return startPostgresClient(function(err, client) {
    return getBoundingBoxForPark(client, park, function(err, bbox) {
      return getFlickrData(bbox, function(err, photos) {
        return callback(null, photos);  // everything finished
      });
    });
  // });
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
var getBoundingBoxForPark = function(client, park, callback) {
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
    // client.end();
    return callback(null, envelope);

  });
};

var noop = function() {};

var writeDataToFile = function(filename, data, callback) {
  callback = callback || noop;

  fs.writeFile(filename, JSON.stringify(data, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("[*] data written to file", filename);
    }
    callback(err);
  });
};

var getParksDataFromPostgres = function(client, limit, callback) {
  if (arguments.length < 3) {
    callback = arguments[arguments.length-1];
    limit = 500;
  }
  // var query = ["select ogc_fid as id, unit_name as name, gis_acres as size from cpad_units ", 
  //              "where unit_name like '% State Park' order by size desc limit " + limit].join("");
  var query = ["select ogc_fid as id, unit_name as name, gis_acres as size from cpad_units ", 
               "where unit_name not like 'BLM' order by size desc limit " + limit].join("");
  client.query(query, function(err, res) {
    if (err) {
      throw err;
    }
    var parks = res.rows.map(function(row) { 
      return {
        id: row.id, 
        name: row.name, 
        size: ~~row.size
      }; 
    });
    callback(null, parks);
  });
};

var getFlickrPhotosForAllParks = function() {
  return startPostgresClient(function(err, client) {
    return getParksDataFromPostgres(client, 1000, function(err, parks) {
      async.eachLimit(parks, 1, function(park, next) {
        fs.exists("data/" + park.id + ".json", function(exists) {
          if (!exists) {
            getFlickrPhotosForPark(client, park, function(err, media) {
              console.log("[*] got", media.length, "photos for", park.name);
              writeDataToFile("data/" + park.id + ".json", media, next);
            });
          } else {
            console.log("[*] park " + park.name + " already exists. skipping.");
             next();
          }
        });
      }, function() { 
        console.log("[*] done!");
        client.end(); 
      });
    });
  });
};

var main = function() {
  getFlickrPhotosForAllParks();
  
};

main();

// [1,2,3].forEach(function(x) {
//   return; // equivalent to callback() using async
// });


