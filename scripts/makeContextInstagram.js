var sys  = require('sys'),
    exec = require('child_process').exec;

if (!process.argv[2]) {
  console.error('You need to pass a path and filename for the output file. Like this: `command ~/Documents/myfile.json`');
  return false;
}

function puts(error, stdout, stderr) { sys.puts(stdout) }

console.log('Making a JSON context file for Instagram...');

var command = "psql eric -U eric -c 'select array_to_json(array_agg(row_to_json(t)))from (select su_id, instagramphotos from site_totals where instagramphotos > 0 order by instagramphotos) t' > " + process.argv[2];

exec(command, puts);

return console.log('Done.');




var pg = require('pg'),
    fs = require('fs');

if (!process.argv[2]) {
  console.error('You need to pass a path and filename for the output file. Like this: `command ~/Documents/myfile.json`');
  return false;
}

console.log('Making a JSON context file for Flickr...');

pg.connect('postgres://eric@localhost/eric', function(err, client, cb) {

  client.query('select array_to_json(array_agg(row_to_json(t)))from (select su_id, instagramphotos from site_totals where instagramphotos > 0 order by instagramphotos Desc) t', function(err, response) {

    console.log('Writing file to ' + process.argv[2]);
    fs.writeFileSync(process.argv[2], JSON.stringify(response.rows), {encoding:'utf8'});

    console.log('Done.');
    process.exit();
  
  });

});