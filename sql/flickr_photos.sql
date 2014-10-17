DROP TABLE IF EXISTS flickr_photos;
CREATE TABLE flickr_photos (
  id serial PRIMARY KEY,
  photo_id bigint NOT NULL,
  superunit_id int NOT NULL,
  metadata json,
  geom geometry(Point, 4326)
);

CREATE INDEX flickr_photos_geom_gist ON flickr_photos USING GIST(geom);
CREATE INDEX flickr_photos_superunit_id_idx ON flickr_photos(superunit_id);

-- TODO duplicates update_instagram_photos
CREATE OR REPLACE FUNCTION update_flickr_photos() RETURNS TRIGGER AS $$
  BEGIN
    IF (TG_OP = 'INSERT' AND NEW.superunit_id IS NULL) THEN
      -- check intersection on INSERT
      NEW.superunit_id := (SELECT superunit_id
        FROM cpad_superunits cpad
        WHERE ST_Intersects(ST_Transform(NEW.geom, ST_SRID(cpad.geom)), cpad.geom));

      IF NEW.superunit_id IS NULL THEN
        RETURN NULL; -- don't insert
      END IF;

      RETURN NEW;
    END IF;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER filter_by_park_shape
BEFORE INSERT ON flickr_photos
  FOR EACH ROW EXECUTE PROCEDURE update_flickr_photos();
