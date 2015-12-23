function getActivitiesList() {
  const q = "select distinct unnest(a.activities) from activities a;";
  return {query: q, opts:[]};
}

function getParksForActivity(options) {
  options = options || {};
  const activity = options.activity.split('_').join(' ');
  const limit = options.limit || 200;

  // xmin, ymin, xmax, ymax
  const bbox = options.bbox || null;
  const where = [];
  let opts = [limit];
  if (bbox) {
    opts = opts.concat(bbox.split(',').map(parseFloat));
    where.push("ST_Transform(cpad.geom, 4326) && ST_MakeEnvelope($2, $3, $4, $5, 4326)");
  }
  where.push("cpad.access_typ = 'Open Access'");
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
  getParksForActivity: getParksForActivity
}
