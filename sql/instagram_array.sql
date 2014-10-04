-- DROP TABLE IF EXISTS instagram_array;
-- CREATE TABLE instagram_array (
--   id serial PRIMARY KEY,
--   su_id int,
--   lat float,
--   lng float,
--   radius float,
--   the_geom geometry(Polygon, 3310),
--   UNIQUE (su_id, lat, lng, radius)
-- );

DROP TABLE IF EXISTS instagram_array;
CREATE TABLE instagram_array AS
  SELECT
    ST_Y(ST_Transform(ST_Centroid(geom), 4326)) AS lat,
    ST_X(ST_Transform(ST_Centroid(geom), 4326)) AS lng,
    5000::float AS radius,
    geom AS the_geom
  FROM (
    SELECT GetIntersectingHexagons(ST_SetSRID(ST_Extent(geom), 3310), 5000) geom
    FROM cpad_superunits
  ) AS _;

ALTER TABLE instagram_array ADD UNIQUE (lat, lng, radius);
