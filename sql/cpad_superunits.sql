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
  FROM cpad_2015a
  WHERE suid_nma NOT IN (16161, 16162, 16163, 16166, 16164, 16165);
