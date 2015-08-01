#!/usr/bin/env node
"use strict";

var assert = require("assert"),
    fs = require("fs"),
    path = require("path");

var escape = require("pg-escape"),
    parse = require("csv-parse");

var argv = process.argv.slice(2);

assert.equal(1, argv.length, "The name of the file to process is required.");

// var data = require(path.join(process.cwd(), process.argv.pop()));
var data = fs.readFileSync(path.join(process.cwd(), argv.pop()), {
  encoding: "utf8"
});

console.log("CREATE TABLE activities_raw (su_id integer NOT NULL UNIQUE, url text, activities text[]);");
console.log("CREATE INDEX activities_raw_su_id_idx ON activities_raw(su_id);");


// lop off the header row
var headers = data.split("\n")[0];

data = data.split("\n").slice(1).join("\n");

parse(headers, function(err, headers) {
  if (err) {
    throw err;
  }

  headers = headers.map(function(row) {
    return row.map(function(val) {
      return val.toLowerCase().replace(/[^\w]/g, "");
    });
  }).shift();

  return parse(data, function(err, rows) {
    if (err) {
      throw err;
    }

    rows = rows.map(function(row) {
      var entry = row
        .map(function(val) {
          switch (val.toLowerCase()) {
          case "true":
            return true;

          case "false":
            return false;

          default:
            return val;
          }
        })
        .map(function(val, i) {
          var retval = {};

          retval[headers[i]] = val;

          return retval;
        })
        .reduce(function(a, b) {
          Object.keys(b).forEach(function(k) {
            a[k] = b[k];
          });

          return a;
        }, {});

      var activities = Object.keys(entry).filter(function(k) {
        return entry[k] === true;
      });

      return {
        su_id: entry.suid_nma,
        campingurl: entry.campingurl,
        activities: activities
      };
    });

    rows.forEach(function(row) {
      console.log("INSERT INTO activities_raw (su_id, url, activities) VALUES (%d, '%s', ARRAY['%s']);", row.su_id, escape(row.campingurl), row.activities.map(escape).join("', '"));
    });
  });
});
