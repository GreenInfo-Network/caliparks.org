DROP TABLE IF EXISTS flickr_metadata;
create table flickr_metadata (
  su_id int,
  latMin float,
  lngMin float,
  latMax float,
  lngMax float,
  date timestamp,
  count int,
  pages int,
  the_geom geometry(Polygon, 4326)
);
