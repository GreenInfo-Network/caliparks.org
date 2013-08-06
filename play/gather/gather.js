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

function getFlickrData() {
  var url = "";
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
  console.log(envelopes);
});