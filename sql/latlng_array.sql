DROP MATERIALIZED VIEW IF EXISTS latlng_array;
CREATE MATERIALIZED VIEW latlng_array AS
  WITH cells AS (
    SELECT (ST_Dump(CDB_RectangleGrid(ST_SetSRID(ST_Extent(geom), 4326), 0.1, 0.1))).  geom
    FROM cpad_superunits
  )
  SELECT
    superunit_id AS su_id,
    ST_YMin(cells.geom) latmin,
    ST_XMin(cells.geom) lngmin,
    ST_YMax(cells.geom) latmax,
    ST_XMax(cells.geom) lngmax,
    cells.geom the_geom
  FROM cpad_superunits
  JOIN cells ON ST_Intersects(cpad_superunits.geom, cells.geom);