"use strict";

var async = require("async"),
    env = require("require-env"),
    pg = require("pg"),
    request = require("request");

var cells = require("./cells");

function hasMorePages(body) {
  return body.photos.page < body.photos.pages;
}

function getData(bbox, page, photos, callback) {
  if (arguments.length < 4) {
    callback = arguments[arguments.length-1];
    page = 1;
    photos = [];
  }

  console.log("[*] getting page", page);

  // TODO safe_search: 1
  // TODO content_type: 1
  // TODO media: photos
  var url = {
    url: "https://api.flickr.com/services/rest",
    qs: {
      method: "flickr.photos.search",
      api_key: env.require("FLICKR_CLIENT_ID"),
      bbox: bbox,
      has_geo: 1,
      extras: "geo,tags,date_upload,date_taken,owner_name,description,license,url_s,url_m,url_n,url_z,url_c,url_l,url_o",
      min_taken_date: ~~(Date.now() / 1000) - 60*60*24*365*30,
      //min_taken_date: ~~(Date.now() / 1000) - 60*60*24*365,
      format: "json",
      nojsoncallback: 1,
      page: page,
      per_page: 250   // max = 250 for geo queries
    }
  };
  request(url, function (error, response, body) {

    if (error) {
      return callback(error);
    }

    if (!error && response.statusCode == 200) {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return callback(err);
      }

      photos = photos.concat(body.photos.photo);

      if (hasMorePages(body) && page <= body.photos.page && page < 100) {      //Stop after 100. TODO: do this better.
        console.log("[*] found another page for", bbox , ":", body.photos.page, "out of", body.photos.pages);
        console.log("[*] current page:", page);
        return getData(bbox, page + 1, photos, callback);

      } else {
        return callback(null, photos, page);  // callback(err, result)
      }
    }

    if (!error && response.statusCode == 403) {
      console.log("caught code 403 forbidden");
      try {
        body = JSON.parse(body);
      } catch (err) {
        return callback(err);
      }

      console.log("body", body);
      return callback(body); // Return body as error
    }

    if (!error && response.statusCode != 200) {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return callback(err);
      }

      console.log("caught not 200:", body);
      return callback(body); // Return body as error
    }

    return callback();
  });
}

/**
 * Fetch media associated with a specified park.
 *
 * @param park Object{id} Park identifier.
 * @param callback Function(err, media[]) Called with a list of media associated with a park.
 */
 // add error checking at every level
var getPhotosForPark = function(park, callback) {
  // return startPostgresClient(function(err, client) {
    return getBoundingBoxForPark(park, function(err, bbox) {
      // test bounding box against existing metadata?
      return getData(bbox, function(err, photos, pages) {
        var bboxArray = bbox.split(",");
        var lngMin = bboxArray[0],
            latMin = bboxArray[1],
            lngMax = bboxArray[2],
            latMax = bboxArray[3];
        var metadata_id = saveHarvesterMetadata(park.id, latMin, lngMin, latMax, lngMax, new Date(), photos.length, pages);
        saveHarvesterResults(client, metadata_id, photos, park);
        return callback(null, photos, pages);  // everything finished
      });
    });
  // });
};

var getPhotosForBbox = function(latMin, lngMin, latMax, lngMax, callback) {
  // Need to reorder the lat/lng to match expected format of bbox
  return getData([lngMin,latMin,lngMax,latMax].join(","), function(err, photos, pages) {
/*
    var bboxArray = bbox.split(",");
    var lngMin = bboxArray[0],
        latMin = bboxArray[1],
        lngMax = bboxArray[2],
        latMax = bboxArray[3];
*/
    var length = photos ? photos.length : 0;
    var metadata_id = saveHarvesterMetadata(null, latMin, lngMin, latMax, lngMax, new Date(), length, pages);
    // TODO metadata_id doesn't mean anything right now
    saveHarvesterResults(metadata_id, photos, null);
    return callback(null, photos, pages);  // everything finished
  });
};

var saveHarvesterMetadata = function(park_id, latMin, lngMin, latMax, lngMax, timestamp, count, pages) {
  var query = "insert into flickr_metadata (su_id, latmin, lngmin, latmax, lngmax, date, count, pages, the_geom) values ($1, $2, $3, $4, $5, $6, $7, $8, ST_MakeEnvelope($3,$2,$5,$4,4326))";

  return pg.connect(env.require("DATABASE_URL"), function(err, client, done) {
    if (err) {
      console.warn(err.stack);
    }

    return client.query(query, [park_id, latMin, lngMin, latMax, lngMax, timestamp, count, pages], function(err, res) {
      done();

      if (err) {
        console.log("harvesterMetadata error", err);
        throw err;
      }
      return 0; // TODO: change these

    });
  });

  return 1; // TODO: change these
};


var saveHarvesterResults = function(metadata_id, photos, park) {
  var query = "INSERT INTO flickr_photos (photoid, owner, secret, server, farm, title, latitude, longitude, accuracy, context, place_id, woeid, tags, dateupload, datetaken, ownername, description, license, url_o, width_o, height_o, url_largest, height_largest, width_largest, largest_size, the_geom) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, ST_SetSRID(ST_MakePoint($8, $7), 4326))";

  if (!park) {
    park = { id: null, name: null };
  }

  if (photos) photos.forEach(function(photo) {
    if (photo) {
      //console.log(photo);
      var params = [photo.id, photo.owner, photo.secret, photo.server, photo.farm, photo.title, photo.latitude, photo.longitude, photo.accuracy, photo.context, photo.place_id, photo.woeid, photo.tags, photo.dateupload, photo.datetaken, photo.ownername];
      if (photo.description.length > 0)
        params.push(photo.description._content);
      else
        params.push("");
      // Here, figure out which is the largest photo size, and use that instead of url_l. Then save largest_size, too.
      var url_largest = photo.url_s;
      var width_largest = photo.width_s;
      var height_largest = photo.height_s;
      var largest_size = "s";
      if (photo.url_m) {
        url_largest = photo.url_m;
        width_largest = photo.width_m;
        height_largest = photo.height_m;
        largest_size = "m";
      }
      if (photo.url_n) {
        url_largest = photo.url_n;
        width_largest = photo.width_n;
        height_largest = photo.height_n;
        largest_size = "n";
      }
      if (photo.url_z) {
        url_largest = photo.url_z;
        width_largest = photo.width_z;
        height_largest = photo.height_z;
        largest_size = "z";
      }
      if (photo.url_c) {
        url_largest = photo.url_c;
        width_largest = photo.width_c;
        height_largest = photo.height_c;
        largest_size = "c";
      }
      if (photo.url_l) {
        url_largest = photo.url_l;
        width_largest = photo.width_l;
        height_largest = photo.height_l;
        largest_size = "l";
      }
      params.push(photo.license, photo.url_o, photo.width_o, photo.height_o, url_largest, height_largest, width_largest, largest_size);
      return pg.connect(env.require("DATABASE_URL"), function(err, client, done) {
        if (err) {
          console.warn(err.stack);
        }

        return client.query(query, params, function(err, res) {
          done();

          if (err) {
            console.log("harvesterResults error", err.detail);
          }
        });
      });
    }
  });
};

var getPhotosForAllGridCells = function(callback) {
  return cells.getGridCells(function(err, cells) {
    async.eachLimit(cells, 1, function(cell, next) {
      getPhotosForBbox(cell.latmin, cell.lngmin, cell.latmax, cell.lngmax, function(err, media, pages) {
        var length = media ? media.length : 0;
        console.log("[*] got", length, "photos for ", cell.latmin, cell.lngmin, cell.latmax, cell.lngmax, "after", pages, "page(s)");
        next();
      });
    }, function() {
      console.log("[*] done!");
      callback();
    });
  });
};

var getPhotosForAllParks = function() {
  return getParksDataFromPostgres(client, "flickr", function(err, parks) {
    async.eachLimit(parks, 1, function(park, next) {
      getPhotosForPark(park, function(err, media, pages) {
        console.log("[*] got", media.length, "photos for", park.id, park.name, "after", pages, "page(s)");
        next();
      });
    }, function() {
      console.log("[*] done!");
    });
  });
};

module.exports = {
  getPhotosForAllGridCells: getPhotosForAllGridCells
};
