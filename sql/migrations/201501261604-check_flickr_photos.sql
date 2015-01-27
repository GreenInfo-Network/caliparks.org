ALTER TABLE flickr_photos ADD COLUMN locked_at timestamp with time zone;
ALTER TABLE flickr_photos ADD COLUMN last_checked timestamp with time zone;

CREATE INDEX flickr_photos_locked_at ON flickr_photos (locked_at);
CREATE INDEX flickr_photos_last_checked ON flickr_photos (last_checked);
