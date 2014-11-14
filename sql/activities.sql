DROP VIEW IF EXISTS activities;

CREATE VIEW activities AS
  WITH hipcamp AS (
    SELECT
      su_id AS superunit_id,
      activities
    FROM site_hipcamp_activities
  ),
  cpad AS (
    SELECT
      superunit_id,
      ARRAY_AGG(DISTINCT type) AS facilities
    FROM cpad_facilities
    GROUP BY superunit_id
  )
  SELECT
    superunit_id,
    hipcamp.activities || cpad.facilities AS activities
  FROM hipcamp
  FULL OUTER JOIN cpad USING (superunit_id);
