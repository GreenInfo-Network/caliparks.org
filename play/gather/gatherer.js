var fs = require("fs"),
    util = require("util");
var async = require("async"),
    connect = require("connect"),
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

function flickrThatFuckr(bbox, page, callback) {
  if (arguments.length === 2) {
    callback = arguments[arguments.length - 1];
    page = 1;
  }

  return request({
    url: "http://api.flickr.com/services/rest",
    qs: {
      method: "flickr.photos.search",
      api_key: "ad1c3a9c8b70d30f564c0e84ac09b9bb",
      bbox: bbox,
      extras: "geo,tags",
      min_taken_date: ~~(Date.now() / 1000) - 60*60*24*365,
      format: "json",
      nojsoncallback: 1
    }
  }, function (err, response, body) {
    if (err) {
      return callback(err);
    }

    if (!err && response.statusCode == 200) {
      try {
        return callback(null, JSON.parse(body));
      } catch (e) {
        // if JSON parsing fails
        return callback(e);
      }
    }

    // TODO handle non-200 response codes
    return callback();
  });
}

var parks = [
  {id: 9850, name: "South Yuba River State Park"}, 
  {id: 7891, name: "Devils Postpile National Monument"}
];
var ids = parks.map(function(d) { return d.id; }).join(),
    pending = parks.length;
var query = util.format("select unit_name, st_astext(st_envelope(st_transform(st_buffer(st_envelope(geom), 500), 4326))) as envelope from cpad_units where ogc_fid in (%s)", ids);

client.query(query, function(err, res) {
  if (err) {
    throw err;
  }

  var envelopes = res.rows.map(wkt2bbox);
  return async.mapLimit(envelopes, 1, function(envelope, cb) {
    return flickrThatFuckr(envelope, cb);
  }, function(err, bodies) {
    console.log("%j", bodies);
    process.exit();
  });
});
