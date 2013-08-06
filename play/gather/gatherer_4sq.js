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

function wkt2swne(row) {
  // WKT envelope string -> sw,ne string. sorry.
  var envelope = row.envelope.replace(/[A-Z\(\)]+/g, ""),
      envelope = envelope.split(",").map(function(e) { return e.split(" "); }),
      sw = envelope[0].reverse().join(),
      ne = envelope[2].reverse().join();

  // 4sq requires lat,lon not lon,lat. 

  return [sw, ne];
}

function foursqThatFuckr(sw, ne, callback) {
  return request({
    url: "https://api.foursquare.com/v2/venues/search",
    qs: {
      intent: "browse",
      limit: 50,
      sw: sw,
      ne: ne,
      client_id: "FD34PSNKBUM51D3ATKTMO0G5OTS4YJSWQJ3PA4MLQRZVWELZ",
      client_secret: "MTABKIIFVMV5VNOEXCNQSZC1VZXLJHQZYCWUSIJPNOUOGRTE",
      v:"20130805"
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

    if (!err && response.statusCode != 200) {
      try {
        return callback(null, JSON.parse(body));
      } catch (e) {
        // if JSON parsing fails
        return callback(e);
      }
    }

    return callback();
  });
}

function outputVenues(venues) {
  fs.writeFileSync('dump.json', JSON.stringify(venues));
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

  var envelopes = res.rows.map(wkt2swne);
  return async.mapLimit(envelopes, 1, function(envelope, cb) {
    var sw = envelope[0], 
        ne = envelope[1];
    return foursqThatFuckr(sw, ne, cb);
  }, function(err, bodies) {
    outputVenues(bodies);
    process.exit();
  });
});
