function getActivitiesList() {
  const q = "select distinct unnest(a.activities) from activities a;";
  return {query: q, opts:[]};
}

function getParksForActivity(options) {
  options = options || {};
  const activity = options.activity.split('_').join(' ');
  const q= [
  "SELECT",
    " cpad.unit_name AS su_name,",
    "cpad.superunit_id::int AS su_id,",
    "cpad.park_url,",
    "cpad.manager_id::int,",
    "cpad.mng_agncy,",
    "cpad.access_typ,",
    "cpad.gis_acres::real,",
    "ST_AsGeoJSON(ST_Centroid(ST_Transform(cpad.geom, 4326)))::json AS centroid,",
    "a.activities",
  " FROM activities a",
  " JOIN cpad_superunits cpad USING (superunit_id)",
  " WHERE cpad.access_typ = 'Open Access'",
  " AND a.activities @> '{" + activity + "}'::text[]",
  " ORDER BY su_name ASC",
  ];

  if (options.limit) {
    q.push(" LIMIT 10");
  }

  return {query: q.join('\n'), opts:[]};
}

export const queries = {
  getActivitiesList: getActivitiesList,
  getParksForActivity: getParksForActivity
}
