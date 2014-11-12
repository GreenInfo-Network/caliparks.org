DROP VIEW IF EXISTS activities;

CREATE VIEW activities AS
  WITH hipcamp AS (
    SELECT
      superunit_id,
      ARRAY_AGG(key) AS activities
      FROM
        (
          SELECT
            su_id AS superunit_id,
            activities
          FROM site_hipcamp_activities
        ) AS hipcamp,
        json_each(hipcamp.activities)
    WHERE value::text = 'true'
    GROUP BY superunit_id
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
