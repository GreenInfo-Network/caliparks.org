DROP TABLE IF EXISTS flickr_photos;
CREATE TABLE flickr_photos (
  photoid bigint PRIMARY KEY,
  owner varchar(20),
  secret varchar(20),
  server int,
  farm int,
  title varchar,
  latitude float,
  longitude float,
  accuracy int,
  context int,
  place_id varchar(20),
  woeid bigint,
  tags varchar,
  dateupload int,
  datetaken varchar(30),
  ownername varchar,
  description varchar,
  license int,
  url_o varchar(80),
  width_o int,
  height_o int,
  url_largest varchar(80),
  height_largest int,
  width_largest int,
  largest_size char,
  the_geom geometry(Point, 4326)
);

CREATE INDEX flickr_photos_the_geom_gist ON flickr_photos USING GIST(the_geom);

CREATE OR REPLACE FUNCTION update_flickr_photos() RETURNS TRIGGER AS $$
  BEGIN
    IF (TG_OP = 'INSERT') THEN
      -- check intersection on INSERT
      PERFORM superunit_id
      FROM cpad_superunits
      WHERE ST_Intersects(ST_Transform(NEW.the_geom, 3857), geom);

      IF NOT FOUND THEN
        RETURN NULL; -- don't insert
      END IF;

      RETURN NEW;
    END IF;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER filter_by_park_shape
BEFORE INSERT ON flickr_photos
  FOR EACH ROW EXECUTE PROCEDURE update_flickr_photos();
