UPDATE instagram_photos
SET superunit_id = -1;

CREATE TEMPORARY TABLE cpad_4326 AS
  SELECT
    superunit_id,
    ST_Transform(ST_Buffer(geom, 250), 4326) geom
  FROM cpad_superunits;
CREATE INDEX cpad_4326_geom_gist ON cpad_4326 USING GIST(geom);

UPDATE instagram_photos
SET superunit_id=cpad.superunit_id
FROM cpad_4326 cpad
WHERE ST_Contains(cpad.geom, instagram_photos.geom);
