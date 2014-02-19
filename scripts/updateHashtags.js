//
// Hashtag updater
//
// This script goes through CPAD and makes unique hashtags from the park names
// this involves some pretty fun ocean boiling to hold on to your butts... here
// we go...
//


var prompt            = require('prompt'),
    GoogleSpreadsheet = require("google-spreadsheet"),
    pg                = require('pg'),
    progressBar       = require('progress-bar'),
    colors            = require('colors'),
    fs                = require('fs'),
    progressBarPg     = progressBar.create(process.stdout),
    progressBarGdocs  = progressBar.create(process.stdout);

console.log('Pulling CPAD data from Geo.local'.blue);
progressBarPg.update(.25);

var hashtags     = {},
    outputcount  = 0,
    tooshort     = {},
    rows_hash    = {},
    dup_check    = {},
    dup_count    = 0,
    edited_count = 0,
    id_hash      = {},
    testTag;

function trim (str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function unboring (str) {
  return str.toUpperCase()

            //Singluar replacements
            .replace('STATE PARK', '')
            .replace('NATIONAL RECREATION AREA', '')
            .replace('NATIONAL MONUMENT', '')
            .replace('NATIONAL PARK', '')
            .replace('NATIONAL WILDLIFE REFUGE', '')
            .replace('NATIONAL PRESERVE', '')
            .replace('NATIONAL HISTORIC SITE', '')
            .replace('STATE RECREATION AREA', '')
            .replace('PARK', '')
            .replace('AREA', '')
            .replace('CITY', '')
            .replace('BUREAU', '')
            .replace('DEPARTMENT', '')
            .replace('MANAGMENT', '')
            .replace('OTHER STATE', 'STATE')
            .replace('OTHER FEDERAL', 'FEDERAL')
            .replace('OF', '')
            .replace('THE', '')

            //Global replacements
            .split('A').join('')
            .split('E').join('')
            .split('I').join('')
            .split('O').join('')
            .split('U').join('')
            .split(')').join('')
            .split('(').join('')
            .split('&').join('')
            .split('-').join('')
            .split('.').join('')
            .split('/').join('')
            .split('\'').join('')
            .trim();
}

pg.connect('postgres://openspaces@localhost/openspaces', function(err, client, cb) {

  client.query('select * from cpad_2013b_superunits_ids', function(err, response) {

    //
    // Go through each record and apply filter
    //
    response.rows.forEach(function(park) {

      rows_hash[park.su_id] = park;

      //
      // Filter out redundantly common strings in open spaces
      // also, removing vouels is a nice shortcut, no?
      //
      var cleaned_array = unboring(park.unit_name).split(' '),
          wordcount;

      //
      // Get rid of empty spaces and numbers. We will use numbers later
      // to remove duplicates but the hastag will be better if it is
      // alphabetic at this stage
      //
      var trimmed_array = cleaned_array.filter(function(word) {
        return ( 
            !parseInt(word, 10) &&
            word.length
        );
      });

      //
      // Hashtags are four charicters, there are different rules for each
      // different letter count
      //
      wordcount = trimmed_array.length;

      hashtags[park.su_id] = '';

      if (wordcount === 1) {

        hashtags[park.su_id] += trimmed_array[0].substring(0, 4);
      
      } else if (wordcount === 2) {

        hashtags[park.su_id] += trimmed_array[0].substring(0, 2);
        hashtags[park.su_id] += trimmed_array[1].substring(0, 2);

      } else if (wordcount === 3) {

        hashtags[park.su_id] += trimmed_array[0].substring(0, 2);
        hashtags[park.su_id] += trimmed_array[1].substring(0, 1);
        hashtags[park.su_id] += trimmed_array[2].substring(0, 1);

      } else if (wordcount === 4) {

        hashtags[park.su_id] += trimmed_array[0].substring(0, 1);
        hashtags[park.su_id] += trimmed_array[1].substring(0, 1);
        hashtags[park.su_id] += trimmed_array[2].substring(0, 1);
        hashtags[park.su_id] += trimmed_array[3].substring(0, 1);

      } else if(wordcount > 3) {

        hashtags[park.su_id] += trimmed_array[0].substring(0, 1);
        hashtags[park.su_id] += trimmed_array[1].substring(0, 1);
        hashtags[park.su_id] += trimmed_array[2].substring(0, 1);
        hashtags[park.su_id] += trimmed_array[3].substring(0, 1);

      }

      //console.log(hashtags[park.su_id]);
      if (hashtags[park.su_id].length < 4) {
        tooshort[park.su_id] = hashtags[park.su_id];
      }

      dup_check[hashtags[park.su_id]] = 0;

    });

    progressBarPg.update(.50);

    Object.keys(tooshort).forEach(function(key) {
      //unboring(rows_hash[key].agncy_name).split(' ').join('').substring(0,4-tooshort[key].length);
      hashtags[key] = unboring(rows_hash[key].agncy_name).split(' ').join('').substring(0,4-tooshort[key].length) + tooshort[key];

      dup_check[hashtags[key]] = 0;
    });

    progressBarPg.update(.75);

    Object.keys(hashtags).forEach(function(key) {

      testTag = hashtags[key];

      if (dup_check[hashtags[key]]) {
        hashtags[key] = testTag + dup_check[hashtags[key]];
        dup_count++;
      }

      id_hash[hashtags[key]] = key;

      dup_check[testTag]++;

    });

    progressBarPg.update(1);
    console.log('');

    console.log(('Generated ' + Object.keys(hashtags).length + ' hashtags with ' + dup_count + ' duplicates incrementally numbered').green);
    console.log(' ');

    cb();

    console.log('Checking google doc for overrides'.blue);
    console.log('This takes a while'.yellow);
    
    progressBarGdocs.update(.25);
    var my_sheet = new GoogleSpreadsheet('0AnaQ5qurLjURdGtNU2dYbldIOHFXc2RfUUVya3lNaGc');
    //https://docs.google.com/a/stamen.com/spreadsheet/ccc?key=0AnaQ5qurLjURdGtNU2dYbldIOHFXc2RfUUVya3lNaGc&usp=drive_web#gid=0


    my_sheet.getRows(1, function(err, row_data){

      progressBarGdocs.update(.50);

      row_data.forEach(function(row) {

        if (err) {
          console.error('Error with Google Doc response', err);
        }

        if (row.edited.length && id_hash[row.hashtag.substring(1)]) {
          hashtags[id_hash[row.hashtag.substring(1)]] = row.edited;
          edited_count++;
        }


      });

      progressBarGdocs.update(1);
      console.log(' ');
      console.log((edited_count + ' tags have been overridden by the Google Doc').green);
      console.log(' ');

      dup_count = 0;
      dup_check = {};
      Object.keys(hashtags).forEach(function(key) {

        testTag = hashtags[key];

        if (dup_check[hashtags[key]]) {
          dup_count++;
        }

        dup_check[testTag] = true;

      });

      if (dup_count) {
        console.log(('Warning: ' + dup_count + ' duplicates were introduced by the google doc').yellow);
      } else {
        console.log(('Sweet! you have ' + hashtags.length + ' unique hashtags').green);
      }

      prompt.start();

      console.log(' ');
      console.log('If you wan\'t these written to disk say "yes" in the Approval prompt'.blue);
      prompt.get(['Approval'], function (err, result) {

        if (result.Approval == 'yes') {

          fs.writeFileSync('../public/data/hastagsBySuId.json', JSON.stringify(hashtags), {encoding:'utf8'});
          fs.writeFileSync('../public/data/suIdsByHashtag.json', JSON.stringify(id_hash), {encoding:'utf8'});

          console.log('Okay, Done'.green);

        } else {

          console.log('Okay, I won\'t do anything. Seeya.');

        }

        process.exit();

      });

    });    

  });

});