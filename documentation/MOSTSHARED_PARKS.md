The front page has a slider of the latest photo, from the top 20 most-shared parks.

As of April 2018, this uses Flickr photos due to the Instagram shutdown **and** it *uses a pre-generated table* instead of dynamically calculating the parks and photos.

The photo scrapers have not been operational in a few years, so the content will not change. However, the query was taking alarming close to 60 seconds and thus being terminated by Heroku. See issue 5 and the TOPTEN_PARKS.md document for previous such instances.

The `latestPhotoFromMostSharedPark()` query now simply does a select from the static **mostshared_parks** table.


```
DROP TABLE IF EXISTS mostshared_parks;

CREATE TABLE mostshared_parks AS 
WITH most_shared_parks AS (
 SELECT
 count(*),
cpad.superunit_id AS su_id,
cpad.unit_name AS su_name
 FROM (
  SELECT * FROM flickr_photos photos
   WHERE (photos.metadata->>'dateupload')::int >= cast(extract(epoch from DATE '2016-05-23' - interval '6 days') as integer)
  ) as q1
   JOIN cpad_superunits cpad ON cpad.superunit_id = q1.superunit_id
   WHERE 
   cpad.access_typ IN ('Open Access')
   AND
   cpad.unit_name NOT IN ('BLM', 'California State Lands Commission', 'County Park', 'EBMUD', 'Haggin Oaks Gulf Course', 'Hetch Hetchy Water and Power', 'Joshua Tree National Park Linkage', 'Lake Tahoe Basin Management Unit', 'Los Angeles Department of Water and Power', 'Los Vaqueros Watershed', 'Marin County Flood Control', 'Marin Municipal Water District Watershed', 'Other Federal', 'Park', 'Preserve', 'Preserve Areas', 'Salton Sea - Bureau of Rec', 'Salton Sea - Irrigation District', 'San Francisco Watershed Lands', 'State of California', 'USBR', 'USFS', 'United States Bureau of Reclamation', 'United States Forest Service', 'United States Of America', 'United States of America', 'Water Lots') AND cpad.unit_name !~ 'holding'AND cpad.unit_name !~ 'Property$'AND cpad.unit_name !~ 'Private'AND cpad.unit_name !~ 'TaxDef'AND cpad.unit_name !~ '\\d+$'AND cpad.unit_name !~ 'Unknown'AND cpad.unit_name !~ 'Acq'
   GROUP BY cpad.unit_name, cpad.superunit_id
   ORDER by count DESC
   LIMIT 20
)
SELECT p.*, q2.* FROM most_shared_parks p,
LATERAL(SELECT
    photos.photo_id AS photoid,
    ''::varchar AS title,
    ''::varchar AS attribution,
    photos.metadata -> 'url_l' AS standard_resolution,
    photos.metadata -> 'width_l' AS width,
    photos.metadata -> 'height_l' AS height,
    ST_X(photos.geom) as lng,
    ST_Y(photos.geom) as lat,
    ''::varchar AS placename,
    photos.metadata -> 'place_id' AS placeid,
    0 AS commentcount,
    0 AS likescount,
    ''::varchar AS filter,
    photos.metadata -> 'dateupload' AS created_time,
    photos.metadata -> 'url_l' AS link,
    photos.metadata -> 'ownername' AS username,
    ''::varchar AS website,
    ''::varchar AS profile_picture,
    ''::varchar AS bio,
    photos.metadata -> 'owner' AS userid
 FROM flickr_photos photos WHERE photos.superunit_id = p.su_id
    AND p.su_id != 14210  -- Death Valley, too many recent photos have since been deleted, we keep getting No Such Photo results
    AND photos.metadata -> 'url_l' IS NOT NULL
    AND photos.metadata ->> 'width_l'= '1024'
    AND photos.metadata ->> 'height_l' = '768'
 ORDER BY (photos.metadata->>'dateupload')::int DESC LIMIT 1
) as q2;
```
