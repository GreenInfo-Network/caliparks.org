-- custom functions not included in the tables DB dump
-- you will need to load these into the new DB before loading the main file contaning the tables and data
-- these should never change as the harvesters haven't operated in a few years (2013?)


CREATE FUNCTION cdb_hexagongrid(ext geometry, side double precision, origin geometry DEFAULT NULL::geometry) RETURNS SETOF geometry
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
  h GEOMETRY; -- hexagon
  c GEOMETRY; -- center point
  rec RECORD;
  hstep FLOAT8; -- horizontal step
  vstep FLOAT8; -- vertical step
  vstart FLOAT8;
  vstartary FLOAT8[];
  vstartidx INTEGER;
  hskip BIGINT;
  hstart FLOAT8;
  hend FLOAT8;
  vend FLOAT8;
  xoff FLOAT8;
  yoff FLOAT8;
  xgrd FLOAT8;
  ygrd FLOAT8;
  srid INTEGER;
BEGIN

  --            |     |     
  --            |hstep|
  --  ______   ___    |    
  --  vstep  /     \ ___ /
  --  ______ \ ___ /     \  
  --         /     \ ___ / 
  --
  --
  RAISE DEBUG 'Side: %', side;

  vstep := side * sqrt(3); -- x 2 ?
  hstep := side * 1.5;

  RAISE DEBUG 'vstep: %', vstep;
  RAISE DEBUG 'hstep: %', hstep;

  srid := ST_SRID(ext);

  xoff := 0; 
  yoff := 0;

  IF origin IS NOT NULL THEN
    IF ST_SRID(origin) != srid THEN
      RAISE EXCEPTION 'SRID mismatch between extent (%) and origin (%)', srid, ST_SRID(origin);
    END IF;
    xoff := ST_X(origin);
    yoff := ST_Y(origin);
  END IF;

  RAISE DEBUG 'X offset: %', xoff;
  RAISE DEBUG 'Y offset: %', yoff;

  xgrd := side * 0.5;
  ygrd := ( side * sqrt(3) ) / 2.0;
  RAISE DEBUG 'X grid size: %', xgrd;
  RAISE DEBUG 'Y grid size: %', ygrd;

  -- Tweak horizontal start on hstep*2 grid from origin 
  hskip := ceil((ST_XMin(ext)-xoff)/hstep);
  RAISE DEBUG 'hskip: %', hskip;
  hstart := xoff + hskip*hstep;
  RAISE DEBUG 'hstart: %', hstart;

  -- Tweak vertical start on hstep grid from origin 
  vstart := yoff + ceil((ST_Ymin(ext)-yoff)/vstep)*vstep; 
  RAISE DEBUG 'vstart: %', vstart;

  hend := ST_XMax(ext);
  vend := ST_YMax(ext);

  IF vstart - (vstep/2.0) < ST_YMin(ext) THEN
    vstartary := ARRAY[ vstart + (vstep/2.0), vstart ];
  ELSE
    vstartary := ARRAY[ vstart - (vstep/2.0), vstart ];
  END IF;

  vstartidx := abs(hskip)%2;

  RAISE DEBUG 'vstartary: % : %', vstartary[1], vstartary[2];
  RAISE DEBUG 'vstartidx: %', vstartidx;

  c := ST_SetSRID(ST_MakePoint(hstart, vstartary[vstartidx+1]), srid);
  h := ST_SnapToGrid(CDB_MakeHexagon(c, side), xoff, yoff, xgrd, ygrd);
  vstartidx := (vstartidx + 1) % 2;
  WHILE ST_X(c) < hend LOOP -- over X
    --RAISE DEBUG 'X loop starts, center point: %', ST_AsText(c);
    WHILE ST_Y(c) < vend LOOP -- over Y
      --RAISE DEBUG 'Center: %', ST_AsText(c);
      --h := ST_SnapToGrid(CDB_MakeHexagon(c, side), xoff, yoff, xgrd, ygrd);
      RETURN NEXT h;
      h := ST_SnapToGrid(ST_Translate(h, 0, vstep), xoff, yoff, xgrd, ygrd);
      c := ST_Translate(c, 0, vstep);  -- TODO: drop ?
    END LOOP;
    -- TODO: translate h direcly ...
    c := ST_SetSRID(ST_MakePoint(ST_X(c)+hstep, vstartary[vstartidx+1]), srid);
    h := ST_SnapToGrid(CDB_MakeHexagon(c, side), xoff, yoff, xgrd, ygrd);
    vstartidx := (vstartidx + 1) % 2;
  END LOOP;

  RETURN;
END
$$;





CREATE FUNCTION cdb_makehexagon(center geometry, radius double precision) RETURNS geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
  SELECT ST_MakePolygon(ST_MakeLine(geom))
    FROM
    (
      SELECT (ST_DumpPoints(ST_ExteriorRing(ST_Buffer($1, $2, 3)))).*
    ) as points
    WHERE path[1] % 2 != 0
$_$;







CREATE FUNCTION cdb_rectanglegrid(ext geometry, width double precision, height double precision, origin geometry DEFAULT NULL::geometry) RETURNS SETOF geometry
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
  h GEOMETRY; -- rectangle cell
  hstep FLOAT8; -- horizontal step
  vstep FLOAT8; -- vertical step
  hw FLOAT8; -- half width
  hh FLOAT8; -- half height
  vstart FLOAT8;
  hstart FLOAT8;
  hend FLOAT8;
  vend FLOAT8;
  xoff FLOAT8;
  yoff FLOAT8;
  xgrd FLOAT8;
  ygrd FLOAT8;
  x FLOAT8;
  y FLOAT8;
  srid INTEGER;
BEGIN

  srid := ST_SRID(ext);

  xoff := 0; 
  yoff := 0;

  IF origin IS NOT NULL THEN
    IF ST_SRID(origin) != srid THEN
      RAISE EXCEPTION 'SRID mismatch between extent (%) and origin (%)', srid, ST_SRID(origin);
    END IF;
    xoff := ST_X(origin);
    yoff := ST_Y(origin);
  END IF;

  --RAISE DEBUG 'X offset: %', xoff;
  --RAISE DEBUG 'Y offset: %', yoff;

  hw := width/2.0;
  hh := height/2.0;

  xgrd := hw;
  ygrd := hh;
  --RAISE DEBUG 'X grid size: %', xgrd;
  --RAISE DEBUG 'Y grid size: %', ygrd;

  hstep := width;
  vstep := height;

  -- Tweak horizontal start on hstep grid from origin 
  hstart := xoff + ceil((ST_XMin(ext)-xoff)/hstep)*hstep; 
  --RAISE DEBUG 'hstart: %', hstart;

  -- Tweak vertical start on vstep grid from origin 
  vstart := yoff + ceil((ST_Ymin(ext)-yoff)/vstep)*vstep; 
  --RAISE DEBUG 'vstart: %', vstart;

  hend := ST_XMax(ext);
  vend := ST_YMax(ext);

  --RAISE DEBUG 'hend: %', hend;
  --RAISE DEBUG 'vend: %', vend;

  x := hstart;
  WHILE x < hend LOOP -- over X
    y := vstart;
    h := ST_MakeEnvelope(x-hw, y-hh, x+hw, y+hh, srid);
    WHILE y < vend LOOP -- over Y
      RETURN NEXT h;
      h := ST_Translate(h, 0, vstep);
      y := yoff + round(((y + vstep)-yoff)/ygrd)*ygrd; -- round to grid
    END LOOP;
    x := xoff + round(((x + hstep)-xoff)/xgrd)*xgrd; -- round to grid
  END LOOP;

  RETURN;
END
$$;





CREATE FUNCTION getintersectinghexagons(extent geometry, radius double precision) RETURNS SETOF geometry
    LANGUAGE plpgsql
    AS $$
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
$$;




CREATE FUNCTION set_lastupdate() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.lastupdate := now();
  RETURN NEW;
END;
$$;






CREATE FUNCTION update_flickr_photos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    IF (TG_OP = 'INSERT' AND NEW.superunit_id IS NULL) THEN
      -- check intersection on INSERT
      NEW.superunit_id := (SELECT superunit_id
        FROM cpad_superunits cpad
        WHERE ST_Intersects(ST_Transform(NEW.geom, ST_SRID(cpad.geom)), cpad.geom));

      IF NEW.superunit_id IS NULL THEN
        RETURN NULL; -- don't insert
      END IF;

      RETURN NEW;
    END IF;
  END;
$$;





CREATE FUNCTION update_foursquare_venues() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    IF (TG_OP = 'INSERT' AND NEW.superunit_id IS NULL) THEN
      -- check intersection on INSERT
      NEW.superunit_id := (SELECT superunit_id
        FROM cpad_superunits cpad
        WHERE ST_Intersects(ST_Transform(NEW.geom, ST_SRID(cpad.geom)), cpad.geom));

      IF NEW.superunit_id IS NULL THEN
        RETURN NULL; -- don't insert
      END IF;

      RETURN NEW;
    END IF;
  END;
$$;






CREATE FUNCTION update_instagram_photos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    IF (TG_OP = 'INSERT' AND NEW.superunit_id IS NULL) THEN
      -- check intersection on INSERT
      NEW.superunit_id := (SELECT superunit_id
        FROM cpad_superunits cpad
        WHERE ST_Intersects(ST_Transform(NEW.geom, ST_SRID(cpad.geom)), cpad.geom) LIMIT 1);

      IF NEW.superunit_id IS NULL THEN
        RETURN NULL; -- don't insert
      END IF;

      RETURN NEW;
    END IF;
  END;
$$;




--
-- end of functions dump
--
