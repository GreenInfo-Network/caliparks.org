DROP TABLE IF EXISTS flickr_regions;
CREATE TABLE flickr_regions (
  id serial PRIMARY KEY,
  width double precision NOT NULL,
  locked_at timestamp with time zone,
  count integer NOT NULL DEFAULT 0,
  last_fetched timestamp,
  geom geometry(Polygon, 4326) NOT NULL UNIQUE
);

CREATE INDEX flickr_regions_geom_gist ON flickr_regions USING GIST(geom);

INSERT INTO flickr_regions (geom, width)
  WITH cells AS (
    SELECT (ST_Dump(CDB_RectangleGrid(ST_Transform(ST_SetSRID(ST_Extent(geom), 3310), 4326), 0.1, 0.1))).geom
    FROM cpad_superunits
  )
  SELECT
    DISTINCT cells.geom,
    0.1 AS width
  FROM cells
  JOIN cpad_superunits ON ST_Intersects(cpad_superunits.geom, ST_Transform(cells.geom, ST_SRID(cpad_superunits.geom)));
