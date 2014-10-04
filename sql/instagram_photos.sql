DROP TABLE IF EXISTS instagram_photos;
CREATE TABLE instagram_photos (
  id serial PRIMARY KEY,
  photo_id varchar(40) UNIQUE,
  metadata json,
  geom geometry(Point, 4326)
);

CREATE INDEX instagram_photos_geom_gist ON instagram_photos USING GIST(geom);

-- TODO duplicates update_flickr_photos except for the geometry transformation
CREATE OR REPLACE FUNCTION update_instagram_photos() RETURNS TRIGGER AS $$
  BEGIN
    IF (TG_OP = 'INSERT') THEN
      -- check intersection on INSERT
      PERFORM superunit_id
      FROM cpad_superunits cpad
      WHERE ST_Intersects(ST_Transform(NEW.geom, ST_SRID(cpad.geom)), cpad.geom);

      IF NOT FOUND THEN
        RETURN NULL; -- don't insert
      END IF;

      RETURN NEW;
    END IF;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER filter_instagram_by_park_shape
BEFORE INSERT ON instagram_photos
  FOR EACH ROW EXECUTE PROCEDURE update_instagram_photos();

CREATE OR REPLACE RULE instagram_photos_ignore_duplicate_inserts AS
  ON INSERT TO instagram_photos
    WHERE (EXISTS (SELECT 1
      FROM instagram_photos
      WHERE instagram_photos.photo_id = NEW.photo_id)) DO INSTEAD NOTHING;
