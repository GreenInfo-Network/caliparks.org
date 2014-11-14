#!/usr/bin/env node
"use strict";

var path = require("path");

var escape = require("pg-escape");

var data = require(path.join(process.cwd(), process.argv.pop()));

console.log("CREATE TABLE site_hipcamp_activities (su_id integer NOT NULL UNIQUE, url text, activities text[]);");
console.log("CREATE INDEX site_hipcamp_activities_su_id_idx ON site_hipcamp_activities(su_id);");

data.forEach(function(x) {
  var activities = Object.keys(x).filter(function(k) {
    return x[k] === true;
  });

  console.log("INSERT INTO site_hipcamp_activities (su_id, url, activities) VALUES (%d, '%s', ARRAY['%s']);", x.sunmaAkaParkId, escape(x.campingUrl || ""), activities.map(escape).join("', '"));
});
