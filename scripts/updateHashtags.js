var GoogleSpreadsheet = require("google-spreadsheet"),
    progressBar       = require('progress-bar').create(process.stdout);

console.log('Pulling latest hashtags from Google Docs');

progressBar.update(.25);

var my_sheet = new GoogleSpreadsheet('0AnaQ5qurLjURdGtNU2dYbldIOHFXc2RfUUVya3lNaGc');
//https://docs.google.com/a/stamen.com/spreadsheet/ccc?key=0AnaQ5qurLjURdGtNU2dYbldIOHFXc2RfUUVya3lNaGc&usp=drive_web#gid=0


my_sheet.getRows( 1, function(err, row_data){ 

  if (err) {
    progressBar.update(.75);
    console.error('Error with Google Doc response', err);
  }

    progressBar.update(.50);

    console.log( 'pulled in '+row_data.length + ' rows ', row_data)


    progressBar.update(.25);
});