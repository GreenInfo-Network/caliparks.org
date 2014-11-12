DROP TABLE IF EXISTS park_stats;
CREATE TABLE park_stats (
  superunit_id integer UNIQUE NOT NULL,
  flickr_photo_count integer NOT NULL DEFAULT 0,
  instagram_photo_count integer NOT NULL DEFAULT 0,
  foursquare_tip_count integer NOT NULL DEFAULT 0,
  foursquare_venue_count integer NOT NULL DEFAULT 0,
  swarm_checkin_count integer NOT NULL DEFAULT 0,
  tweet_count integer NOT NULL DEFAULT 0,
  hipcamp_activity_count integer NOT NULL DEFAULT 0,
  cpad_facility_count integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone DEFAULT NOW()
);

CREATE INDEX park_stats_superunit_id_idx ON park_stats (superunit_id);

INSERT INTO park_stats (superunit_id)
  SELECT
    cpad_superunits.superunit_id
  FROM
    cpad_superunits;
