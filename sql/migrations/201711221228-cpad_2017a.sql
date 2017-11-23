-- clean up old CPAD versions
DROP TABLE cpad_2013b_superunits_ids_4326;
DROP TABLE cpad_2014b7;
DROP TABLE cpad_2014b8;
DROP TABLE cpad_2014b9;

CREATE UNIQUE INDEX cpad_2017a_suid_nma ON cpad_2017a (suid_nma);

DROP VIEW IF EXISTS activities;
DROP MATERIALIZED VIEW IF EXISTS cpad_facilities;
DROP VIEW IF EXISTS cpad_superunits;
CREATE VIEW cpad_superunits AS
  SELECT
    suid_nma AS superunit_id,
    park_name AS unit_name,
    access_typ,
    mng_ag_id AS manager_id,
    park_url,
    mng_agency AS mng_agncy,
    layer,
    label_name,
    acres AS gis_acres,
    geom
  FROM cpad_2017a;

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

CREATE VIEW activities AS
  WITH a AS (
    SELECT activities_raw.su_id AS superunit_id,
      activities_raw.activities
    FROM activities_raw
  ), cpad AS (
    SELECT cpad_facilities.superunit_id,
      array_agg(DISTINCT cpad_facilities.type) AS facilities
    FROM cpad_facilities
    GROUP BY cpad_facilities.superunit_id
  )
  SELECT superunit_id,
    a.activities || cpad.facilities AS activities
  FROM a
  FULL JOIN cpad USING (superunit_id);

DROP MATERIALIZED VIEW IF EXISTS cpad_labels;
CREATE MATERIALIZED VIEW cpad_labels AS
  SELECT
    suid_nma AS superunit_id,
    park_name AS name,
    acres AS size,
    geom
  FROM cpad_2017a
  WHERE
    access_typ IN ('Open Access')
    AND park_name NOT IN (
      'BLM',
      'California State Lands Commission',
      'County Park',
      'EBMUD',
      'Haggin Oaks Gulf Course',
      'Hetch Hetchy Water and Power',
      'Joshua Tree National Park Linkage',
      'Lake Tahoe Basin Management Unit',
      'Los Angeles Department of Water and Power',
      'Los Vaqueros Watershed',
      'Marin County Flood Control',
      'Marin Municipal Water District Watershed',
      'Other Federal',
      'Park',
      'Preserve',
      'Preserve Areas',
      'Salton Sea - Bureau of Rec',
      'Salton Sea - Irrigation District',
      'San Francisco Watershed Lands',
      'State of California',
      'USBR',
      'USFS',
      'United States Bureau of Reclamation',
      'United States Forest Service',
      'United States Of America',
      'United States of America',
      'Water Lots'
      )
    AND park_name !~ 'holding'
    AND park_name !~ 'Property$'
    AND park_name !~ 'Private'
    AND park_name !~ 'TaxDef'
    AND park_name !~ '\d+$'
    AND park_name !~ 'Unknown'
    AND park_name !~ 'Acq'
    AND park_name !~ 'Unnamed'
  ORDER BY ST_GeoHash(ST_Transform(ST_Envelope(geom), 4326)), size DESC;

CREATE INDEX cpad_labels_geom_gist ON cpad_labels USING GIST(geom);

DROP TABLE cpad_2015a;

DROP TABLE instagram_regions_old;
