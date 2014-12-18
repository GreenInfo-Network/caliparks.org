-- matching on integers is way better than integer <-> numeric
ALTER TABLE cpad_2014b7 ALTER COLUMN suid_nma TYPE integer;

DROP VIEW IF EXISTS cpad_superunits;
CREATE VIEW cpad_superunits AS
  SELECT
    suid_nma AS superunit_id,
    park_name AS unit_name,
    access_typ,
    manager_id,
    park_url,
    mng_agncy,
    layer,
    label_name,
    gis_acres,
    geom
  FROM cpad_2014b7;
