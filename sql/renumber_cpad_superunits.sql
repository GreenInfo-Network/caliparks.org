UPDATE instagram_photos photos
  SET superunit_id = changes.new
FROM superunit_changes changes 
WHERE photos.superunit_id = changes.old;

UPDATE flickr_photos photos
  SET superunit_id = changes.new
FROM superunit_changes changes 
WHERE photos.superunit_id = changes.old;

UPDATE foursquare_venues venues
  SET superunit_id = changes.new
FROM superunit_changes changes 
WHERE venues.superunit_id = changes.old;
