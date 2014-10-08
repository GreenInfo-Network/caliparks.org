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

var hashtags     = {},
    outputcount  = 0,
    tooshort     = {},
    rows_hash    = {},
    dup_check    = {},
    dup_count    = 0,
    edited_count = 0,
    id_hash      = {},
    ids_to_test = [],
    testTag;

function trim (str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function startsWithVowel(str) {

  return (
    str.substring(0,1) === 'A' ||
    str.substring(0,1) === 'E' ||
    str.substring(0,1) === 'I' ||
    str.substring(0,1) === 'O' ||
    str.substring(0,1) === 'U'
  );

}

function unboring (str) {

    var scratch_array  = [],
        scratch_string = '';

    //Singluar replacements
    scratch_string = str.toUpperCase().replace('STATE PARK', '')
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
    .split(')').join('')
    .split('(').join('')
    .split('&').join('')
    .split('-').join('')
    .split('.').join('')
    .split(',').join('')
    .split('/').join('')
    .split('\'').join('')
    .trim();

    scratch_string.split(' ').forEach(function(word) {
      if(startsWithVowel(str)) {
        scratch_array.push(word);
      } else {
        scratch_array.push(word
        .split('A').join('')
        .split('E').join('')
        .split('I').join('')
        .split('O').join('')
        .split('U').join(''));
      }
    });

    return scratch_array.join(' ');
}


console.log('Checking google doc for overrides'.blue);
console.log('This takes a while'.yellow);

progressBarGdocs.update(.25);
var my_sheet = new GoogleSpreadsheet('0AvBupl6ea_d8dEpSSUQ5eDY3X3ZuTkdFeGhkSW9QOUE');
//https://docs.google.com/a/stamen.com/spreadsheet/ccc?key=0AnaQ5qurLjURdGtNU2dYbldIOHFXc2RfUUVya3lNaGc&usp=drive_web#gid=0


my_sheet.getRows(1, function(err, row_data){

  progressBarGdocs.update(.50);

  row_data.forEach(function(row) {

    if (err) {
      console.error('Error with Google Doc response', err);
    }

    if (row.hashtag.length) {
      ids_to_test.push(row.suid);
      hashtags[row.suid] = row.hashtag.substring(1);
      edited_count++;
    }


  });

  progressBarGdocs.update(1);
  console.log(' ');
  console.log((edited_count + ' override tags have been loaded from the Google Doc').green);
  console.log(' ');

  dup_count = 0;
  dup_check = {};
  dup_list = [];
  Object.keys(hashtags).forEach(function(key) {

    testTag = hashtags[key];

    if (dup_check[hashtags[key]]) {
      dup_count++;
      dup_list.push(hashtags[key]);
    }

    dup_check[testTag] = true;

  });

  if (dup_count) {
    console.log(('Warning: ' + dup_count + ' duplicates were included in the google doc').yellow);
    console.log(('Duplicates: ' + dup_list).yellow);
  } else {
    console.log(('Sweet! you have ' + Object.keys(hashtags).length + ' unique hashtags').green);
  }


  console.log('Pulling CPAD data from Geo.local'.blue);
  progressBarPg.update(.25);
  console.log('');

  pg.connect('postgres://openspaces@geo.local/openspaces', function(err, client, done) {
  //pg.connect('postgres://alan@localhost/openspaces_heroku', function(err, client, done) {
  //pg.connect('postgres://openspaces@localhost/openspaces', function(err, client, done) {

    client.query('select *, (coalesce(checkinscount, 0) + coalesce(flickrphotos, 0) + coalesce(instagramphotos, 0) + coalesce(tweets, 0)) as bestest from park_totals order by bestest desc, superunit_id;', function(err, response) {
    //client.query('select * from cpad_2013b_superunits_ids', function(err, response) {

      //
      // Go through each record and apply filter
      //
      response.rows.forEach(function(park) {

        rows_hash[park.superunit_id] = park;

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

        if (hashtags[park.superunit_id]) {

          console.log("hashtag", hashtags[park.superunit_id], "already exists for park", park.superunit_id + ",", park.unit_name);

        } else {

          ids_to_test.push(park.superunit_id);
          hashtags[park.superunit_id] = '';

          if (wordcount === 1) {

            hashtags[park.superunit_id] += trimmed_array[0].substring(0, 4);
          
          } else if (wordcount === 2) {

            hashtags[park.superunit_id] += trimmed_array[0].substring(0, 2);
            hashtags[park.superunit_id] += trimmed_array[1].substring(0, 2);

          } else if (wordcount === 3) {

            hashtags[park.superunit_id] += trimmed_array[0].substring(0, 2);
            hashtags[park.superunit_id] += trimmed_array[1].substring(0, 1);
            hashtags[park.superunit_id] += trimmed_array[2].substring(0, 1);

          } else if (wordcount === 4) {

            hashtags[park.superunit_id] += trimmed_array[0].substring(0, 1);
            hashtags[park.superunit_id] += trimmed_array[1].substring(0, 1);
            hashtags[park.superunit_id] += trimmed_array[2].substring(0, 1);
            hashtags[park.superunit_id] += trimmed_array[3].substring(0, 1);

          } else if(wordcount > 3) {

            hashtags[park.superunit_id] += trimmed_array[0].substring(0, 1);
            hashtags[park.superunit_id] += trimmed_array[1].substring(0, 1);
            hashtags[park.superunit_id] += trimmed_array[2].substring(0, 1);
            hashtags[park.superunit_id] += trimmed_array[3].substring(0, 1);

          }

          //console.log(hashtags[park.superunit_id]);
          if (hashtags[park.superunit_id].length < 4) {
            tooshort[park.superunit_id] = hashtags[park.superunit_id];
          }

        }

        dup_check[hashtags[park.superunit_id]] = 0;

      });

      progressBarPg.update(.50);

      Object.keys(tooshort).forEach(function(key) {
        //unboring(rows_hash[key].mng_agncy).split(' ').join('').substring(0,4-tooshort[key].length);
        hashtags[key] = unboring(rows_hash[key].mng_agncy).split(' ').join('').substring(0,4-tooshort[key].length) + tooshort[key];

        dup_check[hashtags[key]] = 0;
      });

      progressBarPg.update(.75);

      //
      // THIS IS WHERE DUPLICATES ARE GIVEN NUMBERS... KIND OF A BIG DEAL
      // This sorts the array so that duplicates are resolved in order
      // of superunit_id. This sort of assumes that superunit_ids will always be
      // created incrementally
      //
      //Object.keys(hashtags).sort().forEach(function(key) {
      ids_to_test.forEach(function(key) {

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

      done(); // Just to close the client connection


      prompt.start();

      console.log(' ');
      console.log('If you want these written to disk say "yes" in the Approval prompt'.blue);
      prompt.get(['Approval'], function (err, result) {

        if (result.Approval == 'yes') {

          fs.writeFileSync('../public/data/hashtagsBySuId.json', JSON.stringify(hashtags), {encoding:'utf8'});
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
