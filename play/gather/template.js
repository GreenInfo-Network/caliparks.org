var connect = require('connect'),
    pg = require('pg'),
    fs = require('fs');

// postgres
var client = new pg.Client({
  user: 'ggnpc',
  password: '',
  database: 'ggnpc',
  host: 'geo.local',
  port: 5432
});
client.connect();

console.log("[*] connected to db");

// fs.exists("json/city_lookup.json", function(exists) {
//   if (!exists) {
//     var query = "select city_code, lat, long from city_lookup;";
//     client.query(query, function(err, result) {
//       var out = {};
//       result.rows.forEach(function(row) {
//         out[row.city_code] = [parseInt(Math.round(row.long), 10), parseInt(Math.round(row.lat), 10)];
//       });
//       // write file
//       fs.writeFile("json/city_lookup.json", JSON.stringify(out), function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("[*] saved city lookup file");
//         }
//       });
//     });
//   } else {
//     console.log("[*] lookup exists");
//   }
// });

var pending = artists.length,
    results = [];
artists.forEach(function(artist) {
  // query db
  var query = "";

  console.log("querying " + artist);

  client.query(query, function(err, result) {
    // 
    results.push({name: artist, values: result.rows});
    console.log("done " + artist);

    if (--pending === 0) {
      // write file
      fs.writeFile("all-listens.json", JSON.stringify(results), function(err) {
          if (err) {
              console.log(err);
          } else {
              console.log("saved file");
          }
      });
    }
  });
});