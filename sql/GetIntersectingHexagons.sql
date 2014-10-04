CREATE OR REPLACE FUNCTION GetIntersectingHexagons(extent geometry, radius float)
  RETURNS SETOF geometry AS
$$
DECLARE
  hex geometry;
  i int := 0;
BEGIN
  FOR hex IN
    SELECT CDB_HexagonGrid(extent, radius)
  LOOP
    i := i + 1;
    IF i % 100 = 0 THEN
      RAISE NOTICE 'checked %', i;
    END IF;

    PERFORM superunit_id
    FROM cpad_superunits
    WHERE ST_DWithin(geom, ST_Centroid(hex), radius);

    IF FOUND THEN
      RETURN NEXT hex;
    END IF;
  END LOOP;

  RETURN;
END
$$ LANGUAGE 'plpgsql';
