-- Stillwater Cove Regional Park
UPDATE flickr_photos SET superunit_id = 27985 WHERE superunit_id IN (12640, 1756);
UPDATE instagram_photos SET superunit_id = 27985 WHERE superunit_id IN (12640, 1756);

-- Lynch Canyon
UPDATE flickr_photos SET superunit_id = 12640 WHERE superunit_id = 12543;
UPDATE instagram_photos SET superunit_id = 12640 WHERE superunit_id = 12543;

-- Truckee River Wildlife Area
UPDATE flickr_photos SET superunit_id = 12543 WHERE superunit_id IN (1327, 1328, 1332);
UPDATE instagram_photos SET superunit_id = 12543 WHERE superunit_id IN (1327, 1328, 1332);

DROP MATERIALIZED VIEW cpad_superunits;
DROP TABLE cpad_units;
