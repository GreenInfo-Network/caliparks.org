import {CPAD_WHERE} from './common';

function getActivitiesList() {
  const q = "select distinct lower(unnest(a.activities)) from activities a;";
  return {query: q, opts:[]};
}

// fix for inconsistent coding in the DB table; first-letter uppercase; issue 666
function correctActivityName(givenname) {
  var activityname = givenname;
  switch (activityname) {
    case 'tennis':
    case 'playground':
    case 'basketball':
    case 'ball fields':
    case 'covered picnic tables':
      activityname = givenname.replace(/^\w/, function (chr) { return chr.toUpperCase(); });
      break;
  }
  return activityname;
}

function listParksWithActivity(options) {
  options = options || {};
  const activity = correctActivityName(options.activity) || null;
  let where = [];
  const bbox = options.bbox || null;
  let opts = [];
  if (bbox) {
    opts = opts.concat(bbox.split(',').map(parseFloat));
    where.push("ST_Transform(cpad.geom, 4326) && ST_MakeEnvelope($1, $2, $3, $4, 4326)");
  }
  where = where.concat(CPAD_WHERE);

  if (activity) {
    where.push("a.activities @> '{" + activity.split('_').join(' ') + "}'::text[]");
  }

  const q = [
    "SELECT",
      " cpad.unit_name AS name,",
      "cpad.superunit_id::int AS id,",
      "cpad.gis_acres::real as size ",
    " FROM activities a",
    " JOIN cpad_superunits cpad USING (superunit_id)",
    " WHERE ",
    where.join(" AND ")
  ];


  return {query: q.join('\n'), opts: opts};
}

function getParksForActivity(options) {
  options = options || {};
  const limit = options.limit || 500;
  const activity = correctActivityName(options.activity.split('_').join(' '));

  const bbox = options.bbox || null;
  let where = [];
  let opts = [limit];
  if (bbox) {
    opts = opts.concat(bbox.split(',').map(parseFloat));
    where.push("ST_Transform(cpad.geom, 4326) && ST_MakeEnvelope($2, $3, $4, $5, 4326)");
  }
  where = where.concat(CPAD_WHERE);
  where.push("a.activities @> '{" + activity + "}'::text[]");

  const q= [
  "SELECT * FROM (SELECT",
    " cpad.unit_name AS su_name,",
    "cpad.superunit_id::int AS su_id,",
    "cpad.park_url,",
    "cpad.manager_id::int,",
    "cpad.mng_agncy,",
    "cpad.access_typ,",
    "cpad.gis_acres::real as gis_acres,",
    "cpad_entry_points.ogc_fid,",
    "ST_AsGeoJSON(COALESCE(ST_Transform(cpad_entry_points.geom, 4326), ST_Centroid(ST_Transform(cpad.geom, 4326))))::json AS centroid,",
    "a.activities",
  " FROM activities a",
  " JOIN cpad_superunits cpad USING (superunit_id)",
  " LEFT JOIN (SELECT su_id,ogc_fid,geom FROM cpad_entry_points WHERE pt_type = \'primary\') AS cpad_entry_points ON cpad_entry_points.su_id = cpad.superunit_id",
  " WHERE ",
  where.join(' AND '),
  " ORDER BY gis_acres DESC",
  " LIMIT $1) q ORDER BY q.su_name ASC"
  ];

  return {query: q.join('\n'), opts: opts};
}

export const queries = {
  getActivitiesList: getActivitiesList,
  getParksForActivity: getParksForActivity,
  listParksWithActivity: listParksWithActivity
}
