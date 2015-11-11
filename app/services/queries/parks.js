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

  const q = ["SELECT q2.count, q2.unit_name AS su_name, q2.superunit_id AS su_id,"]
    .concat(BASE_PHOTO_ATTRIBUTES)
    .concat([
      " FROM (select count(*), cpad.unit_name, cpad.superunit_id, MIN(q1.id) as min_id, MAX(q1.id) as max_id",
      " FROM (select * FROM instagram_photos photos WHERE (photos.metadata->>'created_time')::int >= cast(extract(epoch from current_timestamp - interval '6 days') as integer)) as q1",
      " JOIN cpad_superunits cpad ON cpad.superunit_id = q1.superunit_id",
      " GROUP BY cpad.unit_name, cpad.superunit_id",
      " ORDER by count DESC LIMIT $1) as q2",
      " JOIN instagram_photos photos ON q2.min_id = photos.id"
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

// TODO: restrict query to bounding box
function mostSharedParks(options) {
  options = options || {};
  const interval = options.interval || 'week-now';
  const dateStr = datesForTime(interval);
  const parkCount = options.parkCount || '10';
  const photoCount = options.photoCount || '10';
  const q = [
    "WITH most_shared_parks AS (",
    " SELECT topten.total, cpad.superunit_id, cpad.unit_name,",
    " ST_AsGeoJSON(ST_Centroid(ST_Transform(cpad.geom, 4326))) AS centroid",
    " FROM (SELECT count(*) as total, cpad.superunit_id",
    " FROM (SELECT * FROM instagram_photos photos",
    " WHERE",
    dateStr,
    ") as q1",
    " JOIN cpad_superunits cpad ON cpad.superunit_id = q1.superunit_id",
    " GROUP BY cpad.superunit_id order by total DESC LIMIT $1) as topten,",
    " cpad_superunits cpad WHERE topten.superunit_id = cpad.superunit_id",
    ")",
    " SELECT parks.superunit_id, MAX(parks.total) as total, parks.unit_name, MIN(parks.centroid)::json as centroid, array_agg(row_to_json(q1)) as item",
    " FROM most_shared_parks parks,",
    " LATERAL(SELECT "
  ].concat(BASE_PHOTO_ATTRIBUTES).concat([
    " FROM instagram_photos photos",
    " WHERE photos.superunit_id = parks.superunit_id",
    " AND ",
    dateStr,
    " ORDER BY (photos.metadata->>'created_time')::int DESC LIMIT $2) q1",
    " GROUP BY parks.superunit_id, parks.unit_name;"
  ]).join('\n');

  return {query: q, opts:[parkCount, photoCount]};
}

export const queries = {
  latestPhotoFromMostSharedPark: latestPhotoFromMostSharedPark,
  mostSharedParks: mostSharedParks
}


