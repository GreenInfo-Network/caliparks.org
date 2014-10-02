DROP TABLE IF EXISTS instagram_metadata;
CREATE TABLE instagram_metadata (
  su_id int,
  lat float,
  lng float,
  radius float,
  date timestamp,
  count int,
  the_geom geometry(Polygon, 3310)
);
