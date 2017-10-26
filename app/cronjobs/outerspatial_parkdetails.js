/*
 * populate the outerspatial_content table with supplemental park data, from OuterSpatial V2 API
 * see OUTERSPATIAL.md for additional documentation
 *
 * This is a command-line script using ES2016 imports, so is launched via babel-node
 * 
 * This being a comand-line script where performance is less important than debugging,
 * a few design considerations:
 * - the whole thing is wrapped in one giant Promise to form the lifecycle of the script
 * - pg components use pg.Client syntax and not pg.connect() syntax, as we do not need connection
 *   pooling nor persistence, and pg.connect() will hang Node after real execution has completed
 * - a synchronous version of request (sync-request) is used to ensure that the API hits are sequential
 */

//
// PACKAGES AND IMPORTS
//

import FormData from 'form-data';
import {Promise} from 'es6-promise';
import util from 'util';
import request from 'sync-request';
import pg from 'pg';

//
// CONSTANTS AND VARIABLES
//

const OPENSPATIAL_CLIENT_ID = process.env.OPENSPATIAL_CLIENT_ID;
const OPENSPATIAL_CLIENT_SECRET = process.env.OPENSPATIAL_CLIENT_SECRET;
if (! OPENSPATIAL_CLIENT_ID || ! OPENSPATIAL_CLIENT_SECRET) throw new Error("Check your .env and define OPENSPATIAL_CLIENT_ID and OPENSPATIAL_CLIENT_SECRET");

const DATABASE_URL = process.env.DATABASE_URL;
if (! DATABASE_URL) throw new Error("Check your .env and define DATABASE_URL");

const ENDPOINT_TOKEN = 'https://api.outerspatial.com/oauth/token';
const ENDPOINT_DETAILS = 'https://api.outerspatial.com/v2/areas/{OS_PARK_ID}';

var TOKEN; // will be populated below; yes this should be global


//
// BOOTSTRAP WITH A PROMISE
// connect to OpenSpatial API and get a token
// on success, fetch our list of parks to process + update, do them
//

new Promise((resolve, reject) => {
    console.log('Requesting OuterSpatial token');
    var form = new FormData();
    form.append("grant_type", "client_credentials");
    form.append("client_id", OPENSPATIAL_CLIENT_ID);
    form.append("client_secret", OPENSPATIAL_CLIENT_SECRET);

    form.submit(ENDPOINT_TOKEN, function(err, res) {
        if (err) throw err;

        res.on('data', function (chunk) {
            // there will only be one block of data, so we can safely presume that this block contains what we need
            const replydata = JSON.parse(chunk);
            TOKEN = replydata.access_token;
            if (! TOKEN) throw new Error("OuterSpatial API did not give back a token");
        }).on('end', function () {
            resolve();
        });
    });
}).then(() => {
    let DBCLIENT = new pg.Client(DATABASE_URL);
    DBCLIENT.connect(function(err) {
        if (err) throw new Error('Could not connect to database: ', err);

        //gda//DBCLIENT.query('SELECT cpad_suid,os_id,unit_name FROM outerspatial_content', function(err, result) {
        //gda//DBCLIENT.query('SELECT cpad_suid,os_id,unit_name FROM outerspatial_content WHERE cpad_suid=$1', [1443], function(err, result) {
        //gda//DBCLIENT.query('SELECT cpad_suid,os_id,unit_name FROM outerspatial_content WHERE cpad_suid=$1', [1575], function(err, result) {
        //gda//DBCLIENT.query('SELECT cpad_suid,os_id,unit_name FROM outerspatial_content WHERE cpad_suid=$1', [1624], function(err, result) {
        //gda//DBCLIENT.query('SELECT cpad_suid,os_id,unit_name FROM outerspatial_content WHERE cpad_suid=$1', [1659], function(err, result) {
        //gda//DBCLIENT.query('SELECT cpad_suid,os_id,unit_name FROM outerspatial_content WHERE cpad_suid=$1', [13771], function(err, result) {
        //gda//DBCLIENT.query('SELECT cpad_suid,os_id,unit_name FROM outerspatial_content WHERE cpad_suid=$1', [1682], function(err, result) {
        //gda//DBCLIENT.query('SELECT cpad_suid,os_id,unit_name FROM outerspatial_content WHERE cpad_suid=$1', [1652], function(err, result) {
        DBCLIENT.query('SELECT cpad_suid,os_id,unit_name FROM outerspatial_content WHERE cpad_suid=$1', [6341], function(err, result) {
            DBCLIENT.end();
            if (err) throw new Error('Could not fetch list of OuterSpatial parks: ', err);

            // go through the list of parks and collect their supplemental data into a structure
            // it's not very large, and this lets us cleanly separate into fetch-phase and udpate-phase
            var supplemental_data = {};
            result.rows.forEach(parkrecord => {
                // within this park record, hit the data API and get the supplemental data
                const url = ENDPOINT_DETAILS.replace('{OS_PARK_ID}', parkrecord.os_id);
                console.log(`Fetching ${parkrecord.cpad_suid} ${parkrecord.unit_name} (OSID: ${parkrecord.os_id})\n    ${url}`);

                var res = request('GET', url, {
                    'headers': {
                        'authorization': `bearer ${TOKEN}`
                    }
                });
                const parkdata = JSON.parse(res.getBody('utf8'));
                console.log(`    Found park name: ${parkdata.name}`); // useful for debugging esp when a brand-new park is added and the ID may be wrong

console.log(parkdata.tags);
console.log(parkdata.description);
            });
        });
    });
}).catch((err) => {
    throw err;
});
