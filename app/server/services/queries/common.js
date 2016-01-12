export const CPAD_WHERE = [
  "cpad.access_typ IN ('Open Access')",
  `cpad.unit_name NOT IN (
  'BLM',
  'California State Lands Commission',
  'County Park',
  'EBMUD',
  'Haggin Oaks Gulf Course',
  'Hetch Hetchy Water and Power',
  'Joshua Tree National Park Linkage',
  'Lake Tahoe Basin Management Unit',
  'Los Angeles Department of Water and Power',
  'Los Vaqueros Watershed',
  'Marin County Flood Control',
  'Marin Municipal Water District Watershed',
  'Other Federal',
  'Park',
  'Preserve',
  'Preserve Areas',
  'Salton Sea - Bureau of Rec',
  'Salton Sea - Irrigation District',
  'San Francisco Watershed Lands',
  'State of California',
  'USBR',
  'USFS',
  'United States Bureau of Reclamation',
  'United States Forest Service',
  'United States Of America',
  'United States of America',
  'Water Lots'
  ) AND cpad.unit_name !~ 'holding'
    AND cpad.unit_name !~ 'Property$'
    AND cpad.unit_name !~ 'Private'
    AND cpad.unit_name !~ 'TaxDef'
    AND cpad.unit_name !~ '\\d+$'
    AND cpad.unit_name !~ 'Unknown'
    AND cpad.unit_name !~ 'Acq'`
];

export const BASE_PHOTO_ATTRIBUTES = [
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
