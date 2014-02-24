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