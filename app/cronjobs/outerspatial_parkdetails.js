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
 *
 * And a significant consideration for the health of Caliparks: the API provides preformatted HTML
 * and content management is by OpenSpatial personnel and is considered trustworthy,
 * e.g. wrapping a title in <h1></h1> will not result in a broken tag nor anything ugly
 * and displaying their HTML as-given would not introduce a <script> tag nor onMouseOver="" attributes
 *
 * TBD and TODO:
 * - Recurring events. All events seen so far are "singular" and not recurring
 *   the structure seems to indicate that recurring events may give a start date and recurrence schedule,
 *   and we would need to figure out the next recurrence date after this run.
 * - Alerts. None of the parks have any posts at all, therefore none of is_alert=true
 */

//
// PACKAGES AND IMPORTS
//

import FormData from 'form-data';
import {Promise} from 'es6-promise';
import moment from 'moment';
import util from 'util';
import request from 'sync-request';
import pg from 'pg';

//
// CONSTANTS AND VARIABLES
//

const DRY_RUN = false; // for testing: true = skip saving to database

const RUN_ONLY_ONE_SUID = null;  // for testing: run just this one park (CPAD SUID); set null/undefined for4 default of running all parks in OS table

const OPENSPATIAL_CLIENT_ID = process.env.OPENSPATIAL_CLIENT_ID;
const OPENSPATIAL_CLIENT_SECRET = process.env.OPENSPATIAL_CLIENT_SECRET;
if (! OPENSPATIAL_CLIENT_ID || ! OPENSPATIAL_CLIENT_SECRET) throw new Error("Check your .env and define OPENSPATIAL_CLIENT_ID and OPENSPATIAL_CLIENT_SECRET");

const DATABASE_URL = process.env.DATABASE_URL;
if (! DATABASE_URL) throw new Error("Check your .env and define DATABASE_URL");

const ENDPOINT_TOKEN = 'https://api.outerspatial.com/oauth/token';
const ENDPOINT_DETAILS = 'https://api.outerspatial.com/v2/areas/{OS_PARK_ID}';

var TOKEN; // will be populated below; yes this should be global

const TODAY_YYYMMDD = moment().format('YYYY-MM-DD');

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
    let LISTCLIENT = new pg.Client(DATABASE_URL);
    LISTCLIENT.connect(function(err) {
        if (err) throw new Error('Could not connect to database: ', err);

        // debugging: either run all parks in the table, or this one specific entry
        let getpark_sql = 'SELECT cpad_suid,os_id,unit_name FROM outerspatial_content';
        let getpark_params = [];
        if (RUN_ONLY_ONE_SUID) {
            getpark_sql = 'SELECT cpad_suid,os_id,unit_name FROM outerspatial_content WHERE cpad_suid=$1';
            getpark_params = [RUN_ONLY_ONE_SUID];
        }

        LISTCLIENT.query(getpark_sql, getpark_params, function(err, parkstoprocess) {
            LISTCLIENT.end();
            if (err) throw new Error('Could not fetch list of OuterSpatial parks: ', err);

            // go through the list of parks and collect their supplemental data into a structure
            // it's not very large, and this lets us cleanly separate into fetch-phase and udpate-phase
            let supplemental_data = {};
            parkstoprocess.rows.forEach(parkrecord => {
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
                // console.log(parkdata);

                // initialize the supplemental data for this park, keying by CPAD SUID as that's our unique index in the table
                // below, we will add the HTML blocks to it individually
                supplemental_data[parkrecord.cpad_suid] = {};

                // compose content: Highlights (description), a whole bunch of fields collected together
                // some are pre-formatted HTML, some need HTML composed
                console.log(`    Highlights`);
                {
                    let html = [];
                    if (parkdata.description)               html.push(parkdata.description.trim());
                    if (parkdata.accessibility_description) html.push(`<p><b>Accessibility</b></p>\n${parkdata.accessibility_description.trim()}`);
                    if (parkdata.website)                   html.push(`<p><a target="_blank" href="${parkdata.website.trim()}">More Info</a></p>`);

                    supplemental_data[parkrecord.cpad_suid].description = html.join("\n");
                    //console.log(supplemental_data[parkrecord.cpad_suid].description);
                }

                // compose content: About Visiting (aboutvisiting), aka content_blocks
                // build an array of H1 titles and pre-formatted bodies, join them into a string
                console.log(`    About Visiting`);
                {
                    let html = [];
                    parkdata.content_blocks.forEach((block) => {
                        html.push(`<h2>${block.title.trim()}</h2>`);
                        html.push(block.body.trim());
                    });
                    supplemental_data[parkrecord.cpad_suid].aboutvisiting = html.join("\n");
                }
                //console.log(supplemental_data[parkrecord.cpad_suid].aboutvisiting);

                // compose content: Events (events), aka primary_events
                // build an array of H1 titles and formatted bodies, join them into a string
                console.log(`    Events`);
                {
                    let html = [];
                    parkdata.primary_events.sort((p, q) => {
                        return p.schedule_attributes.date > q.schedule_attributes.date ? 1 : -1;  // sort by date
                    });

                    parkdata.primary_events.forEach((block) => {
                        if (block.schedule_attributes.date < TODAY_YYYMMDD) return; // in the past, skip it

                        const eventdate_pretty = moment(block.schedule_attributes.date).format('ddd, MMM D');

                        console.log(`        ${eventdate_pretty} ${block.name.trim()}`);

                        html.push('<div>'); // wrap in a DIV so we can visually separate individual events

                        html.push(`<h2>${eventdate_pretty} &nbsp; ${block.name.trim()}</h2>`);
                        html.push(block.description.trim());
                        if (block.cost)         html.push(`<p>Cost: ${block.cost.trim()}</p>`);
                        if (block.website)      html.push(`<p><a target="_blank" href="${block.website.trim()}">More Info</a></p>`);
                        if (block.phone_number) html.push(`<p>Phone: ${block.phone_number.trim()}</p>`);

                        html.push('</div>');
                    });
                    supplemental_data[parkrecord.cpad_suid].events = html.join("\n");
                }
                //console.log(supplemental_data[parkrecord.cpad_suid].events);

                // compose content: Photos (photos), aka primary_events
                // must be strict on structure here, as this is parsed into DIVs and re-constructed into a react-slick Slider
                // split on newlines, each is a DIV   DIV contains A and IMG, and SPAN items
                // split on newlines => means don't put any in the HTML here!
                console.log(`    Photos`);
                {
                    let html = [];
                    parkdata.image_attachments.forEach((block) => {
                        const thumburl = block.image.versions.medium_square.cdn_url;
                        const fullurl  = block.image.versions.large.cdn_url;
                        const caption  = block.image.caption ? block.image.caption.trim() : '';
                        const credits  = block.image.attribution_text ? block.image.attribution_text.trim() : '';

                        const captiondiv = caption ? `<span class="caption">${caption}</span>` : '';
                        const creditsdiv = credits ? `<span class="credits">Photo by ${credits}</span>` : '';
                        const photoblurb = caption || credits ? `<span class="photoblurb">${captiondiv} ${creditsdiv}</span>` : '';

                        html.push(`<div><a target="_blank" href="${fullurl}"><img src="${thumburl}" /></a>${photoblurb}</div>`);
                    });
                    supplemental_data[parkrecord.cpad_suid].photos = html.join("\n");
                }
                //console.log(supplemental_data[parkrecord.cpad_suid].photos);

                // compose content: Alerts and Closures (alerts)   two sources here:
                // an alert is a Post with is_alert=true
                // a closure is a "closed" Tag
                // build an array of H1 titles and formatted bodies, join them into a string
                console.log(`    Alerts and Closures`);
                {
                    let html = [];
                    parkdata.posts.forEach((block) => {
                    });
                    parkdata.tags.forEach((block) => {
                    });
                    supplemental_data[parkrecord.cpad_suid].alerts = html.join("\n");
                }
                //console.log(supplemental_data[parkrecord.cpad_suid].alerts);

            }); // end of this park's fetch phase

            // done with compiling data for all parks
            // onward to saving it
            console.log('Done fetching data for all parks');

            if (DRY_RUN) {
                console.log('DRY RUN: Not saving content to database.');
                return;
            }

            parkstoprocess.rows.forEach(parkrecord => {
                console.log(`Saving data: ${parkrecord.unit_name}`); // useful for debugging esp when a brand-new park is added and the ID may be wrong

                const newfields = supplemental_data[parkrecord.cpad_suid];
                const sql = `UPDATE outerspatial_content SET
                             aboutvisiting=$1,
                             events=$2,
                             alerts=$3,
                             description=$4,
                             photos=$5
                             WHERE cpad_suid=$6`;
                const params = [
                    newfields.aboutvisiting,
                    newfields.events,
                    newfields.alerts,
                    newfields.description,
                    newfields.photos,
                    parkrecord.cpad_suid
                ];

                let SAVECLIENT = new pg.Client(DATABASE_URL);
                SAVECLIENT.connect(function(err) {
                    SAVECLIENT.query(sql, params, function(err, result) {
                        SAVECLIENT.end();
                        if (err) throw new Error(`Could not update ${parkrecord.unit_name}: `, err);
                    });
                });
            }); // end save-to-db
        }); // end park row
    }); // end db-connected
}).catch((err) => {
    throw err;
});
