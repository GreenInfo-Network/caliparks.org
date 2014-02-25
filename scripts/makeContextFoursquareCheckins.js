var pg = require('pg'),
    fs = require('fs');

if (!process.argv[2]) {
  console.error('You need to pass a path and filename for the output file. Like this: `command ~/Documents/myfile.json`');
  return false;
}

console.log('Making a JSON context file for Foursquare checkins...');

pg.connect('postgres://eric@localhost/eric', function(err, client, cb) {

  client.query('select array_to_json(array_agg(row_to_json(t)))from (select su_id, checkinscount from site_totals where checkinscount > 0 order by checkinscount Desc) t', function(err, response) {

    console.log('Writing file to ' + process.argv[2]);
    fs.writeFileSync(process.argv[2], JSON.stringify(response.rows[0].array_to_json), {encoding:'utf8'});

    console.log('Done.');
    process.exit();
  
  });

});