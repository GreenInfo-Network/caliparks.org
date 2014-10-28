DROP TABLE IF EXISTS foursquare_venues;
CREATE TABLE foursquare_venues (
  id serial PRIMARY KEY,
  venue_id varchar(80),
  superunit_id int NOT NULL,
  metadata json,
  geom geometry(Point, 4326)
);

CREATE INDEX foursquare_venues_geom_gist ON foursquare_venues USING GIST(geom);
CREATE INDEX foursquare_venues_superunit_id_idx ON foursquare_venues(superunit_id);

CREATE OR REPLACE FUNCTION update_foursquare_venues() RETURNS TRIGGER AS $$
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

CREATE TRIGGER filter_foursquare_venues_by_park_shape
BEFORE INSERT ON foursquare_venues
  FOR EACH ROW EXECUTE PROCEDURE update_foursquare_venues();

CREATE OR REPLACE RULE foursquare_venues_ignore_duplicate_inserts AS
  ON INSERT TO foursquare_venues
    WHERE (EXISTS (SELECT 1
      FROM foursquare_venues
      WHERE foursquare_venues.venue_id = NEW.venue_id)) DO INSTEAD NOTHING;
