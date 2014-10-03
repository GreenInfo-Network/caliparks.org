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

CREATE OR REPLACE FUNCTION GetIntersectingHexagons(extent geometry, radius float)
  RETURNS SETOF geometry AS
$$
DECLARE
  hex geometry;
  i int := 0;
BEGIN
  FOR hex IN
    SELECT CDB_HexagonGrid(extent, radius)
  LOOP
    i := i + 1;
    IF i % 100 = 0 THEN
      RAISE NOTICE 'checked %', i;
    END IF;

    PERFORM superunit_id
    FROM cpad_superunits
    WHERE ST_DWithin(geom, ST_Centroid(hex), radius);

    IF FOUND THEN
      RETURN NEXT hex;
    END IF;
  END LOOP;

  RETURN;
END
$$ LANGUAGE 'plpgsql';

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

-- How to subdivide hexagons that are present
-- insert into instagram_array
--   select
--     ST_Y(ST_Centroid(geom)) AS lat,
--     ST_X(ST_Centroid(geom)) AS lng,
--     1000 AS radius,
--     geom AS the_geom
--   FROM (
--     SELECT GetIntersectingHexagons(ST_Buffer(ST_Centroid(the_geom), 5000), 1000) geom
--     FROM instagram_array
--     WHERE radius = 5000
--   ) AS _;
