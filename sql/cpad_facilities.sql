DROP MATERIALIZED VIEW IF EXISTS cpad_facilities;

CREATE MATERIALIZED VIEW cpad_facilities AS
  SELECT
    fac_id,
    cpad.superunit_id,
    rec.geom,
    CASE rec.fac_type WHEN 'Playground' THEN 'Playground'
                  WHEN 'Tennis/racquet court' THEN 'Tennis'
                  WHEN 'Ball field (soccer, baseball, football)' THEN 'Ball fields'
                  WHEN 'Basketball court' THEN 'Basketball'
                  WHEN 'Covered picnic area' THEN 'Covered picnic tables'
    END as type,
    park_name AS name,
    quantity,
    access
  FROM rec_facil_ca rec
  JOIN cpad_superunits cpad ON ST_Intersects(cpad.geom, ST_Transform(rec.geom, ST_SRID(cpad.geom)))
  WHERE rec.fac_type IN ('Playground', 'Tennis/racquet court', 'Ball field (soccer, baseball, football)', 'Basketball court', 'Covered picnic area');

  CREATE INDEX cpad_facilities_geom_gist ON cpad_facilities USING GIST(geom);
  CREATE INDEX cpad_facilities_superunit_id_idx ON cpad_facilities(superunit_id);
