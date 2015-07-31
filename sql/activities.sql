DROP VIEW IF EXISTS activities;

CREATE VIEW activities AS
  WITH a AS (
    SELECT
      su_id AS superunit_id,
      activities
    FROM activities_raw
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
    a.activities || cpad.facilities AS activities
  FROM a
  FULL OUTER JOIN cpad USING (superunit_id);
