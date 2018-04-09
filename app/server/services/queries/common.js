export const CPAD_WHERE = [
  "cpad.access_typ IN ('Open Access')",
  "cpad.unit_name NOT IN ('BLM', 'California State Lands Commission', 'County Park', 'EBMUD', 'Haggin Oaks Gulf Course', 'Hetch Hetchy Water and Power', 'Joshua Tree National Park Linkage', 'Lake Tahoe Basin Management Unit', 'Los Angeles Department of Water and Power', 'Los Vaqueros Watershed', 'Marin County Flood Control', 'Marin Municipal Water District Watershed', 'Other Federal', 'Park', 'Preserve', 'Preserve Areas', 'Salton Sea - Bureau of Rec', 'Salton Sea - Irrigation District', 'San Francisco Watershed Lands', 'State of California', 'USBR', 'USFS', 'United States Bureau of Reclamation', 'United States Forest Service', 'United States Of America', 'United States of America', 'Water Lots') AND cpad.unit_name !~ 'holding'AND cpad.unit_name !~ 'Property$'AND cpad.unit_name !~ 'Private'AND cpad.unit_name !~ 'TaxDef'AND cpad.unit_name !~ '\\d+$'AND cpad.unit_name !~ 'Unknown'AND cpad.unit_name !~ 'Acq'"
];

export const BASE_PHOTO_ATTRIBUTES = [
  "  photos.photo_id AS photoid,",
  "  '' AS title,",
  "  '' AS attribution,",
  "  photos.metadata -> 'url_l' AS standard_resolution,",
  "  photos.metadata -> 'width_l' AS width,",
  "  photos.metadata -> 'height_l' AS height,",
  "  ST_X(photos.geom) as lng,",
  "  ST_Y(photos.geom) as lat,",
  "  '' AS placename,",
  "  photos.metadata -> 'place_id' AS placeid,",
  "  0 AS commentcount,",
  "  0 AS likescount,",
  "  '' AS filter,",
  "  photos.metadata -> 'dateupload' AS created_time,",
  "  photos.metadata -> 'url_l' AS link,",
  "  photos.metadata -> 'ownername' AS username,",
  "  '' AS website,",
  "  '' AS profile_picture,",
  "  '' AS bio,",
  "  photos.metadata -> 'owner' AS userid"
];
