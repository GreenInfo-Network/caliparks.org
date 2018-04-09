A historical note about the Top Ten parks map.

Until mid-2016 there was a peripheral set of programs which scraped Instagram and saved the photos to the *instagram_photos* DB table. The Top Ten would accept a time period and filter the photos by that time period, using the tally per park as the park's popularity. Thus, Top Ten parks based on Instagram activity.

Per [issue 5](https://github.com/GreenInfo-Network/caliparks.org/issues/5) this eventually developed two issues. Instagram changed their API and there was no funding to update the scrapers; and the volume of photos had made the queries take an unacceptably long time.

Per issue 5, the workaround is to create a table of the Top Ten of all time, and `mostSharedParks()` in *queries/parks.js* was modified to present this table instead.

*This query uses `true` as the date filter, so as to be the Top Ten of all time.`

```
DROP TABLE IF EXISTS topten_parks;

CREATE TABLE topten_parks AS
WITH most_shared_parks AS (
 SELECT topten.total, cpad.superunit_id, cpad.unit_name,
 ST_AsGeoJSON(ST_Centroid(ST_Transform(cpad.geom, 4326))) AS centroid
 FROM (SELECT count(*) as total, cpad.superunit_id
 FROM (SELECT * FROM instagram_photos photos WHERE true) as q1
 JOIN cpad_superunits cpad ON cpad.superunit_id = q1.superunit_id
 GROUP BY cpad.superunit_id order by total DESC LIMIT 100) as topten,  -- top 100 here, then filter by name + access below, THEN take top 10 by photo count
 cpad_superunits cpad
 WHERE topten.superunit_id = cpad.superunit_id
 AND
   -- CPAD_WHERE defined in common.js
   cpad.access_typ IN ('Open Access')
   AND
   cpad.unit_name NOT IN ('BLM', 'California State Lands Commission', 'County Park', 'EBMUD', 'Haggin Oaks Gulf Course', 'Hetch Hetchy Water and Power', 'Joshua Tree National Park Linkage', 'Lake Tahoe Basin Management Unit', 'Los Angeles Department of Water and Power', 'Los Vaqueros Watershed', 'Marin County Flood Control', 'Marin Municipal Water District Watershed', 'Other Federal', 'Park', 'Preserve', 'Preserve Areas', 'Salton Sea - Bureau of Rec', 'Salton Sea - Irrigation District', 'San Francisco Watershed Lands', 'State of California', 'USBR', 'USFS', 'United States Bureau of Reclamation', 'United States Forest Service', 'United States Of America', 'United States of America', 'Water Lots') AND cpad.unit_name !~ 'holding' AND cpad.unit_name !~ 'Property$' AND cpad.unit_name !~ 'Private' AND cpad.unit_name !~ 'TaxDef' AND cpad.unit_name !~ '\\d+$' AND cpad.unit_name !~ 'Unknown' AND cpad.unit_name !~ 'Acq'
)
 SELECT
 parks.superunit_id::int AS su_id,
 parks.unit_name AS su_name,
 MAX(parks.total)::int as total,
 MIN(parks.centroid)::json as centroid,
 array_agg(row_to_json(q1)) as item
 FROM most_shared_parks parks,
 LATERAL(SELECT
  photos.photo_id AS photoid,
  COALESCE(NULLIF(photos.metadata ->> 'caption', 'null')::json, '{ "caption": { "text": "" } }'::json) -> 'text' AS title,
  photos.metadata -> 'attribution' AS attribution,
  photos.metadata -> 'location' -> 'name' AS placename,
  photos.metadata -> 'location' -> 'id' AS placeid,
  photos.metadata -> 'comments' -> 'count' AS commentcount,
  photos.metadata -> 'filter' AS filter,
  photos.metadata -> 'created_time' AS created_time,
  photos.metadata -> 'link' AS link,
  photos.metadata -> 'likes' -> 'count' AS likescount,
  photos.metadata -> 'images' -> 'standard_resolution' -> 'url' AS standard_resolution,
  photos.metadata -> 'images' -> 'standard_resolution' -> 'width' AS width,
  photos.metadata -> 'images' -> 'standard_resolution' -> 'height' AS height,
  photos.metadata -> 'user' -> 'username' AS username,
  photos.metadata -> 'user' -> 'website' AS website,
  photos.metadata -> 'user' -> 'profile_picture' AS profile_picture,
  photos.metadata -> 'user' -> 'bio' AS bio,
  photos.metadata -> 'user' -> 'id' AS userid,
  ST_X(photos.geom) as lng,
  ST_Y(photos.geom) as lat
 FROM flickr_photos photos
 WHERE photos.superunit_id = parks.superunit_id
 AND photos.metadata -> 'url_l' IS NOT NULL
 ORDER BY (photos.metadata->>'created_time')::int DESC LIMIT 10) q1
 GROUP BY parks.superunit_id, parks.unit_name
 ORDER BY total DESC
 LIMIT 10;
```

In theory, if the scrapers were modified and brought back into service, a set of queries such as the above could be run on a weekly basis and populate a set of "top ten this week", "top ten this month" and so on. This could give very good runtime performance, while also allowing for date filtering.

