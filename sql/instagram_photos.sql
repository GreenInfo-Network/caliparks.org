DROP TABLE IF EXISTS instagram_photos;
CREATE TABLE instagram_photos (
  id serial PRIMARY KEY,
  photoid varchar(40) UNIQUE,
  attribution varchar,
  latitude float,
  longitude float,
  placename varchar,
  placeid bigint,
  commentcount int,
  filter varchar(20),
  created_time bigint,
  link varchar,
  likescount int,
  standard_resolution varchar,
  width int,
  height int,
  caption varchar,
  username varchar(40),
  website varchar,
  profile_picture varchar,
  bio varchar,
  userid bigint,
  the_geom geometry(Point, 4326)
);

CREATE INDEX instagram_photos_the_geom_gist ON instagram_photos USING GIST(the_geom);

-- TODO duplicates update_flickr_photos
CREATE OR REPLACE FUNCTION update_instagram_photos() RETURNS TRIGGER AS $$
  BEGIN
    IF (TG_OP = 'INSERT') THEN
      -- check intersection on INSERT
      PERFORM superunit_id
      FROM cpad_superunits
      WHERE ST_Intersects(ST_Transform(NEW.the_geom, ST_SRID(geom)), geom);

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
