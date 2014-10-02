DROP MATERIALIZED VIEW IF EXISTS cpad_superunits;
CREATE MATERIALIZED VIEW cpad_superunits AS
  SELECT
    su_n_m_a AS superunit_id,
    MAX(unit_name) unit_name,
    MAX(mng_ag_id) mng_ag_id,
    MAX(mng_agncy) mng_agncy,
    MAX(access_typ) access_typ,
    SUM(gis_acres) gis_acres,
    ST_Union(geom) geom
  FROM cpad_units
  GROUP BY su_n_m_a
  ORDER BY ST_GeoHash(ST_Transform(ST_SetSRID(ST_Extent(geom), 3310), 4326));
CREATE INDEX cpad_superunits_pk ON cpad_superunits (superunit_id);
CREATE INDEX cpad_superunits_geom_idx ON cpad_superunits USING GIST(geom);
