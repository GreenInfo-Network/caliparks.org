import escape from 'pg-escape';

const BASE_PHOTO_ATTRIBUTES = [
  "  photos.photo_id AS photoid,",
  "  COALESCE(NULLIF(photos.metadata ->> 'caption', 'null')::json, '{ \"caption\": { \"text\": \"\" } }'::json) -> 'text' AS title,",
  "  photos.metadata -> 'attribution' AS attribution,",
  "  photos.metadata -> 'location' -> 'name' AS placename,",
  "  photos.metadata -> 'location' -> 'id' AS placeid,",
  "  photos.metadata -> 'comments' -> 'count' AS commentcount,",
  "  photos.metadata -> 'filter' AS filter,",
  "  photos.metadata -> 'created_time' AS created_time,",
  "  photos.metadata -> 'link' AS link,",
  "  photos.metadata -> 'likes' -> 'count' AS likescount,",
  "  photos.metadata -> 'images' -> 'standard_resolution' -> 'url' AS standard_resolution,",
  "  photos.metadata -> 'images' -> 'standard_resolution' -> 'width' AS width,",
  "  photos.metadata -> 'images' -> 'standard_resolution' -> 'height' AS height,",
  "  photos.metadata -> 'user' -> 'username' AS username,",
  "  photos.metadata -> 'user' -> 'website' AS website,",
  "  photos.metadata -> 'user' -> 'profile_picture' AS profile_picture,",
  "  photos.metadata -> 'user' -> 'bio' AS bio,",
  "  photos.metadata -> 'user' -> 'id' AS userid,",
  "  ST_X(photos.geom) as lng,",
  "  ST_Y(photos.geom) as lat"
];

/**
 * Get latest photo from most shared parks
 * @param  {Object} options
 * @return query, options
 */
function latestPhotoFromMostSharedPark(options) {
  options = options || {};
  const photoCount = options.photoCount || '20';

  const q = [
  "WITH most_shared_parks AS (",
  " SELECT",
  " count(*),",
  "cpad.superunit_id AS su_id,",
  "cpad.unit_name AS su_name",
  " FROM (",
    "SELECT * FROM instagram_photos photos",
    " WHERE (photos.metadata->>'created_time')::int >= cast(extract(epoch from current_timestamp - interval '6 days') as integer)",
    ") as q1",
    " JOIN cpad_superunits cpad ON cpad.superunit_id = q1.superunit_id",
    " WHERE cpad.access_typ = 'Open Access'",
    " GROUP BY cpad.unit_name, cpad.superunit_id",
    " ORDER by count DESC",
    " LIMIT $1",
  ")",
  "SELECT p.*, q2.* FROM most_shared_parks p,",
  "LATERAL(SELECT"
  ].concat(BASE_PHOTO_ATTRIBUTES)
  .concat([
  " FROM instagram_photos photos WHERE photos.superunit_id = p.su_id ORDER BY (photos.metadata->>'created_time')::int DESC LIMIT 1) as q2;"
  ]).join('\n');

  return {query: q, opts:[photoCount]};
}

/*
{ value: 'today', label: 'Today' },
{ value: 'yesterday', label: 'Yesterday' },
{ value: 'season-now', label: 'This season' },
{ value: 'season-last', label: 'Last season' },

Winter: 21st December - 20th March
Spring: 21st March - 20th June
Summer: 21st June - 20th September
Autumn: 21st September - 21st December
 */

// TODO: seasons, today, yesterday
function datesForTime(t) {
  let start = null;
  let end = null;

  switch(t) {
  case 'week-now':
    start = "date_trunc('week', now()) - interval '1 day'";
    end = "date_trunc('week', now()) + interval '6 days'";
    break;
  case 'week-last':
    start = "date_trunc('week', now() - interval '1 week') - interval '1 day'";
    end = "date_trunc('week', now() - interval '1 week') + interval '6 days'";
    break;
  case 'month-now':
    start = "date_trunc('month', now())";
    end = "date_trunc('month', now() + interval '1 month')";
    break;
  case 'month-last':
    start = "date_trunc('month', now() - interval '1 month')";
    end = "date_trunc('month', now() - interval '1 month') + interval '1 month'";
    break;
  case 'year-now':
    start = "date_trunc('year', now())";
    end = "date_trunc('year', now() + interval '1 year')";
    break;
  case 'year-last':
    start = "date_trunc('year', now() - interval '1 year')";
    end = "date_trunc('year', now() - interval '1 year') + interval '1 year'";
    break;
  default:
    start = "date_trunc('week', now()) - interval '1 day'";
    end = "date_trunc('week', now()) + interval '6 days'";
    break;
  }

  return `(photos.metadata->>'created_time')::int >= cast(extract(epoch from (${start})) as integer) AND (photos.metadata->>'created_time')::int < cast(extract(epoch from (${end})) as integer)`;
}

function parksNotIn(options) {
  const interval = options.interval || 'week-now';
  const dateStr = datesForTime(interval);
  const photoCount = options.photoCount || '10';
  const bbox = options.bbox || null;
  const notIn = options.notIn || [];

  let notInStr = ' (' + escape((notIn.join(','))) + ')';
  let bboxWhere = '';
  let photoWhere = '';
  if (bbox) {
    const bboxParams = bbox.split(',').map(parseFloat);
    bboxWhere = escape(" AND ST_Transform(cpad.geom, 4326) && ST_MakeEnvelope(%s, %s, %s, %s, 4326)", bboxParams[0], bboxParams[1], bboxParams[2], bboxParams[3]);
    photoWhere = escape(" AND ST_Transform(photos.geom, 4326) && ST_MakeEnvelope(%s, %s, %s, %s, 4326)", bboxParams[0], bboxParams[1], bboxParams[2], bboxParams[3]);
  }

  const q = [
  "WITH parks AS (SELECT",
  " cpad.superunit_id, cpad.unit_name, ST_AsGeoJSON(ST_Centroid(ST_Transform(cpad.geom, 4326))) AS centroid",
  " FROM cpad_superunits cpad",
  " WHERE cpad.access_typ = 'Open Access' AND cpad.superunit_id NOT IN",
  notInStr,
  bboxWhere,
  "), photos AS (SELECT",
  " count(*) as total, q0.superunit_id, (array_agg(row_to_json((select t from (",
  "select q0.attribution as attribution,",
    "q0.username as username,",
    "q0.photoid as photoid,",
    "q0.title as title,",
    "q0.placename as placename,",
    "q0.placeid as placeid,",
    "q0.commentcount as commentcount,",
    "q0.filter as filter,",
    "q0.created_time as created_time,",
    "q0.link as link,",
    "q0.likescount as likescount,",
    "q0.standard_resolution as standard_resolution,",
    "q0.width as width,",
    "q0.height as height,",
    "q0.username as username,",
    "q0.website as website,",
    "q0.profile_picture as profile_picture,",
    "q0.bio as bio,",
    "q0.userid as userid,",
    "q0.lng as lng,",
    "q0.lat as lat",
  ") t))))[1:2] as metadata FROM (",
  "SELECT photos.superunit_id,"].concat(BASE_PHOTO_ATTRIBUTES).concat([
  " FROM instagram_photos photos",
  " WHERE ",
  dateStr,
  " AND photos.superunit_id NOT IN",
  notInStr,
  photoWhere,
  " ORDER BY (photos.metadata->>'created_time')::int DESC) q0 GROUP BY q0.superunit_id",
  ")",
  "SELECT parks.superunit_id, parks.unit_name, parks.centroid::json, photos.total, photos.metadata as item from parks",
  "LEFT JOIN photos ON parks.superunit_id = photos.superunit_id ORDER BY photos.total DESC"
  ]).join('\n');

  return {query: q, opts:[]};
}

function mostSharedParks(options) {
  options = options || {};
  const interval = options.interval || 'week-now';
  const dateStr = datesForTime(interval);
  const parkCount = options.parkCount || '10';
  const photoCount = options.photoCount || '10';
  const bbox = options.bbox || null;

  let bboxWhere = [];
  if (bbox) {
    const bboxParams = bbox.split(',').map(parseFloat);
    bboxWhere = [escape(" WHERE ST_Transform(cpad.geom, 4326) && ST_MakeEnvelope(%s, %s, %s, %s, 4326)", bboxParams[0], bboxParams[1], bboxParams[2], bboxParams[3])];
  }

  const q = [
    "WITH most_shared_parks AS (",
    " SELECT topten.total, cpad.superunit_id, cpad.unit_name,",
    " ST_AsGeoJSON(ST_Centroid(ST_Transform(cpad.geom, 4326))) AS centroid",
    " FROM (SELECT count(*) as total, cpad.superunit_id",
      " FROM (SELECT * FROM instagram_photos photos",
      " WHERE",
      dateStr,
      ") as q1",
    " JOIN cpad_superunits cpad ON cpad.superunit_id = q1.superunit_id"
  ].concat(bboxWhere).concat([
    " GROUP BY cpad.superunit_id order by total DESC LIMIT $1) as topten,",
    " cpad_superunits cpad WHERE topten.superunit_id = cpad.superunit_id",
    " AND cpad.access_typ = 'Open Access'",
    ")",
    " SELECT",
      " parks.superunit_id,",
      " MAX(parks.total) as total,",
      " parks.unit_name,",
      " MIN(parks.centroid)::json as centroid,",
      " array_agg(row_to_json(q1)) as item",
    " FROM most_shared_parks parks,",
    " LATERAL(SELECT "
  ]).concat(BASE_PHOTO_ATTRIBUTES).concat([
      " FROM instagram_photos photos",
      " WHERE photos.superunit_id = parks.superunit_id",
      " AND ",
      dateStr,
      " ORDER BY (photos.metadata->>'created_time')::int DESC LIMIT $2) q1",
    " GROUP BY parks.superunit_id, parks.unit_name;"
  ]).join('\n');

  return {query: q, opts:[parkCount, photoCount]};
}

function randomPark(options) {
  const q = [
  "WITH most_shared_parks AS (",
    "SELECT",
      " top.total,",
      "cpad.superunit_id AS su_id,",
      "cpad.unit_name AS su_name",
    " FROM (",
      "SELECT",
      " count(*) as total,",
      " cpad.superunit_id",
    " FROM (",
      "SELECT *",
      " FROM instagram_photos photos",
      " WHERE",
      " (photos.metadata->>'created_time')::int >= cast(extract(epoch from (date_trunc('month', now() - interval '1 month'))) as integer)",
      " AND",
      " (photos.metadata->>'created_time')::int < cast(extract(epoch from (date_trunc('month', now() + interval '1 month'))) as integer)",
      ") as q1",
    " JOIN cpad_superunits cpad ON cpad.superunit_id = q1.superunit_id",
    " GROUP BY cpad.superunit_id ORDER by total DESC LIMIT 500",
    ") as top, cpad_superunits cpad",
  " WHERE top.superunit_id = cpad.superunit_id AND top.total > 10",
  " AND cpad.access_typ = 'Open Access'",
  ")",
  "SELECT",
  " total,",
  " su_id,",
  " su_name",
  " FROM most_shared_parks",
  "LIMIT 1",
  "OFFSET FLOOR(random() * (select count(*) from most_shared_parks));"
  ].join('\n');

  return {query: q, opts:[]};
}


function getSelectedParkPhotos(options) {
  options = options || {};
  const id = options.id;
  const photoCount = options.photoCount || '20';
  const offset = options.offset || '0';

  const q = ["WITH photo_count AS (",
    "SELECT count(*) as total FROM instagram_photos photos JOIN cpad_superunits cpad ON cpad.superunit_id = photos.superunit_id WHERE photos.superunit_id = $1 AND cpad.access_typ = 'Open Access'",
    ")",
    "SELECT (select total from photo_count)::int as total, to_json(q1.items) as items FROM (SELECT array_agg(row_to_json(q0)::json) as items ",
    "FROM (",
      "SELECT photos.superunit_id,"].concat(BASE_PHOTO_ATTRIBUTES).concat([
      "FROM instagram_photos photos ",
      "JOIN cpad_superunits cpad ON cpad.superunit_id = photos.superunit_id ",
      "WHERE photos.superunit_id = $2 ",
      "AND cpad.access_typ = 'Open Access' ",
      "ORDER BY (photos.metadata->>'created_time')::int DESC OFFSET $3 LIMIT $4",
    ") q0 ",
    "GROUP BY q0.superunit_id) q1"
  ]).join('\n');

  return {query: q, opts:[id, id, offset, photoCount]};
}

function getSelectedPark(options) {
  options = options || {};
  const id = options.id;

  const q = [
    "SELECT",
    " cpad.unit_name AS su_name,",
    "cpad.superunit_id::int AS su_id,",
    "cpad.park_url,",
    "cpad.manager_id::int,",
    "cpad.mng_agncy,",
    "cpad.access_typ,",
    "cpad.gis_acres::real,",
    "things.activities,",
    "activities_raw.url AS camping_url,",
    "ST_AsGeoJSON(COALESCE(ST_Transform(cpad_entry_points.geom, 4326), ST_Centroid(ST_Transform(cpad.geom, 4326))))::json AS centroid,",
    "ST_AsGeoJSON(ST_Transform(cpad.geom, 4326))::json AS geometry,",
    "ST_AsGeoJSON(ST_Envelope(ST_Transform(cpad.geom, 4326)))::json AS bbox",
    " FROM cpad_superunits cpad",
    " LEFT JOIN activities AS things USING (superunit_id)",
    " LEFT JOIN (SELECT su_id, geom FROM cpad_entry_points WHERE pt_type = 'primary') AS cpad_entry_points ON cpad_entry_points.su_id = cpad.superunit_id",
    " LEFT JOIN activities_raw ON activities_raw.su_id = cpad.superunit_id",
    " WHERE cpad.superunit_id = $1 AND cpad.access_typ = 'Open Access'",
    " LIMIT 1"
  ].join('\n');

  return {query: q, opts:[id]};
}

function getBoundsForPark(options) {
  options = options || {};
  const id = options.id;
  const q = [
    "SELECT",
    "ST_AsGeoJSON(ST_Envelope(ST_Transform(cpad.geom, 4326)))::json AS bbox",
    " FROM cpad_superunits cpad",
    " WHERE cpad.superunit_id = $1"
  ].join('\n');

  return {query: q, opts: [id]};
}

export const queries = {
  latestPhotoFromMostSharedPark: latestPhotoFromMostSharedPark,
  mostSharedParks: mostSharedParks,
  getSelectedParkPhotos: getSelectedParkPhotos,
  getSelectedPark: getSelectedPark,
  randomPark: randomPark,
  getBoundsForPark: getBoundsForPark,
  parksNotIn: parksNotIn
}


