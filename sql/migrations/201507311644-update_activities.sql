DROP VIEW IF EXISTS activities CASCADE;
ALTER TABLE parks_stats ADD COLUMN activity_count integer NOT NULL DEFAULT 0;
