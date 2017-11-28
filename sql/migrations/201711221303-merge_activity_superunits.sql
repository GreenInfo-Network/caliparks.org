WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15180
    ))
    FROM activities_raw
    WHERE su_id=15180) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  7189,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (7189, 15180)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=7189;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15181
    ))
    FROM activities_raw
    WHERE su_id=15181) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 15181)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15184
    ))
    FROM activities_raw
    WHERE su_id=15184) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30763,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30763, 15184)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30763;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15187
    ))
    FROM activities_raw
    WHERE su_id=15187) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30184,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30184, 15187)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30184;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15196
    ))
    FROM activities_raw
    WHERE su_id=15196) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28921,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28921, 15196)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28921;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15198
    ))
    FROM activities_raw
    WHERE su_id=15198) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30220,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30220, 15198)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30220;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15199
    ))
    FROM activities_raw
    WHERE su_id=15199) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29226,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29226, 15199)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29226;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15203
    ))
    FROM activities_raw
    WHERE su_id=15203) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28722,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28722, 15203)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28722;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15204
    ))
    FROM activities_raw
    WHERE su_id=15204) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28613,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28613, 15204)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28613;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15209
    ))
    FROM activities_raw
    WHERE su_id=15209) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  22488,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (22488, 15209)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=22488;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15211
    ))
    FROM activities_raw
    WHERE su_id=15211) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29159,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29159, 15211)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29159;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15212
    ))
    FROM activities_raw
    WHERE su_id=15212) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29160,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29160, 15212)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29160;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15232
    ))
    FROM activities_raw
    WHERE su_id=15232) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29497,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29497, 15232)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29497;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15233
    ))
    FROM activities_raw
    WHERE su_id=15233) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29496,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29496, 15233)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29496;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15239
    ))
    FROM activities_raw
    WHERE su_id=15239) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 15239)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15240
    ))
    FROM activities_raw
    WHERE su_id=15240) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29513,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29513, 15240)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29513;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15258
    ))
    FROM activities_raw
    WHERE su_id=15258) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30043,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30043, 15258)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30043;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15268
    ))
    FROM activities_raw
    WHERE su_id=15268) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29925,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29925, 15268)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29925;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15269
    ))
    FROM activities_raw
    WHERE su_id=15269) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29027,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29027, 15269)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29027;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15282
    ))
    FROM activities_raw
    WHERE su_id=15282) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 15282)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15291
    ))
    FROM activities_raw
    WHERE su_id=15291) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29504,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29504, 15291)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29504;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10661
    ))
    FROM activities_raw
    WHERE su_id=10661) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29024,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29024, 10661)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29024;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15312
    ))
    FROM activities_raw
    WHERE su_id=15312) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30594,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30594, 15312)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30594;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15311
    ))
    FROM activities_raw
    WHERE su_id=15311) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30594,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30594, 15311)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30594;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15321
    ))
    FROM activities_raw
    WHERE su_id=15321) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31601,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31601, 15321)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31601;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15330
    ))
    FROM activities_raw
    WHERE su_id=15330) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30562,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30562, 15330)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30562;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15329
    ))
    FROM activities_raw
    WHERE su_id=15329) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30562,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30562, 15329)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30562;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15355
    ))
    FROM activities_raw
    WHERE su_id=15355) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29685,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29685, 15355)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29685;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15408
    ))
    FROM activities_raw
    WHERE su_id=15408) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30744,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30744, 15408)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30744;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15409
    ))
    FROM activities_raw
    WHERE su_id=15409) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31461,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31461, 15409)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31461;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15412
    ))
    FROM activities_raw
    WHERE su_id=15412) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30021,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30021, 15412)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30021;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15420
    ))
    FROM activities_raw
    WHERE su_id=15420) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 15420)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15421
    ))
    FROM activities_raw
    WHERE su_id=15421) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30792,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30792, 15421)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30792;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15422
    ))
    FROM activities_raw
    WHERE su_id=15422) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31602,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31602, 15422)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31602;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15423
    ))
    FROM activities_raw
    WHERE su_id=15423) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29491,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29491, 15423)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29491;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15437
    ))
    FROM activities_raw
    WHERE su_id=15437) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30584,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30584, 15437)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30584;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11890
    ))
    FROM activities_raw
    WHERE su_id=11890) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29026,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29026, 11890)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29026;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15493
    ))
    FROM activities_raw
    WHERE su_id=15493) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29694,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29694, 15493)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29694;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15509
    ))
    FROM activities_raw
    WHERE su_id=15509) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  20475,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (20475, 15509)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=20475;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15511
    ))
    FROM activities_raw
    WHERE su_id=15511) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 15511)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15512
    ))
    FROM activities_raw
    WHERE su_id=15512) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 15512)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15513
    ))
    FROM activities_raw
    WHERE su_id=15513) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 15513)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15514
    ))
    FROM activities_raw
    WHERE su_id=15514) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 15514)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15515
    ))
    FROM activities_raw
    WHERE su_id=15515) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30411,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30411, 15515)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30411;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15528
    ))
    FROM activities_raw
    WHERE su_id=15528) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  1413,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (1413, 15528)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=1413;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28284
    ))
    FROM activities_raw
    WHERE su_id=28284) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  1413,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (1413, 28284)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=1413;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15530
    ))
    FROM activities_raw
    WHERE su_id=15530) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30751,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30751, 15530)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30751;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15533
    ))
    FROM activities_raw
    WHERE su_id=15533) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  1413,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (1413, 15533)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=1413;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15531
    ))
    FROM activities_raw
    WHERE su_id=15531) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  1413,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (1413, 15531)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=1413;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28285
    ))
    FROM activities_raw
    WHERE su_id=28285) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  1413,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (1413, 28285)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=1413;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28263
    ))
    FROM activities_raw
    WHERE su_id=28263) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30751,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30751, 28263)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30751;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15535
    ))
    FROM activities_raw
    WHERE su_id=15535) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  25466,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (25466, 15535)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=25466;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15537
    ))
    FROM activities_raw
    WHERE su_id=15537) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29039,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29039, 15537)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29039;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=8354
    ))
    FROM activities_raw
    WHERE su_id=8354) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29030,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29030, 8354)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29030;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15556
    ))
    FROM activities_raw
    WHERE su_id=15556) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29150,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29150, 15556)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29150;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15574
    ))
    FROM activities_raw
    WHERE su_id=15574) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31407,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31407, 15574)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31407;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15577
    ))
    FROM activities_raw
    WHERE su_id=15577) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28920,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28920, 15577)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28920;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15578
    ))
    FROM activities_raw
    WHERE su_id=15578) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29050,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29050, 15578)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29050;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1418
    ))
    FROM activities_raw
    WHERE su_id=1418) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31543,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31543, 1418)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31543;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15612
    ))
    FROM activities_raw
    WHERE su_id=15612) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30793,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30793, 15612)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30793;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15618
    ))
    FROM activities_raw
    WHERE su_id=15618) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29429,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29429, 15618)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29429;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14848
    ))
    FROM activities_raw
    WHERE su_id=14848) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29672,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29672, 14848)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29672;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15630
    ))
    FROM activities_raw
    WHERE su_id=15630) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29411,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29411, 15630)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29411;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15646
    ))
    FROM activities_raw
    WHERE su_id=15646) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29794,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29794, 15646)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29794;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15648
    ))
    FROM activities_raw
    WHERE su_id=15648) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30412,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30412, 15648)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30412;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15655
    ))
    FROM activities_raw
    WHERE su_id=15655) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30154,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30154, 15655)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30154;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15660
    ))
    FROM activities_raw
    WHERE su_id=15660) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28614,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28614, 15660)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28614;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15665
    ))
    FROM activities_raw
    WHERE su_id=15665) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31278,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31278, 15665)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31278;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1423
    ))
    FROM activities_raw
    WHERE su_id=1423) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30575,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30575, 1423)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30575;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15729
    ))
    FROM activities_raw
    WHERE su_id=15729) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  10552,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (10552, 15729)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=10552;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15737
    ))
    FROM activities_raw
    WHERE su_id=15737) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30115,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30115, 15737)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30115;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15759
    ))
    FROM activities_raw
    WHERE su_id=15759) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  15758,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (15758, 15759)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=15758;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15761
    ))
    FROM activities_raw
    WHERE su_id=15761) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29859,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29859, 15761)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29859;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15763
    ))
    FROM activities_raw
    WHERE su_id=15763) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  20143,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (20143, 15763)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=20143;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15775
    ))
    FROM activities_raw
    WHERE su_id=15775) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29101,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29101, 15775)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29101;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15787
    ))
    FROM activities_raw
    WHERE su_id=15787) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30329,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30329, 15787)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30329;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15797
    ))
    FROM activities_raw
    WHERE su_id=15797) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 15797)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15807
    ))
    FROM activities_raw
    WHERE su_id=15807) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29525,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29525, 15807)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29525;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15816
    ))
    FROM activities_raw
    WHERE su_id=15816) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29514,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29514, 15816)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29514;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15819
    ))
    FROM activities_raw
    WHERE su_id=15819) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30772,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30772, 15819)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30772;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10663
    ))
    FROM activities_raw
    WHERE su_id=10663) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29189,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29189, 10663)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29189;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15835
    ))
    FROM activities_raw
    WHERE su_id=15835) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28892,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28892, 15835)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28892;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15849
    ))
    FROM activities_raw
    WHERE su_id=15849) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31253,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31253, 15849)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31253;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15852
    ))
    FROM activities_raw
    WHERE su_id=15852) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30988,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30988, 15852)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30988;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15854
    ))
    FROM activities_raw
    WHERE su_id=15854) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30413,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30413, 15854)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30413;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15862
    ))
    FROM activities_raw
    WHERE su_id=15862) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31267,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31267, 15862)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31267;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15867
    ))
    FROM activities_raw
    WHERE su_id=15867) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30414,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30414, 15867)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30414;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15870
    ))
    FROM activities_raw
    WHERE su_id=15870) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30005,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30005, 15870)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30005;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15877
    ))
    FROM activities_raw
    WHERE su_id=15877) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31519,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31519, 15877)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31519;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15911
    ))
    FROM activities_raw
    WHERE su_id=15911) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30623,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30623, 15911)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30623;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15924
    ))
    FROM activities_raw
    WHERE su_id=15924) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31478,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31478, 15924)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31478;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15923
    ))
    FROM activities_raw
    WHERE su_id=15923) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31479,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31479, 15923)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31479;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15957
    ))
    FROM activities_raw
    WHERE su_id=15957) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29779,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29779, 15957)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29779;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15960
    ))
    FROM activities_raw
    WHERE su_id=15960) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29539,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29539, 15960)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29539;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15968
    ))
    FROM activities_raw
    WHERE su_id=15968) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  15969,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (15969, 15968)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=15969;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15970
    ))
    FROM activities_raw
    WHERE su_id=15970) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29029,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29029, 15970)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29029;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15986
    ))
    FROM activities_raw
    WHERE su_id=15986) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28615,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28615, 15986)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28615;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15989
    ))
    FROM activities_raw
    WHERE su_id=15989) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29570,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29570, 15989)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29570;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1430
    ))
    FROM activities_raw
    WHERE su_id=1430) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30556,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30556, 1430)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30556;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16007
    ))
    FROM activities_raw
    WHERE su_id=16007) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29443,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29443, 16007)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29443;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16008
    ))
    FROM activities_raw
    WHERE su_id=16008) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 16008)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16022
    ))
    FROM activities_raw
    WHERE su_id=16022) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29227,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29227, 16022)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29227;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16028
    ))
    FROM activities_raw
    WHERE su_id=16028) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30906,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30906, 16028)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30906;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16032
    ))
    FROM activities_raw
    WHERE su_id=16032) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30069,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30069, 16032)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30069;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12363
    ))
    FROM activities_raw
    WHERE su_id=12363) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28349,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28349, 12363)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28349;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16042
    ))
    FROM activities_raw
    WHERE su_id=16042) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 16042)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16051
    ))
    FROM activities_raw
    WHERE su_id=16051) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29947,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29947, 16051)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29947;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16054
    ))
    FROM activities_raw
    WHERE su_id=16054) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29532,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29532, 16054)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29532;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16061
    ))
    FROM activities_raw
    WHERE su_id=16061) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31603,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31603, 16061)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31603;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16060
    ))
    FROM activities_raw
    WHERE su_id=16060) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30224,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30224, 16060)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30224;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16067
    ))
    FROM activities_raw
    WHERE su_id=16067) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29745,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29745, 16067)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29745;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16074
    ))
    FROM activities_raw
    WHERE su_id=16074) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31520,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31520, 16074)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31520;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16078
    ))
    FROM activities_raw
    WHERE su_id=16078) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28979,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28979, 16078)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28979;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16079
    ))
    FROM activities_raw
    WHERE su_id=16079) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30415,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30415, 16079)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30415;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16089
    ))
    FROM activities_raw
    WHERE su_id=16089) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29065,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29065, 16089)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29065;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16090
    ))
    FROM activities_raw
    WHERE su_id=16090) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30416,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30416, 16090)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30416;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16095
    ))
    FROM activities_raw
    WHERE su_id=16095) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 16095)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16121
    ))
    FROM activities_raw
    WHERE su_id=16121) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30091,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30091, 16121)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30091;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16126
    ))
    FROM activities_raw
    WHERE su_id=16126) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30417,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30417, 16126)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30417;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16128
    ))
    FROM activities_raw
    WHERE su_id=16128) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30589,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30589, 16128)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30589;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=3215
    ))
    FROM activities_raw
    WHERE su_id=3215) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31523,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31523, 3215)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31523;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16135
    ))
    FROM activities_raw
    WHERE su_id=16135) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30143,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30143, 16135)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30143;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16155
    ))
    FROM activities_raw
    WHERE su_id=16155) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30666,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30666, 16155)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30666;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6277
    ))
    FROM activities_raw
    WHERE su_id=6277) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30369,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30369, 6277)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30369;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27905
    ))
    FROM activities_raw
    WHERE su_id=27905) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31355,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31355, 27905)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31355;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16191
    ))
    FROM activities_raw
    WHERE su_id=16191) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29221,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29221, 16191)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29221;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16190
    ))
    FROM activities_raw
    WHERE su_id=16190) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29220,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29220, 16190)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29220;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16195
    ))
    FROM activities_raw
    WHERE su_id=16195) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29513,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29513, 16195)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29513;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16200
    ))
    FROM activities_raw
    WHERE su_id=16200) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28617,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28617, 16200)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28617;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16224
    ))
    FROM activities_raw
    WHERE su_id=16224) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30612,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30612, 16224)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30612;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16229
    ))
    FROM activities_raw
    WHERE su_id=16229) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30590,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30590, 16229)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30590;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6278
    ))
    FROM activities_raw
    WHERE su_id=6278) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31445,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31445, 6278)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31445;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16240
    ))
    FROM activities_raw
    WHERE su_id=16240) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30877,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30877, 16240)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30877;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16243
    ))
    FROM activities_raw
    WHERE su_id=16243) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31294,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31294, 16243)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31294;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16259
    ))
    FROM activities_raw
    WHERE su_id=16259) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31123,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31123, 16259)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31123;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16270
    ))
    FROM activities_raw
    WHERE su_id=16270) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31281,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31281, 16270)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31281;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16289
    ))
    FROM activities_raw
    WHERE su_id=16289) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29228,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29228, 16289)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29228;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16291
    ))
    FROM activities_raw
    WHERE su_id=16291) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31444,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31444, 16291)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31444;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10667
    ))
    FROM activities_raw
    WHERE su_id=10667) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31318,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31318, 10667)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31318;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16334
    ))
    FROM activities_raw
    WHERE su_id=16334) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30720,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30720, 16334)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30720;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16351
    ))
    FROM activities_raw
    WHERE su_id=16351) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31604,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31604, 16351)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31604;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16386
    ))
    FROM activities_raw
    WHERE su_id=16386) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29999,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29999, 16386)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29999;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16392
    ))
    FROM activities_raw
    WHERE su_id=16392) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  3221,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (3221, 16392)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=3221;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16395
    ))
    FROM activities_raw
    WHERE su_id=16395) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  3221,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (3221, 16395)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=3221;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16419
    ))
    FROM activities_raw
    WHERE su_id=16419) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30315,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30315, 16419)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30315;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16427
    ))
    FROM activities_raw
    WHERE su_id=16427) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31524,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31524, 16427)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31524;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16428
    ))
    FROM activities_raw
    WHERE su_id=16428) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31525,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31525, 16428)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31525;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16486
    ))
    FROM activities_raw
    WHERE su_id=16486) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31085,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31085, 16486)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31085;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16504
    ))
    FROM activities_raw
    WHERE su_id=16504) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 16504)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16511
    ))
    FROM activities_raw
    WHERE su_id=16511) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29534,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29534, 16511)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29534;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16513
    ))
    FROM activities_raw
    WHERE su_id=16513) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30524,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30524, 16513)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30524;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16532
    ))
    FROM activities_raw
    WHERE su_id=16532) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31037,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31037, 16532)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31037;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16536
    ))
    FROM activities_raw
    WHERE su_id=16536) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29615,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29615, 16536)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29615;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16542
    ))
    FROM activities_raw
    WHERE su_id=16542) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  11482,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (11482, 16542)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=11482;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16606
    ))
    FROM activities_raw
    WHERE su_id=16606) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30419,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30419, 16606)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30419;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16611
    ))
    FROM activities_raw
    WHERE su_id=16611) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30418,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30418, 16611)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30418;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16621
    ))
    FROM activities_raw
    WHERE su_id=16621) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31517,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31517, 16621)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31517;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16622
    ))
    FROM activities_raw
    WHERE su_id=16622) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29571,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29571, 16622)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29571;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16635
    ))
    FROM activities_raw
    WHERE su_id=16635) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29073,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29073, 16635)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29073;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16638
    ))
    FROM activities_raw
    WHERE su_id=16638) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30114,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30114, 16638)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30114;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16645
    ))
    FROM activities_raw
    WHERE su_id=16645) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30118,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30118, 16645)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30118;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16650
    ))
    FROM activities_raw
    WHERE su_id=16650) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30420,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30420, 16650)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30420;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16653
    ))
    FROM activities_raw
    WHERE su_id=16653) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31614,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31614, 16653)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31614;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=7095
    ))
    FROM activities_raw
    WHERE su_id=7095) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29636,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29636, 7095)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29636;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16670
    ))
    FROM activities_raw
    WHERE su_id=16670) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29986,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29986, 16670)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29986;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16684
    ))
    FROM activities_raw
    WHERE su_id=16684) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30591,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30591, 16684)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30591;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16719
    ))
    FROM activities_raw
    WHERE su_id=16719) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30817,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30817, 16719)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30817;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16721
    ))
    FROM activities_raw
    WHERE su_id=16721) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30888,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30888, 16721)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30888;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16739
    ))
    FROM activities_raw
    WHERE su_id=16739) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30765,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30765, 16739)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30765;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16754
    ))
    FROM activities_raw
    WHERE su_id=16754) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31605,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31605, 16754)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31605;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16758
    ))
    FROM activities_raw
    WHERE su_id=16758) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28793,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28793, 16758)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28793;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16759
    ))
    FROM activities_raw
    WHERE su_id=16759) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28794,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28794, 16759)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28794;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16770
    ))
    FROM activities_raw
    WHERE su_id=16770) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30130,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30130, 16770)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30130;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16771
    ))
    FROM activities_raw
    WHERE su_id=16771) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30421,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30421, 16771)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30421;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16777
    ))
    FROM activities_raw
    WHERE su_id=16777) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  10826,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (10826, 16777)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=10826;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16783
    ))
    FROM activities_raw
    WHERE su_id=16783) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29229,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29229, 16783)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29229;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16793
    ))
    FROM activities_raw
    WHERE su_id=16793) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31606,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31606, 16793)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31606;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16807
    ))
    FROM activities_raw
    WHERE su_id=16807) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30422,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30422, 16807)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30422;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16808
    ))
    FROM activities_raw
    WHERE su_id=16808) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28796,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28796, 16808)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28796;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16819
    ))
    FROM activities_raw
    WHERE su_id=16819) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 16819)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1459
    ))
    FROM activities_raw
    WHERE su_id=1459) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29178,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29178, 1459)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29178;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16868
    ))
    FROM activities_raw
    WHERE su_id=16868) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30150,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30150, 16868)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30150;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16869
    ))
    FROM activities_raw
    WHERE su_id=16869) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30152,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30152, 16869)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30152;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16870
    ))
    FROM activities_raw
    WHERE su_id=16870) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30040,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30040, 16870)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30040;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16877
    ))
    FROM activities_raw
    WHERE su_id=16877) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30188,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30188, 16877)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30188;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16912
    ))
    FROM activities_raw
    WHERE su_id=16912) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31268,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31268, 16912)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31268;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16915
    ))
    FROM activities_raw
    WHERE su_id=16915) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30592,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30592, 16915)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30592;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16918
    ))
    FROM activities_raw
    WHERE su_id=16918) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  22273,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (22273, 16918)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=22273;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16924
    ))
    FROM activities_raw
    WHERE su_id=16924) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30423,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30423, 16924)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30423;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16926
    ))
    FROM activities_raw
    WHERE su_id=16926) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29596,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29596, 16926)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29596;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16929
    ))
    FROM activities_raw
    WHERE su_id=16929) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29364,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29364, 16929)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29364;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16940
    ))
    FROM activities_raw
    WHERE su_id=16940) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31226,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31226, 16940)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31226;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=8047
    ))
    FROM activities_raw
    WHERE su_id=8047) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29179,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29179, 8047)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29179;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16943
    ))
    FROM activities_raw
    WHERE su_id=16943) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31405,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31405, 16943)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31405;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16964
    ))
    FROM activities_raw
    WHERE su_id=16964) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29513,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29513, 16964)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29513;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16966
    ))
    FROM activities_raw
    WHERE su_id=16966) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31506,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31506, 16966)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31506;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16990
    ))
    FROM activities_raw
    WHERE su_id=16990) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30832,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30832, 16990)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30832;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=16999
    ))
    FROM activities_raw
    WHERE su_id=16999) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31231,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31231, 16999)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31231;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17000
    ))
    FROM activities_raw
    WHERE su_id=17000) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30424,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30424, 17000)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30424;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17002
    ))
    FROM activities_raw
    WHERE su_id=17002) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30373,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30373, 17002)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30373;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17007
    ))
    FROM activities_raw
    WHERE su_id=17007) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31580,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31580, 17007)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31580;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17034
    ))
    FROM activities_raw
    WHERE su_id=17034) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30769,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30769, 17034)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30769;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17035
    ))
    FROM activities_raw
    WHERE su_id=17035) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29108,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29108, 17035)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29108;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=8422
    ))
    FROM activities_raw
    WHERE su_id=8422) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29070,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29070, 8422)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29070;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17049
    ))
    FROM activities_raw
    WHERE su_id=17049) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29085,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29085, 17049)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29085;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17084
    ))
    FROM activities_raw
    WHERE su_id=17084) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 17084)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17086
    ))
    FROM activities_raw
    WHERE su_id=17086) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30787,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30787, 17086)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30787;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17087
    ))
    FROM activities_raw
    WHERE su_id=17087) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29371,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29371, 17087)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29371;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17089
    ))
    FROM activities_raw
    WHERE su_id=17089) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29022,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29022, 17089)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29022;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17113
    ))
    FROM activities_raw
    WHERE su_id=17113) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 17113)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17114
    ))
    FROM activities_raw
    WHERE su_id=17114) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 17114)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17131
    ))
    FROM activities_raw
    WHERE su_id=17131) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31188,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31188, 17131)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31188;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=5957
    ))
    FROM activities_raw
    WHERE su_id=5957) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29180, 5957)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=5588
    ))
    FROM activities_raw
    WHERE su_id=5588) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29089,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29089, 5588)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29089;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17161
    ))
    FROM activities_raw
    WHERE su_id=17161) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31212,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31212, 17161)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31212;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14201
    ))
    FROM activities_raw
    WHERE su_id=14201) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29181,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29181, 14201)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29181;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14202
    ))
    FROM activities_raw
    WHERE su_id=14202) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29181,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29181, 14202)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29181;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17162
    ))
    FROM activities_raw
    WHERE su_id=17162) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29336,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29336, 17162)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29336;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17170
    ))
    FROM activities_raw
    WHERE su_id=17170) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29428,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29428, 17170)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29428;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17177
    ))
    FROM activities_raw
    WHERE su_id=17177) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29034,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29034, 17177)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29034;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17206
    ))
    FROM activities_raw
    WHERE su_id=17206) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30863,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30863, 17206)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30863;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17212
    ))
    FROM activities_raw
    WHERE su_id=17212) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29942,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29942, 17212)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29942;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17213
    ))
    FROM activities_raw
    WHERE su_id=17213) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29942,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29942, 17213)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29942;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17211
    ))
    FROM activities_raw
    WHERE su_id=17211) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29942,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29942, 17211)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29942;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17215
    ))
    FROM activities_raw
    WHERE su_id=17215) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30046,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30046, 17215)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30046;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17219
    ))
    FROM activities_raw
    WHERE su_id=17219) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31397,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31397, 17219)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31397;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17231
    ))
    FROM activities_raw
    WHERE su_id=17231) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29230,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29230, 17231)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29230;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17233
    ))
    FROM activities_raw
    WHERE su_id=17233) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31451,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31451, 17233)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31451;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17258
    ))
    FROM activities_raw
    WHERE su_id=17258) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30425,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30425, 17258)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30425;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17282
    ))
    FROM activities_raw
    WHERE su_id=17282) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29443,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29443, 17282)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29443;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17293
    ))
    FROM activities_raw
    WHERE su_id=17293) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30002,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30002, 17293)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30002;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17301
    ))
    FROM activities_raw
    WHERE su_id=17301) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30270,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30270, 17301)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30270;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17317
    ))
    FROM activities_raw
    WHERE su_id=17317) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 17317)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17351
    ))
    FROM activities_raw
    WHERE su_id=17351) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29040,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29040, 17351)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29040;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17362
    ))
    FROM activities_raw
    WHERE su_id=17362) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29484,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29484, 17362)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29484;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17354
    ))
    FROM activities_raw
    WHERE su_id=17354) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29726,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29726, 17354)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29726;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17376
    ))
    FROM activities_raw
    WHERE su_id=17376) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30052,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30052, 17376)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30052;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17398
    ))
    FROM activities_raw
    WHERE su_id=17398) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30280,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30280, 17398)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30280;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17404
    ))
    FROM activities_raw
    WHERE su_id=17404) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30627,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30627, 17404)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30627;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17403
    ))
    FROM activities_raw
    WHERE su_id=17403) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30627,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30627, 17403)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30627;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17407
    ))
    FROM activities_raw
    WHERE su_id=17407) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30426,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30426, 17407)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30426;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17415
    ))
    FROM activities_raw
    WHERE su_id=17415) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30779,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30779, 17415)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30779;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17420
    ))
    FROM activities_raw
    WHERE su_id=17420) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29231,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29231, 17420)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29231;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13172
    ))
    FROM activities_raw
    WHERE su_id=13172) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31276,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31276, 13172)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31276;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17426
    ))
    FROM activities_raw
    WHERE su_id=17426) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30160,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30160, 17426)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30160;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1825
    ))
    FROM activities_raw
    WHERE su_id=1825) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29182,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29182, 1825)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29182;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17438
    ))
    FROM activities_raw
    WHERE su_id=17438) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31266,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31266, 17438)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31266;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17441
    ))
    FROM activities_raw
    WHERE su_id=17441) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30538,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30538, 17441)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30538;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13089
    ))
    FROM activities_raw
    WHERE su_id=13089) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  17454,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (17454, 13089)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=17454;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17458
    ))
    FROM activities_raw
    WHERE su_id=17458) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31502,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31502, 17458)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31502;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6501
    ))
    FROM activities_raw
    WHERE su_id=6501) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31501,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31501, 6501)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31501;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17461
    ))
    FROM activities_raw
    WHERE su_id=17461) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31428,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31428, 17461)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31428;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14206
    ))
    FROM activities_raw
    WHERE su_id=14206) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31224,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31224, 14206)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31224;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17483
    ))
    FROM activities_raw
    WHERE su_id=17483) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 17483)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17485
    ))
    FROM activities_raw
    WHERE su_id=17485) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29574,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29574, 17485)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29574;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17493
    ))
    FROM activities_raw
    WHERE su_id=17493) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29232,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29232, 17493)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29232;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17492
    ))
    FROM activities_raw
    WHERE su_id=17492) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29232,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29232, 17492)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29232;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17502
    ))
    FROM activities_raw
    WHERE su_id=17502) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  17500,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (17500, 17502)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=17500;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17518
    ))
    FROM activities_raw
    WHERE su_id=17518) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30045,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30045, 17518)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30045;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17521
    ))
    FROM activities_raw
    WHERE su_id=17521) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30525,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30525, 17521)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30525;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17528
    ))
    FROM activities_raw
    WHERE su_id=17528) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31608,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31608, 17528)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31608;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17530
    ))
    FROM activities_raw
    WHERE su_id=17530) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31595,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31595, 17530)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31595;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17540
    ))
    FROM activities_raw
    WHERE su_id=17540) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30090,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30090, 17540)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30090;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17554
    ))
    FROM activities_raw
    WHERE su_id=17554) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30427,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30427, 17554)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30427;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17556
    ))
    FROM activities_raw
    WHERE su_id=17556) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28967,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28967, 17556)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28967;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=7536
    ))
    FROM activities_raw
    WHERE su_id=7536) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30307,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30307, 7536)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30307;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17566
    ))
    FROM activities_raw
    WHERE su_id=17566) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29775,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29775, 17566)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29775;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17581
    ))
    FROM activities_raw
    WHERE su_id=17581) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30794,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30794, 17581)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30794;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13197
    ))
    FROM activities_raw
    WHERE su_id=13197) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30795,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30795, 13197)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30795;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=2549
    ))
    FROM activities_raw
    WHERE su_id=2549) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30794,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30794, 2549)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30794;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17587
    ))
    FROM activities_raw
    WHERE su_id=17587) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30798,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30798, 17587)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30798;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17588
    ))
    FROM activities_raw
    WHERE su_id=17588) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30796,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30796, 17588)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30796;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=7106
    ))
    FROM activities_raw
    WHERE su_id=7106) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30797,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30797, 7106)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30797;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17604
    ))
    FROM activities_raw
    WHERE su_id=17604) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30567,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30567, 17604)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30567;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17623
    ))
    FROM activities_raw
    WHERE su_id=17623) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30428,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30428, 17623)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30428;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17626
    ))
    FROM activities_raw
    WHERE su_id=17626) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31609, 17626)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28221
    ))
    FROM activities_raw
    WHERE su_id=28221) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31059,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31059, 28221)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31059;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17629
    ))
    FROM activities_raw
    WHERE su_id=17629) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30106,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30106, 17629)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30106;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17632
    ))
    FROM activities_raw
    WHERE su_id=17632) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31075,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31075, 17632)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31075;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1485
    ))
    FROM activities_raw
    WHERE su_id=1485) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30629,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30629, 1485)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30629;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17640
    ))
    FROM activities_raw
    WHERE su_id=17640) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31099,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31099, 17640)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31099;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17641
    ))
    FROM activities_raw
    WHERE su_id=17641) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31101,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31101, 17641)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31101;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17686
    ))
    FROM activities_raw
    WHERE su_id=17686) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30429,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30429, 17686)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30429;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28290
    ))
    FROM activities_raw
    WHERE su_id=28290) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  1413,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (1413, 28290)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=1413;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11896
    ))
    FROM activities_raw
    WHERE su_id=11896) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29183,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29183, 11896)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29183;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11123
    ))
    FROM activities_raw
    WHERE su_id=11123) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29183,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29183, 11123)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29183;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17740
    ))
    FROM activities_raw
    WHERE su_id=17740) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31283,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31283, 17740)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31283;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17744
    ))
    FROM activities_raw
    WHERE su_id=17744) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30386,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30386, 17744)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30386;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11939
    ))
    FROM activities_raw
    WHERE su_id=11939) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31578,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31578, 11939)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31578;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28144
    ))
    FROM activities_raw
    WHERE su_id=28144) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30262,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30262, 28144)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30262;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17746
    ))
    FROM activities_raw
    WHERE su_id=17746) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31567,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31567, 17746)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31567;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17793
    ))
    FROM activities_raw
    WHERE su_id=17793) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30526,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30526, 17793)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30526;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17823
    ))
    FROM activities_raw
    WHERE su_id=17823) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30430,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30430, 17823)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30430;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17827
    ))
    FROM activities_raw
    WHERE su_id=17827) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  17828,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (17828, 17827)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=17828;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17839
    ))
    FROM activities_raw
    WHERE su_id=17839) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29098,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29098, 17839)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29098;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17841
    ))
    FROM activities_raw
    WHERE su_id=17841) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30622,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30622, 17841)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30622;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17866
    ))
    FROM activities_raw
    WHERE su_id=17866) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31610,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31610, 17866)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31610;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17878
    ))
    FROM activities_raw
    WHERE su_id=17878) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28888,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28888, 17878)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28888;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17883
    ))
    FROM activities_raw
    WHERE su_id=17883) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29774,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29774, 17883)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29774;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17886
    ))
    FROM activities_raw
    WHERE su_id=17886) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30608,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30608, 17886)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30608;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17904
    ))
    FROM activities_raw
    WHERE su_id=17904) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29044,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29044, 17904)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29044;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17918
    ))
    FROM activities_raw
    WHERE su_id=17918) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31208,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31208, 17918)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31208;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17920
    ))
    FROM activities_raw
    WHERE su_id=17920) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28619,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28619, 17920)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28619;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17935
    ))
    FROM activities_raw
    WHERE su_id=17935) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30431,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30431, 17935)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30431;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17943
    ))
    FROM activities_raw
    WHERE su_id=17943) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29048,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29048, 17943)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29048;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17948
    ))
    FROM activities_raw
    WHERE su_id=17948) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30901,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30901, 17948)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30901;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17949
    ))
    FROM activities_raw
    WHERE su_id=17949) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30904,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30904, 17949)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30904;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=17986
    ))
    FROM activities_raw
    WHERE su_id=17986) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30432,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30432, 17986)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30432;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28187
    ))
    FROM activities_raw
    WHERE su_id=28187) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29033,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29033, 28187)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29033;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18027
    ))
    FROM activities_raw
    WHERE su_id=18027) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29004,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29004, 18027)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29004;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18032
    ))
    FROM activities_raw
    WHERE su_id=18032) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30122,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30122, 18032)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30122;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18034
    ))
    FROM activities_raw
    WHERE su_id=18034) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  18033,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (18033, 18034)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=18033;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18037
    ))
    FROM activities_raw
    WHERE su_id=18037) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30157,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30157, 18037)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30157;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18053
    ))
    FROM activities_raw
    WHERE su_id=18053) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31452,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31452, 18053)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31452;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18059
    ))
    FROM activities_raw
    WHERE su_id=18059) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31150,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31150, 18059)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31150;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18068
    ))
    FROM activities_raw
    WHERE su_id=18068) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30632,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30632, 18068)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30632;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18075
    ))
    FROM activities_raw
    WHERE su_id=18075) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30565,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30565, 18075)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30565;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18084
    ))
    FROM activities_raw
    WHERE su_id=18084) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13090,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13090, 18084)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13090;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18092
    ))
    FROM activities_raw
    WHERE su_id=18092) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30059,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30059, 18092)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30059;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18105
    ))
    FROM activities_raw
    WHERE su_id=18105) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31548,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31548, 18105)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31548;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18114
    ))
    FROM activities_raw
    WHERE su_id=18114) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29452,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29452, 18114)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29452;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18124
    ))
    FROM activities_raw
    WHERE su_id=18124) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  20233,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (20233, 18124)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=20233;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=5974
    ))
    FROM activities_raw
    WHERE su_id=5974) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29185,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29185, 5974)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29185;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18133
    ))
    FROM activities_raw
    WHERE su_id=18133) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30605,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30605, 18133)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30605;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18134
    ))
    FROM activities_raw
    WHERE su_id=18134) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31568,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31568, 18134)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31568;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14213
    ))
    FROM activities_raw
    WHERE su_id=14213) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29655,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29655, 14213)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29655;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1496
    ))
    FROM activities_raw
    WHERE su_id=1496) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30635,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30635, 1496)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30635;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18178
    ))
    FROM activities_raw
    WHERE su_id=18178) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30635,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30635, 18178)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30635;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18211
    ))
    FROM activities_raw
    WHERE su_id=18211) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30603,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30603, 18211)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30603;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18227
    ))
    FROM activities_raw
    WHERE su_id=18227) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  18226,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (18226, 18227)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=18226;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18234
    ))
    FROM activities_raw
    WHERE su_id=18234) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30799,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30799, 18234)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30799;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18235
    ))
    FROM activities_raw
    WHERE su_id=18235) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 18235)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18262
    ))
    FROM activities_raw
    WHERE su_id=18262) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30433,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30433, 18262)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30433;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18277
    ))
    FROM activities_raw
    WHERE su_id=18277) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  1504,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (1504, 18277)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=1504;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18304
    ))
    FROM activities_raw
    WHERE su_id=18304) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31469,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31469, 18304)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31469;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18317
    ))
    FROM activities_raw
    WHERE su_id=18317) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30434,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30434, 18317)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30434;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18329
    ))
    FROM activities_raw
    WHERE su_id=18329) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  18365,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (18365, 18329)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=18365;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10199
    ))
    FROM activities_raw
    WHERE su_id=10199) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29186,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29186, 10199)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29186;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18348
    ))
    FROM activities_raw
    WHERE su_id=18348) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29100,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29100, 18348)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29100;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18361
    ))
    FROM activities_raw
    WHERE su_id=18361) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31611,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31611, 18361)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31611;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18384
    ))
    FROM activities_raw
    WHERE su_id=18384) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30435,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30435, 18384)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30435;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18397
    ))
    FROM activities_raw
    WHERE su_id=18397) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29198,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29198, 18397)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29198;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=3261
    ))
    FROM activities_raw
    WHERE su_id=3261) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29199,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29199, 3261)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29199;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18399
    ))
    FROM activities_raw
    WHERE su_id=18399) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31556,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31556, 18399)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31556;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18410
    ))
    FROM activities_raw
    WHERE su_id=18410) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30881,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30881, 18410)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30881;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=9248
    ))
    FROM activities_raw
    WHERE su_id=9248) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29213,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29213, 9248)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29213;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18444
    ))
    FROM activities_raw
    WHERE su_id=18444) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31166,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31166, 18444)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31166;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18463
    ))
    FROM activities_raw
    WHERE su_id=18463) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31305,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31305, 18463)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31305;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18464
    ))
    FROM activities_raw
    WHERE su_id=18464) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30436,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30436, 18464)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30436;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18468
    ))
    FROM activities_raw
    WHERE su_id=18468) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30449,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30449, 18468)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30449;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18483
    ))
    FROM activities_raw
    WHERE su_id=18483) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30058,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30058, 18483)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30058;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18484
    ))
    FROM activities_raw
    WHERE su_id=18484) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30283,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30283, 18484)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30283;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10343
    ))
    FROM activities_raw
    WHERE su_id=10343) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31465,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31465, 10343)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31465;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18490
    ))
    FROM activities_raw
    WHERE su_id=18490) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31244,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31244, 18490)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31244;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18494
    ))
    FROM activities_raw
    WHERE su_id=18494) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29117,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29117, 18494)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29117;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18509
    ))
    FROM activities_raw
    WHERE su_id=18509) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29037,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29037, 18509)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29037;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18511
    ))
    FROM activities_raw
    WHERE su_id=18511) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30391,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30391, 18511)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30391;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1527
    ))
    FROM activities_raw
    WHERE su_id=1527) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30636,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30636, 1527)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30636;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18534
    ))
    FROM activities_raw
    WHERE su_id=18534) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29979,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29979, 18534)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29979;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18535
    ))
    FROM activities_raw
    WHERE su_id=18535) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31612,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31612, 18535)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31612;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18542
    ))
    FROM activities_raw
    WHERE su_id=18542) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31504,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31504, 18542)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31504;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6507
    ))
    FROM activities_raw
    WHERE su_id=6507) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31503,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31503, 6507)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31503;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14023
    ))
    FROM activities_raw
    WHERE su_id=14023) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  14029,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (14029, 14023)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=14029;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18551
    ))
    FROM activities_raw
    WHERE su_id=18551) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13795,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13795, 18551)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13795;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=7985
    ))
    FROM activities_raw
    WHERE su_id=7985) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29214,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29214, 7985)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29214;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18561
    ))
    FROM activities_raw
    WHERE su_id=18561) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30527,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30527, 18561)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30527;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18566
    ))
    FROM activities_raw
    WHERE su_id=18566) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30437,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30437, 18566)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30437;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18576
    ))
    FROM activities_raw
    WHERE su_id=18576) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  18575,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (18575, 18576)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=18575;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18582
    ))
    FROM activities_raw
    WHERE su_id=18582) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30159,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30159, 18582)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30159;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18599
    ))
    FROM activities_raw
    WHERE su_id=18599) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 18599)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18601
    ))
    FROM activities_raw
    WHERE su_id=18601) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 18601)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18615
    ))
    FROM activities_raw
    WHERE su_id=18615) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  17220,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (17220, 18615)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=17220;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18669
    ))
    FROM activities_raw
    WHERE su_id=18669) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29102,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29102, 18669)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29102;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18672
    ))
    FROM activities_raw
    WHERE su_id=18672) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30301,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30301, 18672)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30301;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18688
    ))
    FROM activities_raw
    WHERE su_id=18688) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  18033,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (18033, 18688)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=18033;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18703
    ))
    FROM activities_raw
    WHERE su_id=18703) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29611,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29611, 18703)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29611;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18708
    ))
    FROM activities_raw
    WHERE su_id=18708) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29232,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29232, 18708)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29232;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18709
    ))
    FROM activities_raw
    WHERE su_id=18709) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29232,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29232, 18709)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29232;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18710
    ))
    FROM activities_raw
    WHERE su_id=18710) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29611,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29611, 18710)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29611;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18711
    ))
    FROM activities_raw
    WHERE su_id=18711) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29611,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29611, 18711)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29611;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18730
    ))
    FROM activities_raw
    WHERE su_id=18730) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29276,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29276, 18730)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29276;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18746
    ))
    FROM activities_raw
    WHERE su_id=18746) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31168,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31168, 18746)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31168;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18750
    ))
    FROM activities_raw
    WHERE su_id=18750) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30885,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30885, 18750)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30885;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18833
    ))
    FROM activities_raw
    WHERE su_id=18833) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31564,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31564, 18833)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31564;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18841
    ))
    FROM activities_raw
    WHERE su_id=18841) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31313,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31313, 18841)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31313;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18848
    ))
    FROM activities_raw
    WHERE su_id=18848) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31167,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31167, 18848)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31167;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18856
    ))
    FROM activities_raw
    WHERE su_id=18856) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30528,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30528, 18856)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30528;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18858
    ))
    FROM activities_raw
    WHERE su_id=18858) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30438,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30438, 18858)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30438;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18861
    ))
    FROM activities_raw
    WHERE su_id=18861) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  2171,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (2171, 18861)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=2171;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18863
    ))
    FROM activities_raw
    WHERE su_id=18863) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28620,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28620, 18863)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28620;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28167
    ))
    FROM activities_raw
    WHERE su_id=28167) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  15525,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (15525, 28167)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=15525;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18889
    ))
    FROM activities_raw
    WHERE su_id=18889) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 18889)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12506
    ))
    FROM activities_raw
    WHERE su_id=12506) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29215,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29215, 12506)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29215;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18927
    ))
    FROM activities_raw
    WHERE su_id=18927) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30623,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30623, 18927)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30623;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18931
    ))
    FROM activities_raw
    WHERE su_id=18931) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30440,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30440, 18931)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30440;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18973
    ))
    FROM activities_raw
    WHERE su_id=18973) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28926,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28926, 18973)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28926;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12610
    ))
    FROM activities_raw
    WHERE su_id=12610) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29216,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29216, 12610)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29216;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6509
    ))
    FROM activities_raw
    WHERE su_id=6509) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31433,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31433, 6509)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31433;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=18991
    ))
    FROM activities_raw
    WHERE su_id=18991) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29023,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29023, 18991)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29023;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19001
    ))
    FROM activities_raw
    WHERE su_id=19001) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29614,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29614, 19001)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29614;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19016
    ))
    FROM activities_raw
    WHERE su_id=19016) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29321,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29321, 19016)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29321;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19050
    ))
    FROM activities_raw
    WHERE su_id=19050) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29793,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29793, 19050)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29793;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6510
    ))
    FROM activities_raw
    WHERE su_id=6510) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31481,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31481, 6510)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31481;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19105
    ))
    FROM activities_raw
    WHERE su_id=19105) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30441,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30441, 19105)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30441;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6283
    ))
    FROM activities_raw
    WHERE su_id=6283) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31443,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31443, 6283)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31443;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19109
    ))
    FROM activities_raw
    WHERE su_id=19109) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30442,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30442, 19109)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30442;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19139
    ))
    FROM activities_raw
    WHERE su_id=19139) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29623,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29623, 19139)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29623;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19140
    ))
    FROM activities_raw
    WHERE su_id=19140) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29621,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29621, 19140)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29621;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19155
    ))
    FROM activities_raw
    WHERE su_id=19155) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29112,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29112, 19155)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29112;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19156
    ))
    FROM activities_raw
    WHERE su_id=19156) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30900,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30900, 19156)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30900;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19161
    ))
    FROM activities_raw
    WHERE su_id=19161) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31579,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31579, 19161)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31579;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19164
    ))
    FROM activities_raw
    WHERE su_id=19164) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30014,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30014, 19164)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30014;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19166
    ))
    FROM activities_raw
    WHERE su_id=19166) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30958,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30958, 19166)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30958;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19172
    ))
    FROM activities_raw
    WHERE su_id=19172) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31290,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31290, 19172)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31290;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19184
    ))
    FROM activities_raw
    WHERE su_id=19184) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  22488,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (22488, 19184)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=22488;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19199
    ))
    FROM activities_raw
    WHERE su_id=19199) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29624,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29624, 19199)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29624;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19200
    ))
    FROM activities_raw
    WHERE su_id=19200) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30273,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30273, 19200)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30273;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=3266
    ))
    FROM activities_raw
    WHERE su_id=3266) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30359,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30359, 3266)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30359;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19220
    ))
    FROM activities_raw
    WHERE su_id=19220) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30358,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30358, 19220)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30358;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19231
    ))
    FROM activities_raw
    WHERE su_id=19231) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  19232,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (19232, 19231)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=19232;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19241
    ))
    FROM activities_raw
    WHERE su_id=19241) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29103,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29103, 19241)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29103;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19271
    ))
    FROM activities_raw
    WHERE su_id=19271) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29754,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29754, 19271)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29754;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19278
    ))
    FROM activities_raw
    WHERE su_id=19278) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30085,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30085, 19278)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30085;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19280
    ))
    FROM activities_raw
    WHERE su_id=19280) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29690,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29690, 19280)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29690;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19317
    ))
    FROM activities_raw
    WHERE su_id=19317) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31356,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31356, 19317)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31356;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19318
    ))
    FROM activities_raw
    WHERE su_id=19318) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31382,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31382, 19318)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31382;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19322
    ))
    FROM activities_raw
    WHERE su_id=19322) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30371,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30371, 19322)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30371;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19324
    ))
    FROM activities_raw
    WHERE su_id=19324) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30708,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30708, 19324)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30708;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19329
    ))
    FROM activities_raw
    WHERE su_id=19329) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29376,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29376, 19329)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29376;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=4193
    ))
    FROM activities_raw
    WHERE su_id=4193) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29756,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29756, 4193)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29756;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19343
    ))
    FROM activities_raw
    WHERE su_id=19343) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30716,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30716, 19343)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30716;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=102
    ))
    FROM activities_raw
    WHERE su_id=102) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29217,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29217, 102)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29217;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19390
    ))
    FROM activities_raw
    WHERE su_id=19390) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30060, 19390)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19392
    ))
    FROM activities_raw
    WHERE su_id=19392) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30599,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30599, 19392)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30599;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19395
    ))
    FROM activities_raw
    WHERE su_id=19395) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28146,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28146, 19395)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28146;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10691
    ))
    FROM activities_raw
    WHERE su_id=10691) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29238,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29238, 10691)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29238;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19405
    ))
    FROM activities_raw
    WHERE su_id=19405) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30593,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30593, 19405)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30593;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1548
    ))
    FROM activities_raw
    WHERE su_id=1548) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30653,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30653, 1548)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30653;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19434
    ))
    FROM activities_raw
    WHERE su_id=19434) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30101,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30101, 19434)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30101;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19437
    ))
    FROM activities_raw
    WHERE su_id=19437) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31376,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31376, 19437)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31376;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19444
    ))
    FROM activities_raw
    WHERE su_id=19444) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30217,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30217, 19444)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30217;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19448
    ))
    FROM activities_raw
    WHERE su_id=19448) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30529,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30529, 19448)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30529;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=2530
    ))
    FROM activities_raw
    WHERE su_id=2530) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  14664,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (14664, 2530)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=14664;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19459
    ))
    FROM activities_raw
    WHERE su_id=19459) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31374,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31374, 19459)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31374;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19460
    ))
    FROM activities_raw
    WHERE su_id=19460) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28726,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28726, 19460)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28726;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19462
    ))
    FROM activities_raw
    WHERE su_id=19462) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30444,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30444, 19462)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30444;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19464
    ))
    FROM activities_raw
    WHERE su_id=19464) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30907,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30907, 19464)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30907;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28174
    ))
    FROM activities_raw
    WHERE su_id=28174) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30453,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30453, 28174)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30453;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19518
    ))
    FROM activities_raw
    WHERE su_id=19518) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 19518)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19530
    ))
    FROM activities_raw
    WHERE su_id=19530) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29540,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29540, 19530)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29540;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19542
    ))
    FROM activities_raw
    WHERE su_id=19542) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31394,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31394, 19542)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31394;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19570
    ))
    FROM activities_raw
    WHERE su_id=19570) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30720,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30720, 19570)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30720;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19585
    ))
    FROM activities_raw
    WHERE su_id=19585) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29675,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29675, 19585)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29675;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11623
    ))
    FROM activities_raw
    WHERE su_id=11623) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29676,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29676, 11623)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29676;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19594
    ))
    FROM activities_raw
    WHERE su_id=19594) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31364,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31364, 19594)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31364;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19607
    ))
    FROM activities_raw
    WHERE su_id=19607) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29087,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29087, 19607)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29087;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19609
    ))
    FROM activities_raw
    WHERE su_id=19609) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30446,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30446, 19609)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30446;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19622
    ))
    FROM activities_raw
    WHERE su_id=19622) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30857,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30857, 19622)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30857;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19631
    ))
    FROM activities_raw
    WHERE su_id=19631) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28797,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28797, 19631)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28797;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19643
    ))
    FROM activities_raw
    WHERE su_id=19643) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31189,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31189, 19643)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31189;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=5660
    ))
    FROM activities_raw
    WHERE su_id=5660) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30957,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30957, 5660)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30957;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19652
    ))
    FROM activities_raw
    WHERE su_id=19652) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 19652)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14559
    ))
    FROM activities_raw
    WHERE su_id=14559) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  19656,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (19656, 14559)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=19656;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19660
    ))
    FROM activities_raw
    WHERE su_id=19660) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29110,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29110, 19660)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29110;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19678
    ))
    FROM activities_raw
    WHERE su_id=19678) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31617,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31617, 19678)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31617;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19679
    ))
    FROM activities_raw
    WHERE su_id=19679) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 19679)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19686
    ))
    FROM activities_raw
    WHERE su_id=19686) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31261,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31261, 19686)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31261;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19688
    ))
    FROM activities_raw
    WHERE su_id=19688) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31146,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31146, 19688)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31146;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19698
    ))
    FROM activities_raw
    WHERE su_id=19698) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30377,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30377, 19698)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30377;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19703
    ))
    FROM activities_raw
    WHERE su_id=19703) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30873,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30873, 19703)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30873;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19711
    ))
    FROM activities_raw
    WHERE su_id=19711) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30598,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30598, 19711)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30598;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19719
    ))
    FROM activities_raw
    WHERE su_id=19719) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28621,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28621, 19719)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28621;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19756
    ))
    FROM activities_raw
    WHERE su_id=19756) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30367,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30367, 19756)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30367;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19768
    ))
    FROM activities_raw
    WHERE su_id=19768) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29960,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29960, 19768)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29960;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19772
    ))
    FROM activities_raw
    WHERE su_id=19772) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30892,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30892, 19772)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30892;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19790
    ))
    FROM activities_raw
    WHERE su_id=19790) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30447,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30447, 19790)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30447;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19794
    ))
    FROM activities_raw
    WHERE su_id=19794) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30749,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30749, 19794)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30749;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19803
    ))
    FROM activities_raw
    WHERE su_id=19803) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31526,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31526, 19803)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31526;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19804
    ))
    FROM activities_raw
    WHERE su_id=19804) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31563,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31563, 19804)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31563;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10698
    ))
    FROM activities_raw
    WHERE su_id=10698) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29239,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29239, 10698)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29239;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19811
    ))
    FROM activities_raw
    WHERE su_id=19811) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31596,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31596, 19811)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31596;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=7350
    ))
    FROM activities_raw
    WHERE su_id=7350) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28927,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28927, 7350)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28927;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19820
    ))
    FROM activities_raw
    WHERE su_id=19820) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28933,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28933, 19820)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28933;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19828
    ))
    FROM activities_raw
    WHERE su_id=19828) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29664,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29664, 19828)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29664;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19868
    ))
    FROM activities_raw
    WHERE su_id=19868) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29776,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29776, 19868)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29776;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19871
    ))
    FROM activities_raw
    WHERE su_id=19871) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31593,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31593, 19871)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31593;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19905
    ))
    FROM activities_raw
    WHERE su_id=19905) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29988,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29988, 19905)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29988;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19923
    ))
    FROM activities_raw
    WHERE su_id=19923) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31570,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31570, 19923)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31570;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19938
    ))
    FROM activities_raw
    WHERE su_id=19938) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30148,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30148, 19938)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30148;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19960
    ))
    FROM activities_raw
    WHERE su_id=19960) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30448,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30448, 19960)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30448;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19974
    ))
    FROM activities_raw
    WHERE su_id=19974) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 19974)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=19984
    ))
    FROM activities_raw
    WHERE su_id=19984) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30039,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30039, 19984)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30039;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20011
    ))
    FROM activities_raw
    WHERE su_id=20011) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31259,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31259, 20011)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31259;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20035
    ))
    FROM activities_raw
    WHERE su_id=20035) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30451,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30451, 20035)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30451;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10701
    ))
    FROM activities_raw
    WHERE su_id=10701) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31315,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31315, 10701)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31315;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20051
    ))
    FROM activities_raw
    WHERE su_id=20051) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28947,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28947, 20051)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28947;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20052
    ))
    FROM activities_raw
    WHERE su_id=20052) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29107,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29107, 20052)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29107;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20053
    ))
    FROM activities_raw
    WHERE su_id=20053) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30108,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30108, 20053)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30108;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20067
    ))
    FROM activities_raw
    WHERE su_id=20067) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30454,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30454, 20067)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30454;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20073
    ))
    FROM activities_raw
    WHERE su_id=20073) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  12618,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (12618, 20073)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=12618;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20086
    ))
    FROM activities_raw
    WHERE su_id=20086) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30455,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30455, 20086)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30455;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20093
    ))
    FROM activities_raw
    WHERE su_id=20093) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 20093)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20099
    ))
    FROM activities_raw
    WHERE su_id=20099) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30456,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30456, 20099)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30456;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20101
    ))
    FROM activities_raw
    WHERE su_id=20101) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31252,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31252, 20101)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31252;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20104
    ))
    FROM activities_raw
    WHERE su_id=20104) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 20104)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20117
    ))
    FROM activities_raw
    WHERE su_id=20117) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30074,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30074, 20117)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30074;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=4549
    ))
    FROM activities_raw
    WHERE su_id=4549) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29219,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29219, 4549)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29219;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20170
    ))
    FROM activities_raw
    WHERE su_id=20170) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 20170)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20178
    ))
    FROM activities_raw
    WHERE su_id=20178) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31474,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31474, 20178)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31474;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20185
    ))
    FROM activities_raw
    WHERE su_id=20185) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29240,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29240, 20185)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29240;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20187
    ))
    FROM activities_raw
    WHERE su_id=20187) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30600,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30600, 20187)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30600;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20193
    ))
    FROM activities_raw
    WHERE su_id=20193) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31371,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31371, 20193)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31371;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20209
    ))
    FROM activities_raw
    WHERE su_id=20209) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31120,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31120, 20209)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31120;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6288
    ))
    FROM activities_raw
    WHERE su_id=6288) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31442,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31442, 6288)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31442;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20211
    ))
    FROM activities_raw
    WHERE su_id=20211) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30458, 20211)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20216
    ))
    FROM activities_raw
    WHERE su_id=20216) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31448,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31448, 20216)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31448;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20217
    ))
    FROM activities_raw
    WHERE su_id=20217) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29719,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29719, 20217)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29719;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20219
    ))
    FROM activities_raw
    WHERE su_id=20219) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31083,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31083, 20219)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31083;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20220
    ))
    FROM activities_raw
    WHERE su_id=20220) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29777,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29777, 20220)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29777;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20244
    ))
    FROM activities_raw
    WHERE su_id=20244) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31197,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31197, 20244)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31197;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=4689
    ))
    FROM activities_raw
    WHERE su_id=4689) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31197,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31197, 4689)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31197;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20296
    ))
    FROM activities_raw
    WHERE su_id=20296) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31385,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31385, 20296)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31385;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28224
    ))
    FROM activities_raw
    WHERE su_id=28224) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31059,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31059, 28224)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31059;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20359
    ))
    FROM activities_raw
    WHERE su_id=20359) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29798,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29798, 20359)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29798;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20364
    ))
    FROM activities_raw
    WHERE su_id=20364) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31583,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31583, 20364)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31583;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20373
    ))
    FROM activities_raw
    WHERE su_id=20373) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28618,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28618, 20373)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28618;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20376
    ))
    FROM activities_raw
    WHERE su_id=20376) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29042,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29042, 20376)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29042;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20387
    ))
    FROM activities_raw
    WHERE su_id=20387) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31307,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31307, 20387)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31307;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20428
    ))
    FROM activities_raw
    WHERE su_id=20428) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31547,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31547, 20428)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31547;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20440
    ))
    FROM activities_raw
    WHERE su_id=20440) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30062,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30062, 20440)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30062;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20456
    ))
    FROM activities_raw
    WHERE su_id=20456) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30633,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30633, 20456)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30633;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14228
    ))
    FROM activities_raw
    WHERE su_id=14228) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  14229,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (14229, 14228)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=14229;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20495
    ))
    FROM activities_raw
    WHERE su_id=20495) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  22488,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (22488, 20495)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=22488;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20497
    ))
    FROM activities_raw
    WHERE su_id=20497) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30856,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30856, 20497)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30856;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20500
    ))
    FROM activities_raw
    WHERE su_id=20500) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31207,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31207, 20500)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31207;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1584
    ))
    FROM activities_raw
    WHERE su_id=1584) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31545,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31545, 1584)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31545;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20519
    ))
    FROM activities_raw
    WHERE su_id=20519) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29242,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29242, 20519)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29242;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20527
    ))
    FROM activities_raw
    WHERE su_id=20527) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 20527)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20528
    ))
    FROM activities_raw
    WHERE su_id=20528) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 20528)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20540
    ))
    FROM activities_raw
    WHERE su_id=20540) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 20540)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20541
    ))
    FROM activities_raw
    WHERE su_id=20541) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 20541)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20549
    ))
    FROM activities_raw
    WHERE su_id=20549) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 20549)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20551
    ))
    FROM activities_raw
    WHERE su_id=20551) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30720,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30720, 20551)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30720;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20569
    ))
    FROM activities_raw
    WHERE su_id=20569) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31258,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31258, 20569)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31258;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20572
    ))
    FROM activities_raw
    WHERE su_id=20572) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30063,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30063, 20572)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30063;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20590
    ))
    FROM activities_raw
    WHERE su_id=20590) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30169,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30169, 20590)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30169;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20594
    ))
    FROM activities_raw
    WHERE su_id=20594) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30459,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30459, 20594)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30459;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20598
    ))
    FROM activities_raw
    WHERE su_id=20598) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30055,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30055, 20598)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30055;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=7353
    ))
    FROM activities_raw
    WHERE su_id=7353) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31350,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31350, 7353)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31350;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20619
    ))
    FROM activities_raw
    WHERE su_id=20619) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 20619)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20669
    ))
    FROM activities_raw
    WHERE su_id=20669) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31001,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31001, 20669)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31001;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20675
    ))
    FROM activities_raw
    WHERE su_id=20675) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30460,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30460, 20675)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30460;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20703
    ))
    FROM activities_raw
    WHERE su_id=20703) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28925,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28925, 20703)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28925;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20704
    ))
    FROM activities_raw
    WHERE su_id=20704) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31493,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31493, 20704)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31493;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20709
    ))
    FROM activities_raw
    WHERE su_id=20709) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30461,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30461, 20709)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30461;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1592
    ))
    FROM activities_raw
    WHERE su_id=1592) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31544,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31544, 1592)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31544;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20740
    ))
    FROM activities_raw
    WHERE su_id=20740) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29387,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29387, 20740)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29387;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14857
    ))
    FROM activities_raw
    WHERE su_id=14857) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29674,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29674, 14857)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29674;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20751
    ))
    FROM activities_raw
    WHERE su_id=20751) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29045,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29045, 20751)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29045;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20754
    ))
    FROM activities_raw
    WHERE su_id=20754) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31613,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31613, 20754)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31613;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20761
    ))
    FROM activities_raw
    WHERE su_id=20761) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30078,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30078, 20761)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30078;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20769
    ))
    FROM activities_raw
    WHERE su_id=20769) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30089,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30089, 20769)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30089;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20775
    ))
    FROM activities_raw
    WHERE su_id=20775) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  15502,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (15502, 20775)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=15502;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20778
    ))
    FROM activities_raw
    WHERE su_id=20778) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31359,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31359, 20778)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31359;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20779
    ))
    FROM activities_raw
    WHERE su_id=20779) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 20779)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20795
    ))
    FROM activities_raw
    WHERE su_id=20795) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30601,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30601, 20795)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30601;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20796
    ))
    FROM activities_raw
    WHERE su_id=20796) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30601,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30601, 20796)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30601;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28034
    ))
    FROM activities_raw
    WHERE su_id=28034) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28662,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28662, 28034)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28662;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20813
    ))
    FROM activities_raw
    WHERE su_id=20813) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31619,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31619, 20813)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31619;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20826
    ))
    FROM activities_raw
    WHERE su_id=20826) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29132,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29132, 20826)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29132;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20828
    ))
    FROM activities_raw
    WHERE su_id=20828) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29854,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29854, 20828)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29854;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20829
    ))
    FROM activities_raw
    WHERE su_id=20829) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29854,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29854, 20829)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29854;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20841
    ))
    FROM activities_raw
    WHERE su_id=20841) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30789,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30789, 20841)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30789;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20842
    ))
    FROM activities_raw
    WHERE su_id=20842) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30788,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30788, 20842)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30788;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20843
    ))
    FROM activities_raw
    WHERE su_id=20843) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30790,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30790, 20843)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30790;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20866
    ))
    FROM activities_raw
    WHERE su_id=20866) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31597,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31597, 20866)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31597;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20870
    ))
    FROM activities_raw
    WHERE su_id=20870) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30462,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30462, 20870)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30462;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20876
    ))
    FROM activities_raw
    WHERE su_id=20876) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30463,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30463, 20876)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30463;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=4418
    ))
    FROM activities_raw
    WHERE su_id=4418) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  20881,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (20881, 4418)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=20881;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20883
    ))
    FROM activities_raw
    WHERE su_id=20883) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  20882,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (20882, 20883)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=20882;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20884
    ))
    FROM activities_raw
    WHERE su_id=20884) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30464,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30464, 20884)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30464;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=5033
    ))
    FROM activities_raw
    WHERE su_id=5033) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29222,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29222, 5033)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29222;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=551
    ))
    FROM activities_raw
    WHERE su_id=551) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29223,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29223, 551)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29223;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10397
    ))
    FROM activities_raw
    WHERE su_id=10397) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29224,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29224, 10397)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29224;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20896
    ))
    FROM activities_raw
    WHERE su_id=20896) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20896)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20897
    ))
    FROM activities_raw
    WHERE su_id=20897) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31181,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31181, 20897)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31181;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20899
    ))
    FROM activities_raw
    WHERE su_id=20899) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20899)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20903
    ))
    FROM activities_raw
    WHERE su_id=20903) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31183,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31183, 20903)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31183;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20904
    ))
    FROM activities_raw
    WHERE su_id=20904) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20904)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20905
    ))
    FROM activities_raw
    WHERE su_id=20905) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20905)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20907
    ))
    FROM activities_raw
    WHERE su_id=20907) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20907)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20911
    ))
    FROM activities_raw
    WHERE su_id=20911) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20911)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20915
    ))
    FROM activities_raw
    WHERE su_id=20915) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20915)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20917
    ))
    FROM activities_raw
    WHERE su_id=20917) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20917)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20924
    ))
    FROM activities_raw
    WHERE su_id=20924) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20924)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20925
    ))
    FROM activities_raw
    WHERE su_id=20925) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31182,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31182, 20925)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31182;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20928
    ))
    FROM activities_raw
    WHERE su_id=20928) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20928)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20931
    ))
    FROM activities_raw
    WHERE su_id=20931) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31181,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31181, 20931)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31181;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20944
    ))
    FROM activities_raw
    WHERE su_id=20944) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31180,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31180, 20944)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31180;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20947
    ))
    FROM activities_raw
    WHERE su_id=20947) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29134,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29134, 20947)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29134;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10825
    ))
    FROM activities_raw
    WHERE su_id=10825) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29234,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29234, 10825)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29234;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20964
    ))
    FROM activities_raw
    WHERE su_id=20964) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31620,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31620, 20964)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31620;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20966
    ))
    FROM activities_raw
    WHERE su_id=20966) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30465,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30465, 20966)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30465;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20971
    ))
    FROM activities_raw
    WHERE su_id=20971) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 20971)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20991
    ))
    FROM activities_raw
    WHERE su_id=20991) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29243,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29243, 20991)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29243;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=20997
    ))
    FROM activities_raw
    WHERE su_id=20997) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28623,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28623, 20997)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28623;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21004
    ))
    FROM activities_raw
    WHERE su_id=21004) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30602,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30602, 21004)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30602;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21005
    ))
    FROM activities_raw
    WHERE su_id=21005) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31621,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31621, 21005)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31621;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21009
    ))
    FROM activities_raw
    WHERE su_id=21009) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30802,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30802, 21009)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30802;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13209
    ))
    FROM activities_raw
    WHERE su_id=13209) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30802,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30802, 13209)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30802;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21010
    ))
    FROM activities_raw
    WHERE su_id=21010) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30802,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30802, 21010)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30802;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21013
    ))
    FROM activities_raw
    WHERE su_id=21013) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30801,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30801, 21013)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30801;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21043
    ))
    FROM activities_raw
    WHERE su_id=21043) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31135,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31135, 21043)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31135;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21049
    ))
    FROM activities_raw
    WHERE su_id=21049) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29666,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29666, 21049)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29666;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21050
    ))
    FROM activities_raw
    WHERE su_id=21050) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 21050)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21067
    ))
    FROM activities_raw
    WHERE su_id=21067) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  21066,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (21066, 21067)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=21066;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21079
    ))
    FROM activities_raw
    WHERE su_id=21079) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 21079)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21105
    ))
    FROM activities_raw
    WHERE su_id=21105) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30117,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30117, 21105)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30117;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21168
    ))
    FROM activities_raw
    WHERE su_id=21168) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29090,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29090, 21168)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29090;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1604
    ))
    FROM activities_raw
    WHERE su_id=1604) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30658,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30658, 1604)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30658;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21196
    ))
    FROM activities_raw
    WHERE su_id=21196) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31435,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31435, 21196)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31435;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=8068
    ))
    FROM activities_raw
    WHERE su_id=8068) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29271,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29271, 8068)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29271;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21251
    ))
    FROM activities_raw
    WHERE su_id=21251) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30740,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30740, 21251)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30740;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21253
    ))
    FROM activities_raw
    WHERE su_id=21253) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30741,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30741, 21253)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30741;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21256
    ))
    FROM activities_raw
    WHERE su_id=21256) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30741,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30741, 21256)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30741;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21288
    ))
    FROM activities_raw
    WHERE su_id=21288) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30093,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30093, 21288)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30093;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21300
    ))
    FROM activities_raw
    WHERE su_id=21300) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29244,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29244, 21300)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29244;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21303
    ))
    FROM activities_raw
    WHERE su_id=21303) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30781,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30781, 21303)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30781;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21308
    ))
    FROM activities_raw
    WHERE su_id=21308) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29386,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29386, 21308)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29386;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21332
    ))
    FROM activities_raw
    WHERE su_id=21332) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29288,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29288, 21332)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29288;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6291
    ))
    FROM activities_raw
    WHERE su_id=6291) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31441,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31441, 6291)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31441;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21354
    ))
    FROM activities_raw
    WHERE su_id=21354) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30466,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30466, 21354)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30466;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21357
    ))
    FROM activities_raw
    WHERE su_id=21357) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 21357)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21361
    ))
    FROM activities_raw
    WHERE su_id=21361) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 21361)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21376
    ))
    FROM activities_raw
    WHERE su_id=21376) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  21375,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (21375, 21376)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=21375;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21391
    ))
    FROM activities_raw
    WHERE su_id=21391) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29513,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29513, 21391)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29513;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21392
    ))
    FROM activities_raw
    WHERE su_id=21392) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 21392)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21405
    ))
    FROM activities_raw
    WHERE su_id=21405) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  11478,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (11478, 21405)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=11478;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21416
    ))
    FROM activities_raw
    WHERE su_id=21416) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30064,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30064, 21416)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30064;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21445
    ))
    FROM activities_raw
    WHERE su_id=21445) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31496,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31496, 21445)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31496;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21456
    ))
    FROM activities_raw
    WHERE su_id=21456) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29857,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29857, 21456)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29857;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21459
    ))
    FROM activities_raw
    WHERE su_id=21459) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29245,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29245, 21459)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29245;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21464
    ))
    FROM activities_raw
    WHERE su_id=21464) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30734,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30734, 21464)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30734;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11424
    ))
    FROM activities_raw
    WHERE su_id=11424) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29275,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29275, 11424)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29275;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21466
    ))
    FROM activities_raw
    WHERE su_id=21466) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30134,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30134, 21466)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30134;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21484
    ))
    FROM activities_raw
    WHERE su_id=21484) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  7257,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (7257, 21484)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=7257;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21487
    ))
    FROM activities_raw
    WHERE su_id=21487) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  7257,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (7257, 21487)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=7257;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21488
    ))
    FROM activities_raw
    WHERE su_id=21488) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  7257,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (7257, 21488)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=7257;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21490
    ))
    FROM activities_raw
    WHERE su_id=21490) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29327,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29327, 21490)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29327;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21496
    ))
    FROM activities_raw
    WHERE su_id=21496) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30320,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30320, 21496)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30320;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21501
    ))
    FROM activities_raw
    WHERE su_id=21501) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29907,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29907, 21501)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29907;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1610
    ))
    FROM activities_raw
    WHERE su_id=1610) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30659,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30659, 1610)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30659;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21536
    ))
    FROM activities_raw
    WHERE su_id=21536) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  17465,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (17465, 21536)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=17465;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6518
    ))
    FROM activities_raw
    WHERE su_id=6518) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31482,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31482, 6518)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31482;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21560
    ))
    FROM activities_raw
    WHERE su_id=21560) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  27911,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (27911, 21560)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=27911;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21565
    ))
    FROM activities_raw
    WHERE su_id=21565) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29374,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29374, 21565)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29374;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21566
    ))
    FROM activities_raw
    WHERE su_id=21566) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30468,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30468, 21566)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30468;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21586
    ))
    FROM activities_raw
    WHERE su_id=21586) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29246,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29246, 21586)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29246;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21593
    ))
    FROM activities_raw
    WHERE su_id=21593) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28729,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28729, 21593)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28729;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21597
    ))
    FROM activities_raw
    WHERE su_id=21597) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29504,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29504, 21597)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29504;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21598
    ))
    FROM activities_raw
    WHERE su_id=21598) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  24484,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (24484, 21598)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=24484;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21599
    ))
    FROM activities_raw
    WHERE su_id=21599) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29247,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29247, 21599)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29247;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21601
    ))
    FROM activities_raw
    WHERE su_id=21601) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28798,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28798, 21601)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28798;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12640
    ))
    FROM activities_raw
    WHERE su_id=12640) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29277,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29277, 12640)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29277;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21609
    ))
    FROM activities_raw
    WHERE su_id=21609) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31623,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31623, 21609)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31623;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21619
    ))
    FROM activities_raw
    WHERE su_id=21619) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 21619)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21631
    ))
    FROM activities_raw
    WHERE su_id=21631) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31594,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31594, 21631)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31594;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21642
    ))
    FROM activities_raw
    WHERE su_id=21642) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30469,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30469, 21642)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30469;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21645
    ))
    FROM activities_raw
    WHERE su_id=21645) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30135,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30135, 21645)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30135;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21661
    ))
    FROM activities_raw
    WHERE su_id=21661) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30750,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30750, 21661)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30750;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21663
    ))
    FROM activities_raw
    WHERE su_id=21663) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29331,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29331, 21663)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29331;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21668
    ))
    FROM activities_raw
    WHERE su_id=21668) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29993,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29993, 21668)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29993;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21670
    ))
    FROM activities_raw
    WHERE su_id=21670) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30770,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30770, 21670)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30770;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1612
    ))
    FROM activities_raw
    WHERE su_id=1612) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30660,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30660, 1612)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30660;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21698
    ))
    FROM activities_raw
    WHERE su_id=21698) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31566, 21698)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21700
    ))
    FROM activities_raw
    WHERE su_id=21700) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29628,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29628, 21700)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29628;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21701
    ))
    FROM activities_raw
    WHERE su_id=21701) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  21702,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (21702, 21701)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=21702;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21707
    ))
    FROM activities_raw
    WHERE su_id=21707) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29629,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29629, 21707)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29629;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21713
    ))
    FROM activities_raw
    WHERE su_id=21713) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29714,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29714, 21713)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29714;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21735
    ))
    FROM activities_raw
    WHERE su_id=21735) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29678,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29678, 21735)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29678;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21737
    ))
    FROM activities_raw
    WHERE su_id=21737) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31539,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31539, 21737)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31539;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1618
    ))
    FROM activities_raw
    WHERE su_id=1618) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30661,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30661, 1618)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30661;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21769
    ))
    FROM activities_raw
    WHERE su_id=21769) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30894,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30894, 21769)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30894;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21778
    ))
    FROM activities_raw
    WHERE su_id=21778) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30773,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30773, 21778)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30773;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21786
    ))
    FROM activities_raw
    WHERE su_id=21786) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29858,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29858, 21786)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29858;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21790
    ))
    FROM activities_raw
    WHERE su_id=21790) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30470,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30470, 21790)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30470;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21799
    ))
    FROM activities_raw
    WHERE su_id=21799) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30084,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30084, 21799)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30084;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10415
    ))
    FROM activities_raw
    WHERE su_id=10415) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31311,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31311, 10415)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31311;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21818
    ))
    FROM activities_raw
    WHERE su_id=21818) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30325,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30325, 21818)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30325;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21840
    ))
    FROM activities_raw
    WHERE su_id=21840) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31201,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31201, 21840)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31201;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21857
    ))
    FROM activities_raw
    WHERE su_id=21857) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31213,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31213, 21857)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31213;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21864
    ))
    FROM activities_raw
    WHERE su_id=21864) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28877,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28877, 21864)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28877;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6044
    ))
    FROM activities_raw
    WHERE su_id=6044) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29278,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29278, 6044)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29278;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21895
    ))
    FROM activities_raw
    WHERE su_id=21895) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29735,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29735, 21895)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29735;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21900
    ))
    FROM activities_raw
    WHERE su_id=21900) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30611,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30611, 21900)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30611;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21910
    ))
    FROM activities_raw
    WHERE su_id=21910) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30047,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30047, 21910)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30047;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21947
    ))
    FROM activities_raw
    WHERE su_id=21947) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30161,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30161, 21947)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30161;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21949
    ))
    FROM activities_raw
    WHERE su_id=21949) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30791,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30791, 21949)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30791;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21954
    ))
    FROM activities_raw
    WHERE su_id=21954) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31039,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31039, 21954)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31039;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21955
    ))
    FROM activities_raw
    WHERE su_id=21955) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30604,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30604, 21955)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30604;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21987
    ))
    FROM activities_raw
    WHERE su_id=21987) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29465,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29465, 21987)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29465;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21992
    ))
    FROM activities_raw
    WHERE su_id=21992) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29541,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29541, 21992)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29541;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=21993
    ))
    FROM activities_raw
    WHERE su_id=21993) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30008,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30008, 21993)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30008;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22001
    ))
    FROM activities_raw
    WHERE su_id=22001) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13117,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13117, 22001)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13117;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22004
    ))
    FROM activities_raw
    WHERE su_id=22004) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 22004)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22008
    ))
    FROM activities_raw
    WHERE su_id=22008) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30587,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30587, 22008)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30587;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22016
    ))
    FROM activities_raw
    WHERE su_id=22016) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31264,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31264, 22016)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31264;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22035
    ))
    FROM activities_raw
    WHERE su_id=22035) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30607,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30607, 22035)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30607;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22037
    ))
    FROM activities_raw
    WHERE su_id=22037) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30603,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30603, 22037)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30603;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22041
    ))
    FROM activities_raw
    WHERE su_id=22041) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29836,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29836, 22041)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29836;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22042
    ))
    FROM activities_raw
    WHERE su_id=22042) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29430,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29430, 22042)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29430;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12507
    ))
    FROM activities_raw
    WHERE su_id=12507) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29279,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29279, 12507)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29279;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22055
    ))
    FROM activities_raw
    WHERE su_id=22055) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31074,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31074, 22055)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31074;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22066
    ))
    FROM activities_raw
    WHERE su_id=22066) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31215,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31215, 22066)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31215;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28297
    ))
    FROM activities_raw
    WHERE su_id=28297) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31569,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31569, 28297)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31569;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22151
    ))
    FROM activities_raw
    WHERE su_id=22151) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30663,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30663, 22151)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30663;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22153
    ))
    FROM activities_raw
    WHERE su_id=22153) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30471,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30471, 22153)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30471;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22162
    ))
    FROM activities_raw
    WHERE su_id=22162) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31015,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31015, 22162)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31015;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22163
    ))
    FROM activities_raw
    WHERE su_id=22163) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31016,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31016, 22163)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31016;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22164
    ))
    FROM activities_raw
    WHERE su_id=22164) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31015,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31015, 22164)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31015;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22170
    ))
    FROM activities_raw
    WHERE su_id=22170) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30472,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30472, 22170)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30472;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22178
    ))
    FROM activities_raw
    WHERE su_id=22178) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28475,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28475, 22178)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28475;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22180
    ))
    FROM activities_raw
    WHERE su_id=22180) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30136,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30136, 22180)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30136;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22203
    ))
    FROM activities_raw
    WHERE su_id=22203) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29636,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29636, 22203)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29636;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22204
    ))
    FROM activities_raw
    WHERE su_id=22204) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30097,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30097, 22204)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30097;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22205
    ))
    FROM activities_raw
    WHERE su_id=22205) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30396,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30396, 22205)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30396;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22241
    ))
    FROM activities_raw
    WHERE su_id=22241) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29568,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29568, 22241)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29568;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12508
    ))
    FROM activities_raw
    WHERE su_id=12508) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29280,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29280, 12508)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29280;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22253
    ))
    FROM activities_raw
    WHERE su_id=22253) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  5179,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (5179, 22253)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=5179;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22263
    ))
    FROM activities_raw
    WHERE su_id=22263) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30473,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30473, 22263)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30473;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22284
    ))
    FROM activities_raw
    WHERE su_id=22284) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29420,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29420, 22284)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29420;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22289
    ))
    FROM activities_raw
    WHERE su_id=22289) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30750,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30750, 22289)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30750;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22294
    ))
    FROM activities_raw
    WHERE su_id=22294) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30902,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30902, 22294)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30902;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22297
    ))
    FROM activities_raw
    WHERE su_id=22297) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30170,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30170, 22297)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30170;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10435
    ))
    FROM activities_raw
    WHERE su_id=10435) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29248,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29248, 10435)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29248;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12800
    ))
    FROM activities_raw
    WHERE su_id=12800) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29282,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29282, 12800)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29282;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6671
    ))
    FROM activities_raw
    WHERE su_id=6671) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29283,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29283, 6671)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29283;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=8073
    ))
    FROM activities_raw
    WHERE su_id=8073) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29285,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29285, 8073)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29285;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22364
    ))
    FROM activities_raw
    WHERE su_id=22364) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30474,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30474, 22364)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30474;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22375
    ))
    FROM activities_raw
    WHERE su_id=22375) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  6783,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (6783, 22375)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=6783;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22387
    ))
    FROM activities_raw
    WHERE su_id=22387) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30116,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30116, 22387)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30116;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6524
    ))
    FROM activities_raw
    WHERE su_id=6524) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31446,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31446, 6524)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31446;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22389
    ))
    FROM activities_raw
    WHERE su_id=22389) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31447,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31447, 22389)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31447;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22413
    ))
    FROM activities_raw
    WHERE su_id=22413) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29043,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29043, 22413)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29043;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28299
    ))
    FROM activities_raw
    WHERE su_id=28299) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30739,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30739, 28299)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30739;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22436
    ))
    FROM activities_raw
    WHERE su_id=22436) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30056,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30056, 22436)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30056;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1642
    ))
    FROM activities_raw
    WHERE su_id=1642) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30664,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30664, 1642)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30664;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22487
    ))
    FROM activities_raw
    WHERE su_id=22487) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  22488,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (22488, 22487)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=22488;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22494
    ))
    FROM activities_raw
    WHERE su_id=22494) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31436,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31436, 22494)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31436;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22503
    ))
    FROM activities_raw
    WHERE su_id=22503) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30475,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30475, 22503)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30475;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22505
    ))
    FROM activities_raw
    WHERE su_id=22505) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31365,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31365, 22505)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31365;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22511
    ))
    FROM activities_raw
    WHERE su_id=22511) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30476,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30476, 22511)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30476;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11910
    ))
    FROM activities_raw
    WHERE su_id=11910) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29286,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29286, 11910)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29286;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22523
    ))
    FROM activities_raw
    WHERE su_id=22523) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31570,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31570, 22523)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31570;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22527
    ))
    FROM activities_raw
    WHERE su_id=22527) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29288,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29288, 22527)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29288;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11913
    ))
    FROM activities_raw
    WHERE su_id=11913) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29287,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29287, 11913)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29287;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22528
    ))
    FROM activities_raw
    WHERE su_id=22528) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29887,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29887, 22528)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29887;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22559
    ))
    FROM activities_raw
    WHERE su_id=22559) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30103,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30103, 22559)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30103;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22562
    ))
    FROM activities_raw
    WHERE su_id=22562) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 22562)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22566
    ))
    FROM activities_raw
    WHERE su_id=22566) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30477,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30477, 22566)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30477;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22567
    ))
    FROM activities_raw
    WHERE su_id=22567) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31014,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31014, 22567)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31014;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22575
    ))
    FROM activities_raw
    WHERE su_id=22575) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30094,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30094, 22575)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30094;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6297
    ))
    FROM activities_raw
    WHERE su_id=6297) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31440,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31440, 6297)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31440;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22578
    ))
    FROM activities_raw
    WHERE su_id=22578) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30285,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30285, 22578)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30285;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22580
    ))
    FROM activities_raw
    WHERE su_id=22580) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29249,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29249, 22580)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29249;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22583
    ))
    FROM activities_raw
    WHERE su_id=22583) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30530,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30530, 22583)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30530;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22591
    ))
    FROM activities_raw
    WHERE su_id=22591) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 22591)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12192
    ))
    FROM activities_raw
    WHERE su_id=12192) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  7189,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (7189, 12192)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=7189;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22592
    ))
    FROM activities_raw
    WHERE su_id=22592) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  7189,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (7189, 22592)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=7189;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22612
    ))
    FROM activities_raw
    WHERE su_id=22612) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30166,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30166, 22612)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30166;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22613
    ))
    FROM activities_raw
    WHERE su_id=22613) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31631,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31631, 22613)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31631;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22622
    ))
    FROM activities_raw
    WHERE su_id=22622) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31373,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31373, 22622)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31373;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22626
    ))
    FROM activities_raw
    WHERE su_id=22626) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30478,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30478, 22626)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30478;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22627
    ))
    FROM activities_raw
    WHERE su_id=22627) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30478,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30478, 22627)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30478;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22629
    ))
    FROM activities_raw
    WHERE su_id=22629) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30028,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30028, 22629)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30028;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22638
    ))
    FROM activities_raw
    WHERE su_id=22638) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30327,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30327, 22638)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30327;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22649
    ))
    FROM activities_raw
    WHERE su_id=22649) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30327,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30327, 22649)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30327;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13413
    ))
    FROM activities_raw
    WHERE su_id=13413) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29289,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29289, 13413)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29289;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22695
    ))
    FROM activities_raw
    WHERE su_id=22695) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  25367,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (25367, 22695)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=25367;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22701
    ))
    FROM activities_raw
    WHERE su_id=22701) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31589,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31589, 22701)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31589;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22703
    ))
    FROM activities_raw
    WHERE su_id=22703) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30071,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30071, 22703)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30071;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22710
    ))
    FROM activities_raw
    WHERE su_id=22710) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31632,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31632, 22710)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31632;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22744
    ))
    FROM activities_raw
    WHERE su_id=22744) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30623,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30623, 22744)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30623;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22751
    ))
    FROM activities_raw
    WHERE su_id=22751) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30083,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30083, 22751)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30083;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22753
    ))
    FROM activities_raw
    WHERE su_id=22753) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30612,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30612, 22753)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30612;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22762
    ))
    FROM activities_raw
    WHERE su_id=22762) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30594,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30594, 22762)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30594;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22788
    ))
    FROM activities_raw
    WHERE su_id=22788) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31082,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31082, 22788)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31082;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22795
    ))
    FROM activities_raw
    WHERE su_id=22795) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29035,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29035, 22795)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29035;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22812
    ))
    FROM activities_raw
    WHERE su_id=22812) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30041,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30041, 22812)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30041;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22820
    ))
    FROM activities_raw
    WHERE su_id=22820) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30482,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30482, 22820)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30482;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22831
    ))
    FROM activities_raw
    WHERE su_id=22831) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30172,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30172, 22831)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30172;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22836
    ))
    FROM activities_raw
    WHERE su_id=22836) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31633,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31633, 22836)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31633;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22838
    ))
    FROM activities_raw
    WHERE su_id=22838) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30385,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30385, 22838)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30385;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22846
    ))
    FROM activities_raw
    WHERE su_id=22846) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30372,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30372, 22846)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30372;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22867
    ))
    FROM activities_raw
    WHERE su_id=22867) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  22868,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (22868, 22867)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=22868;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22886
    ))
    FROM activities_raw
    WHERE su_id=22886) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28792,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28792, 22886)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28792;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22895
    ))
    FROM activities_raw
    WHERE su_id=22895) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31584,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31584, 22895)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31584;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22933
    ))
    FROM activities_raw
    WHERE su_id=22933) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30370,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30370, 22933)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30370;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22934
    ))
    FROM activities_raw
    WHERE su_id=22934) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30054,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30054, 22934)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30054;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22938
    ))
    FROM activities_raw
    WHERE su_id=22938) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31267,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31267, 22938)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31267;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22948
    ))
    FROM activities_raw
    WHERE su_id=22948) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31239,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31239, 22948)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31239;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22951
    ))
    FROM activities_raw
    WHERE su_id=22951) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  23244,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (23244, 22951)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=23244;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22954
    ))
    FROM activities_raw
    WHERE su_id=22954) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30483,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30483, 22954)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30483;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22964
    ))
    FROM activities_raw
    WHERE su_id=22964) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29860,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29860, 22964)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29860;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22973
    ))
    FROM activities_raw
    WHERE su_id=22973) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  8427,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (8427, 22973)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=8427;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=22977
    ))
    FROM activities_raw
    WHERE su_id=22977) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31522,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31522, 22977)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31522;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23001
    ))
    FROM activities_raw
    WHERE su_id=23001) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30109,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30109, 23001)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30109;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23004
    ))
    FROM activities_raw
    WHERE su_id=23004) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30778,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30778, 23004)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30778;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23027
    ))
    FROM activities_raw
    WHERE su_id=23027) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 23027)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10729
    ))
    FROM activities_raw
    WHERE su_id=10729) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29250,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29250, 10729)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29250;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23037
    ))
    FROM activities_raw
    WHERE su_id=23037) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29708,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29708, 23037)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29708;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23038
    ))
    FROM activities_raw
    WHERE su_id=23038) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29106,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29106, 23038)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29106;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23042
    ))
    FROM activities_raw
    WHERE su_id=23042) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 23042)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23047
    ))
    FROM activities_raw
    WHERE su_id=23047) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31262,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31262, 23047)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31262;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23048
    ))
    FROM activities_raw
    WHERE su_id=23048) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30176,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30176, 23048)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30176;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23050
    ))
    FROM activities_raw
    WHERE su_id=23050) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30044,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30044, 23050)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30044;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23055
    ))
    FROM activities_raw
    WHERE su_id=23055) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31429,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31429, 23055)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31429;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23063
    ))
    FROM activities_raw
    WHERE su_id=23063) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29401,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29401, 23063)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29401;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23078
    ))
    FROM activities_raw
    WHERE su_id=23078) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  23241,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (23241, 23078)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=23241;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23079
    ))
    FROM activities_raw
    WHERE su_id=23079) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31257,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31257, 23079)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31257;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10732
    ))
    FROM activities_raw
    WHERE su_id=10732) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29251,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29251, 10732)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29251;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23104
    ))
    FROM activities_raw
    WHERE su_id=23104) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31439,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31439, 23104)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31439;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23106
    ))
    FROM activities_raw
    WHERE su_id=23106) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31246,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31246, 23106)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31246;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23108
    ))
    FROM activities_raw
    WHERE su_id=23108) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30171,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30171, 23108)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30171;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23118
    ))
    FROM activities_raw
    WHERE su_id=23118) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30397,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30397, 23118)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30397;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23119
    ))
    FROM activities_raw
    WHERE su_id=23119) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29492,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29492, 23119)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29492;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23143
    ))
    FROM activities_raw
    WHERE su_id=23143) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13090,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13090, 23143)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13090;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23156
    ))
    FROM activities_raw
    WHERE su_id=23156) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31145,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31145, 23156)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31145;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23179
    ))
    FROM activities_raw
    WHERE su_id=23179) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31634,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31634, 23179)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31634;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23222
    ))
    FROM activities_raw
    WHERE su_id=23222) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30484,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30484, 23222)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30484;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23225
    ))
    FROM activities_raw
    WHERE su_id=23225) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29824,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29824, 23225)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29824;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10473
    ))
    FROM activities_raw
    WHERE su_id=10473) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31495,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31495, 10473)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31495;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23246
    ))
    FROM activities_raw
    WHERE su_id=23246) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31498,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31498, 23246)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31498;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23273
    ))
    FROM activities_raw
    WHERE su_id=23273) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30140,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30140, 23273)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30140;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6299
    ))
    FROM activities_raw
    WHERE su_id=6299) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31438,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31438, 6299)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31438;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23294
    ))
    FROM activities_raw
    WHERE su_id=23294) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  16832,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (16832, 23294)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=16832;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23305
    ))
    FROM activities_raw
    WHERE su_id=23305) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30404,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30404, 23305)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30404;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1669
    ))
    FROM activities_raw
    WHERE su_id=1669) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30671,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30671, 1669)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30671;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23310
    ))
    FROM activities_raw
    WHERE su_id=23310) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28624,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28624, 23310)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28624;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23312
    ))
    FROM activities_raw
    WHERE su_id=23312) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29494,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29494, 23312)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29494;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23330
    ))
    FROM activities_raw
    WHERE su_id=23330) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28626,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28626, 23330)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28626;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23335
    ))
    FROM activities_raw
    WHERE su_id=23335) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30164,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30164, 23335)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30164;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23347
    ))
    FROM activities_raw
    WHERE su_id=23347) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30073,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30073, 23347)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30073;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23363
    ))
    FROM activities_raw
    WHERE su_id=23363) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31534,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31534, 23363)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31534;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23396
    ))
    FROM activities_raw
    WHERE su_id=23396) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30100,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30100, 23396)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30100;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23410
    ))
    FROM activities_raw
    WHERE su_id=23410) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29815,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29815, 23410)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29815;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23411
    ))
    FROM activities_raw
    WHERE su_id=23411) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29810,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29810, 23411)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29810;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23419
    ))
    FROM activities_raw
    WHERE su_id=23419) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30997,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30997, 23419)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30997;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23420
    ))
    FROM activities_raw
    WHERE su_id=23420) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30999,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30999, 23420)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30999;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23421
    ))
    FROM activities_raw
    WHERE su_id=23421) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31000,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31000, 23421)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31000;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23434
    ))
    FROM activities_raw
    WHERE su_id=23434) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31476,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31476, 23434)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31476;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23451
    ))
    FROM activities_raw
    WHERE su_id=23451) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30068,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30068, 23451)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30068;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23481
    ))
    FROM activities_raw
    WHERE su_id=23481) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29727,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29727, 23481)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29727;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23487
    ))
    FROM activities_raw
    WHERE su_id=23487) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30368,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30368, 23487)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30368;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23494
    ))
    FROM activities_raw
    WHERE su_id=23494) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28788,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28788, 23494)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28788;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23506
    ))
    FROM activities_raw
    WHERE su_id=23506) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31570,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31570, 23506)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31570;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23572
    ))
    FROM activities_raw
    WHERE su_id=23572) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 23572)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23575
    ))
    FROM activities_raw
    WHERE su_id=23575) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30129,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30129, 23575)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30129;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23577
    ))
    FROM activities_raw
    WHERE su_id=23577) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30125,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30125, 23577)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30125;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23587
    ))
    FROM activities_raw
    WHERE su_id=23587) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31636,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31636, 23587)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31636;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23597
    ))
    FROM activities_raw
    WHERE su_id=23597) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30405,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30405, 23597)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30405;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23623
    ))
    FROM activities_raw
    WHERE su_id=23623) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30485,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30485, 23623)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30485;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23635
    ))
    FROM activities_raw
    WHERE su_id=23635) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 23635)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6525
    ))
    FROM activities_raw
    WHERE su_id=6525) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31449,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31449, 6525)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31449;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23648
    ))
    FROM activities_raw
    WHERE su_id=23648) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30486,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30486, 23648)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30486;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23651
    ))
    FROM activities_raw
    WHERE su_id=23651) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 23651)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23652
    ))
    FROM activities_raw
    WHERE su_id=23652) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 23652)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23653
    ))
    FROM activities_raw
    WHERE su_id=23653) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 23653)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23662
    ))
    FROM activities_raw
    WHERE su_id=23662) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29091,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29091, 23662)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29091;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28295
    ))
    FROM activities_raw
    WHERE su_id=28295) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  23670,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (23670, 28295)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=23670;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28142
    ))
    FROM activities_raw
    WHERE su_id=28142) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  23670,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (23670, 28142)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=23670;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27901
    ))
    FROM activities_raw
    WHERE su_id=27901) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31338,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31338, 27901)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31338;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23676
    ))
    FROM activities_raw
    WHERE su_id=23676) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30487,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30487, 23676)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30487;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23705
    ))
    FROM activities_raw
    WHERE su_id=23705) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30768,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30768, 23705)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30768;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23712
    ))
    FROM activities_raw
    WHERE su_id=23712) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31190,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31190, 23712)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31190;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1683
    ))
    FROM activities_raw
    WHERE su_id=1683) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30676,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30676, 1683)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30676;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23776
    ))
    FROM activities_raw
    WHERE su_id=23776) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30020,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30020, 23776)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30020;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23792
    ))
    FROM activities_raw
    WHERE su_id=23792) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28943,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28943, 23792)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28943;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23809
    ))
    FROM activities_raw
    WHERE su_id=23809) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  3301,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (3301, 23809)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=3301;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23808
    ))
    FROM activities_raw
    WHERE su_id=23808) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31518,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31518, 23808)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31518;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1686
    ))
    FROM activities_raw
    WHERE su_id=1686) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30686,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30686, 1686)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30686;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23848
    ))
    FROM activities_raw
    WHERE su_id=23848) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30488,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30488, 23848)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30488;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23852
    ))
    FROM activities_raw
    WHERE su_id=23852) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  23851,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (23851, 23852)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=23851;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1974
    ))
    FROM activities_raw
    WHERE su_id=1974) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30688,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30688, 1974)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30688;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23861
    ))
    FROM activities_raw
    WHERE su_id=23861) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30308,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30308, 23861)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30308;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23866
    ))
    FROM activities_raw
    WHERE su_id=23866) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29436,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29436, 23866)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29436;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23872
    ))
    FROM activities_raw
    WHERE su_id=23872) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31639,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31639, 23872)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31639;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23913
    ))
    FROM activities_raw
    WHERE su_id=23913) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30903,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30903, 23913)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30903;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=8953
    ))
    FROM activities_raw
    WHERE su_id=8953) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29667,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29667, 8953)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29667;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23922
    ))
    FROM activities_raw
    WHERE su_id=23922) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28872,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28872, 23922)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28872;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23970
    ))
    FROM activities_raw
    WHERE su_id=23970) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  7479,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (7479, 23970)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=7479;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=23987
    ))
    FROM activities_raw
    WHERE su_id=23987) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30376,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30376, 23987)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30376;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24010
    ))
    FROM activities_raw
    WHERE su_id=24010) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30167,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30167, 24010)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30167;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24014
    ))
    FROM activities_raw
    WHERE su_id=24014) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30392,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30392, 24014)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30392;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24027
    ))
    FROM activities_raw
    WHERE su_id=24027) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29902,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29902, 24027)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29902;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28189
    ))
    FROM activities_raw
    WHERE su_id=28189) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29564,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29564, 28189)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29564;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6526
    ))
    FROM activities_raw
    WHERE su_id=6526) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31453,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31453, 6526)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31453;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24036
    ))
    FROM activities_raw
    WHERE su_id=24036) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30489,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30489, 24036)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30489;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24038
    ))
    FROM activities_raw
    WHERE su_id=24038) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30610,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30610, 24038)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30610;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24039
    ))
    FROM activities_raw
    WHERE su_id=24039) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31367,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31367, 24039)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31367;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24053
    ))
    FROM activities_raw
    WHERE su_id=24053) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31591,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31591, 24053)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31591;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24085
    ))
    FROM activities_raw
    WHERE su_id=24085) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28995,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28995, 24085)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28995;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24089
    ))
    FROM activities_raw
    WHERE su_id=24089) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29718,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29718, 24089)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29718;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24092
    ))
    FROM activities_raw
    WHERE su_id=24092) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30895,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30895, 24092)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30895;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24116
    ))
    FROM activities_raw
    WHERE su_id=24116) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31319,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31319, 24116)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31319;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24133
    ))
    FROM activities_raw
    WHERE su_id=24133) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30715,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30715, 24133)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30715;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24136
    ))
    FROM activities_raw
    WHERE su_id=24136) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  14268,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (14268, 24136)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=14268;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24140
    ))
    FROM activities_raw
    WHERE su_id=24140) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30012,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30012, 24140)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30012;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24156
    ))
    FROM activities_raw
    WHERE su_id=24156) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30168,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30168, 24156)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30168;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24169
    ))
    FROM activities_raw
    WHERE su_id=24169) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31458, 24169)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6531
    ))
    FROM activities_raw
    WHERE su_id=6531) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31458, 6531)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=9730
    ))
    FROM activities_raw
    WHERE su_id=9730) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29290,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29290, 9730)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29290;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14269
    ))
    FROM activities_raw
    WHERE su_id=14269) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29291,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29291, 14269)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29291;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24189
    ))
    FROM activities_raw
    WHERE su_id=24189) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29513,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29513, 24189)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29513;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24194
    ))
    FROM activities_raw
    WHERE su_id=24194) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  22274,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (22274, 24194)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=22274;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6532
    ))
    FROM activities_raw
    WHERE su_id=6532) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31459,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31459, 6532)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31459;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24220
    ))
    FROM activities_raw
    WHERE su_id=24220) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28997,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28997, 24220)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28997;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24221
    ))
    FROM activities_raw
    WHERE su_id=24221) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30490,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30490, 24221)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30490;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24225
    ))
    FROM activities_raw
    WHERE su_id=24225) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30491,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30491, 24225)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30491;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12198
    ))
    FROM activities_raw
    WHERE su_id=12198) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29677,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29677, 12198)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29677;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24237
    ))
    FROM activities_raw
    WHERE su_id=24237) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31044,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31044, 24237)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31044;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24245
    ))
    FROM activities_raw
    WHERE su_id=24245) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31349,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31349, 24245)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31349;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24254
    ))
    FROM activities_raw
    WHERE su_id=24254) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30896,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30896, 24254)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30896;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24280
    ))
    FROM activities_raw
    WHERE su_id=24280) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30313,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30313, 24280)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30313;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24282
    ))
    FROM activities_raw
    WHERE su_id=24282) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31473,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31473, 24282)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31473;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24298
    ))
    FROM activities_raw
    WHERE su_id=24298) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30890,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30890, 24298)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30890;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24307
    ))
    FROM activities_raw
    WHERE su_id=24307) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29602,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29602, 24307)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29602;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24313
    ))
    FROM activities_raw
    WHERE su_id=24313) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30492,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30492, 24313)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30492;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24340
    ))
    FROM activities_raw
    WHERE su_id=24340) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31642,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31642, 24340)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31642;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6300
    ))
    FROM activities_raw
    WHERE su_id=6300) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31485,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31485, 6300)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31485;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1707
    ))
    FROM activities_raw
    WHERE su_id=1707) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30690,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30690, 1707)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30690;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=5400
    ))
    FROM activities_raw
    WHERE su_id=5400) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30314,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30314, 5400)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30314;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24443
    ))
    FROM activities_raw
    WHERE su_id=24443) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31658,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31658, 24443)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31658;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24475
    ))
    FROM activities_raw
    WHERE su_id=24475) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30095,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30095, 24475)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30095;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24496
    ))
    FROM activities_raw
    WHERE su_id=24496) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29143,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29143, 24496)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29143;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24508
    ))
    FROM activities_raw
    WHERE su_id=24508) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  26389,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (26389, 24508)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=26389;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24515
    ))
    FROM activities_raw
    WHERE su_id=24515) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  1413,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (1413, 24515)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=1413;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24564
    ))
    FROM activities_raw
    WHERE su_id=24564) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30612,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30612, 24564)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30612;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24575
    ))
    FROM activities_raw
    WHERE su_id=24575) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29837,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29837, 24575)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29837;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24580
    ))
    FROM activities_raw
    WHERE su_id=24580) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30145,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30145, 24580)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30145;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24584
    ))
    FROM activities_raw
    WHERE su_id=24584) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31645,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31645, 24584)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31645;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24595
    ))
    FROM activities_raw
    WHERE su_id=24595) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29579,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29579, 24595)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29579;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24616
    ))
    FROM activities_raw
    WHERE su_id=24616) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30034,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30034, 24616)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30034;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24675
    ))
    FROM activities_raw
    WHERE su_id=24675) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30364,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30364, 24675)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30364;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6301
    ))
    FROM activities_raw
    WHERE su_id=6301) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29292,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29292, 6301)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29292;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24721
    ))
    FROM activities_raw
    WHERE su_id=24721) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29041,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29041, 24721)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29041;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24727
    ))
    FROM activities_raw
    WHERE su_id=24727) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30620,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30620, 24727)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30620;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24732
    ))
    FROM activities_raw
    WHERE su_id=24732) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 24732)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6302
    ))
    FROM activities_raw
    WHERE su_id=6302) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31486,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31486, 6302)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31486;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6535
    ))
    FROM activities_raw
    WHERE su_id=6535) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31460,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31460, 6535)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31460;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24746
    ))
    FROM activities_raw
    WHERE su_id=24746) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31461,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31461, 24746)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31461;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24758
    ))
    FROM activities_raw
    WHERE su_id=24758) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30720,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30720, 24758)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30720;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24765
    ))
    FROM activities_raw
    WHERE su_id=24765) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30127,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30127, 24765)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30127;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24766
    ))
    FROM activities_raw
    WHERE su_id=24766) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30493,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30493, 24766)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30493;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24774
    ))
    FROM activities_raw
    WHERE su_id=24774) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30494,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30494, 24774)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30494;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24778
    ))
    FROM activities_raw
    WHERE su_id=24778) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 24778)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24782
    ))
    FROM activities_raw
    WHERE su_id=24782) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29254,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29254, 24782)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29254;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24785
    ))
    FROM activities_raw
    WHERE su_id=24785) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30311,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30311, 24785)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30311;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24806
    ))
    FROM activities_raw
    WHERE su_id=24806) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29852,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29852, 24806)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29852;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24809
    ))
    FROM activities_raw
    WHERE su_id=24809) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30013,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30013, 24809)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30013;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13841
    ))
    FROM activities_raw
    WHERE su_id=13841) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  16162,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (16162, 13841)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=16162;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13843
    ))
    FROM activities_raw
    WHERE su_id=13843) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  16162,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (16162, 13843)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=16162;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24819
    ))
    FROM activities_raw
    WHERE su_id=24819) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30519,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30519, 24819)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30519;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11489
    ))
    FROM activities_raw
    WHERE su_id=11489) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29293,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29293, 11489)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29293;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1722
    ))
    FROM activities_raw
    WHERE su_id=1722) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30691,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30691, 1722)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30691;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24852
    ))
    FROM activities_raw
    WHERE su_id=24852) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  24851,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (24851, 24852)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=24851;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24862
    ))
    FROM activities_raw
    WHERE su_id=24862) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30263,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30263, 24862)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30263;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24871
    ))
    FROM activities_raw
    WHERE su_id=24871) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30289,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30289, 24871)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30289;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24872
    ))
    FROM activities_raw
    WHERE su_id=24872) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30289,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30289, 24872)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30289;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24875
    ))
    FROM activities_raw
    WHERE su_id=24875) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29582,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29582, 24875)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29582;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24885
    ))
    FROM activities_raw
    WHERE su_id=24885) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30496,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30496, 24885)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30496;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24886
    ))
    FROM activities_raw
    WHERE su_id=24886) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31255,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31255, 24886)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31255;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24887
    ))
    FROM activities_raw
    WHERE su_id=24887) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31255,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31255, 24887)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31255;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24898
    ))
    FROM activities_raw
    WHERE su_id=24898) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28955,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28955, 24898)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28955;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24900
    ))
    FROM activities_raw
    WHERE su_id=24900) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29917,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29917, 24900)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29917;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13179
    ))
    FROM activities_raw
    WHERE su_id=13179) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31335,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31335, 13179)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31335;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28296
    ))
    FROM activities_raw
    WHERE su_id=28296) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30534,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30534, 28296)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30534;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24911
    ))
    FROM activities_raw
    WHERE su_id=24911) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31139,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31139, 24911)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31139;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24936
    ))
    FROM activities_raw
    WHERE su_id=24936) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30499,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30499, 24936)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30499;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24938
    ))
    FROM activities_raw
    WHERE su_id=24938) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30500,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30500, 24938)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30500;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24939
    ))
    FROM activities_raw
    WHERE su_id=24939) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31560,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31560, 24939)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31560;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=7944
    ))
    FROM activities_raw
    WHERE su_id=7944) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30381,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30381, 7944)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30381;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10762
    ))
    FROM activities_raw
    WHERE su_id=10762) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31317,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31317, 10762)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31317;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24960
    ))
    FROM activities_raw
    WHERE su_id=24960) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13972,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13972, 24960)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13972;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24968
    ))
    FROM activities_raw
    WHERE su_id=24968) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30326,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30326, 24968)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30326;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=3203
    ))
    FROM activities_raw
    WHERE su_id=3203) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29294,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29294, 3203)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29294;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1731
    ))
    FROM activities_raw
    WHERE su_id=1731) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30766,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30766, 1731)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30766;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6303
    ))
    FROM activities_raw
    WHERE su_id=6303) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31487,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31487, 6303)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31487;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24984
    ))
    FROM activities_raw
    WHERE su_id=24984) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30323,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30323, 24984)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30323;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24985
    ))
    FROM activities_raw
    WHERE su_id=24985) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31279,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31279, 24985)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31279;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24986
    ))
    FROM activities_raw
    WHERE su_id=24986) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31299,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31299, 24986)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31299;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24998
    ))
    FROM activities_raw
    WHERE su_id=24998) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29687,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29687, 24998)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29687;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=24999
    ))
    FROM activities_raw
    WHERE su_id=24999) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30105,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30105, 24999)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30105;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25000
    ))
    FROM activities_raw
    WHERE su_id=25000) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31314,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31314, 25000)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31314;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11919
    ))
    FROM activities_raw
    WHERE su_id=11919) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29295,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29295, 11919)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29295;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25015
    ))
    FROM activities_raw
    WHERE su_id=25015) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30128,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30128, 25015)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30128;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25017
    ))
    FROM activities_raw
    WHERE su_id=25017) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30479,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30479, 25017)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30479;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25023
    ))
    FROM activities_raw
    WHERE su_id=25023) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31366,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31366, 25023)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31366;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=8109
    ))
    FROM activities_raw
    WHERE su_id=8109) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29296,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29296, 8109)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29296;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=9397
    ))
    FROM activities_raw
    WHERE su_id=9397) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29297,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29297, 9397)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29297;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25056
    ))
    FROM activities_raw
    WHERE su_id=25056) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29737,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29737, 25056)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29737;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25057
    ))
    FROM activities_raw
    WHERE su_id=25057) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30603,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30603, 25057)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30603;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25060
    ))
    FROM activities_raw
    WHERE su_id=25060) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29028,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29028, 25060)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29028;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25066
    ))
    FROM activities_raw
    WHERE su_id=25066) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31559,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31559, 25066)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31559;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13589
    ))
    FROM activities_raw
    WHERE su_id=13589) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  25084,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (25084, 13589)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=25084;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25090
    ))
    FROM activities_raw
    WHERE su_id=25090) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29827,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29827, 25090)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29827;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10765
    ))
    FROM activities_raw
    WHERE su_id=10765) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29298,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29298, 10765)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29298;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25120
    ))
    FROM activities_raw
    WHERE su_id=25120) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 25120)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25124
    ))
    FROM activities_raw
    WHERE su_id=25124) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 25124)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25127
    ))
    FROM activities_raw
    WHERE su_id=25127) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  14108,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (14108, 25127)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=14108;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25131
    ))
    FROM activities_raw
    WHERE su_id=25131) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30728,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30728, 25131)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30728;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25138
    ))
    FROM activities_raw
    WHERE su_id=25138) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30502,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30502, 25138)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30502;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25144
    ))
    FROM activities_raw
    WHERE su_id=25144) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29145,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29145, 25144)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29145;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10767
    ))
    FROM activities_raw
    WHERE su_id=10767) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29255,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29255, 10767)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29255;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10768
    ))
    FROM activities_raw
    WHERE su_id=10768) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29255,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29255, 10768)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29255;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25159
    ))
    FROM activities_raw
    WHERE su_id=25159) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31468,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31468, 25159)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31468;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6537
    ))
    FROM activities_raw
    WHERE su_id=6537) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31466,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31466, 6537)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31466;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25176
    ))
    FROM activities_raw
    WHERE su_id=25176) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29342,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29342, 25176)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29342;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25178
    ))
    FROM activities_raw
    WHERE su_id=25178) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29980,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29980, 25178)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29980;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25183
    ))
    FROM activities_raw
    WHERE su_id=25183) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  24153,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (24153, 25183)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=24153;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25189
    ))
    FROM activities_raw
    WHERE su_id=25189) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29385,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29385, 25189)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29385;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25191
    ))
    FROM activities_raw
    WHERE su_id=25191) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31647,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31647, 25191)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31647;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25218
    ))
    FROM activities_raw
    WHERE su_id=25218) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30544,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30544, 25218)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30544;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25219
    ))
    FROM activities_raw
    WHERE su_id=25219) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30191,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30191, 25219)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30191;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25232
    ))
    FROM activities_raw
    WHERE su_id=25232) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  26093,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (26093, 25232)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=26093;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25246
    ))
    FROM activities_raw
    WHERE su_id=25246) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  24964,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (24964, 25246)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=24964;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25267
    ))
    FROM activities_raw
    WHERE su_id=25267) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30395,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30395, 25267)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30395;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25300
    ))
    FROM activities_raw
    WHERE su_id=25300) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31296,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31296, 25300)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31296;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25317
    ))
    FROM activities_raw
    WHERE su_id=25317) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29661,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29661, 25317)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29661;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25337
    ))
    FROM activities_raw
    WHERE su_id=25337) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 25337)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25347
    ))
    FROM activities_raw
    WHERE su_id=25347) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31072,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31072, 25347)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31072;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25371
    ))
    FROM activities_raw
    WHERE su_id=25371) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30503,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30503, 25371)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30503;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25375
    ))
    FROM activities_raw
    WHERE su_id=25375) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13090,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13090, 25375)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13090;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25381
    ))
    FROM activities_raw
    WHERE su_id=25381) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30531,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30531, 25381)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30531;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25384
    ))
    FROM activities_raw
    WHERE su_id=25384) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29691,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29691, 25384)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29691;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25391
    ))
    FROM activities_raw
    WHERE su_id=25391) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31363,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31363, 25391)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31363;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25397
    ))
    FROM activities_raw
    WHERE su_id=25397) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30102,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30102, 25397)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30102;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25408
    ))
    FROM activities_raw
    WHERE su_id=25408) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 25408)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25413
    ))
    FROM activities_raw
    WHERE su_id=25413) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30828,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30828, 25413)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30828;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25416
    ))
    FROM activities_raw
    WHERE su_id=25416) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31648,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31648, 25416)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31648;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25427
    ))
    FROM activities_raw
    WHERE su_id=25427) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29692,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29692, 25427)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29692;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6543
    ))
    FROM activities_raw
    WHERE su_id=6543) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29300,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29300, 6543)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29300;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25444
    ))
    FROM activities_raw
    WHERE su_id=25444) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29299,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29299, 25444)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29299;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25445
    ))
    FROM activities_raw
    WHERE su_id=25445) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29299,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29299, 25445)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29299;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25446
    ))
    FROM activities_raw
    WHERE su_id=25446) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29299,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29299, 25446)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29299;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25457
    ))
    FROM activities_raw
    WHERE su_id=25457) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 25457)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25460
    ))
    FROM activities_raw
    WHERE su_id=25460) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30050,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30050, 25460)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30050;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25461
    ))
    FROM activities_raw
    WHERE su_id=25461) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31366,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31366, 25461)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31366;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25486
    ))
    FROM activities_raw
    WHERE su_id=25486) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30504,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30504, 25486)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30504;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25501
    ))
    FROM activities_raw
    WHERE su_id=25501) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30072,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30072, 25501)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30072;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25510
    ))
    FROM activities_raw
    WHERE su_id=25510) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29594,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29594, 25510)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29594;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10772
    ))
    FROM activities_raw
    WHERE su_id=10772) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28939,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28939, 10772)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28939;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28225
    ))
    FROM activities_raw
    WHERE su_id=28225) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31059,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31059, 28225)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31059;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25539
    ))
    FROM activities_raw
    WHERE su_id=25539) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30048,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30048, 25539)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30048;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25541
    ))
    FROM activities_raw
    WHERE su_id=25541) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31219,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31219, 25541)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31219;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28197
    ))
    FROM activities_raw
    WHERE su_id=28197) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29302,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29302, 28197)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29302;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28196
    ))
    FROM activities_raw
    WHERE su_id=28196) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29301,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29301, 28196)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29301;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25548
    ))
    FROM activities_raw
    WHERE su_id=25548) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30065,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30065, 25548)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30065;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25555
    ))
    FROM activities_raw
    WHERE su_id=25555) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28790,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28790, 25555)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28790;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25559
    ))
    FROM activities_raw
    WHERE su_id=25559) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30505,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30505, 25559)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30505;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25561
    ))
    FROM activities_raw
    WHERE su_id=25561) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  23670,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (23670, 25561)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=23670;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25573
    ))
    FROM activities_raw
    WHERE su_id=25573) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30506,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30506, 25573)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30506;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14273
    ))
    FROM activities_raw
    WHERE su_id=14273) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29304,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29304, 14273)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29304;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25593
    ))
    FROM activities_raw
    WHERE su_id=25593) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30151,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30151, 25593)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30151;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10563
    ))
    FROM activities_raw
    WHERE su_id=10563) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30269,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30269, 10563)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30269;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12634
    ))
    FROM activities_raw
    WHERE su_id=12634) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31345,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31345, 12634)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31345;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28223
    ))
    FROM activities_raw
    WHERE su_id=28223) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31062,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31062, 28223)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31062;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25615
    ))
    FROM activities_raw
    WHERE su_id=25615) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31059,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31059, 25615)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31059;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25634
    ))
    FROM activities_raw
    WHERE su_id=25634) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31333,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31333, 25634)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31333;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25636
    ))
    FROM activities_raw
    WHERE su_id=25636) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30049,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30049, 25636)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30049;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25637
    ))
    FROM activities_raw
    WHERE su_id=25637) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31395,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31395, 25637)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31395;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25643
    ))
    FROM activities_raw
    WHERE su_id=25643) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29032,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29032, 25643)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29032;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25644
    ))
    FROM activities_raw
    WHERE su_id=25644) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29016,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29016, 25644)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29016;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25652
    ))
    FROM activities_raw
    WHERE su_id=25652) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30532,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30532, 25652)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30532;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=4198
    ))
    FROM activities_raw
    WHERE su_id=4198) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29755,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29755, 4198)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29755;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25668
    ))
    FROM activities_raw
    WHERE su_id=25668) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30858,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30858, 25668)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30858;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=2575
    ))
    FROM activities_raw
    WHERE su_id=2575) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31220,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31220, 2575)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31220;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25678
    ))
    FROM activities_raw
    WHERE su_id=25678) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30507,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30507, 25678)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30507;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25686
    ))
    FROM activities_raw
    WHERE su_id=25686) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30390,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30390, 25686)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30390;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25688
    ))
    FROM activities_raw
    WHERE su_id=25688) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29841,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29841, 25688)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29841;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25710
    ))
    FROM activities_raw
    WHERE su_id=25710) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30786,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30786, 25710)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30786;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25722
    ))
    FROM activities_raw
    WHERE su_id=25722) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30508,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30508, 25722)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30508;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25724
    ))
    FROM activities_raw
    WHERE su_id=25724) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30615,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30615, 25724)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30615;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=12637
    ))
    FROM activities_raw
    WHERE su_id=12637) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28940,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28940, 12637)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28940;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25742
    ))
    FROM activities_raw
    WHERE su_id=25742) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29257,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29257, 25742)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29257;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25769
    ))
    FROM activities_raw
    WHERE su_id=25769) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31581,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31581, 25769)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31581;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25772
    ))
    FROM activities_raw
    WHERE su_id=25772) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31366,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31366, 25772)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31366;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25776
    ))
    FROM activities_raw
    WHERE su_id=25776) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30001,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30001, 25776)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30001;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10775
    ))
    FROM activities_raw
    WHERE su_id=10775) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28941,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28941, 10775)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28941;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11953
    ))
    FROM activities_raw
    WHERE su_id=11953) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28942,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28942, 11953)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28942;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25903
    ))
    FROM activities_raw
    WHERE su_id=25903) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29668,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29668, 25903)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29668;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25911
    ))
    FROM activities_raw
    WHERE su_id=25911) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30603,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30603, 25911)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30603;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14298
    ))
    FROM activities_raw
    WHERE su_id=14298) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  14262,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (14262, 14298)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=14262;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11524
    ))
    FROM activities_raw
    WHERE su_id=11524) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29306,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29306, 11524)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29306;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25951
    ))
    FROM activities_raw
    WHERE su_id=25951) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31437,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31437, 25951)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31437;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25954
    ))
    FROM activities_raw
    WHERE su_id=25954) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31649,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31649, 25954)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31649;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25965
    ))
    FROM activities_raw
    WHERE su_id=25965) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31221,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31221, 25965)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31221;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25972
    ))
    FROM activities_raw
    WHERE su_id=25972) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31060,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31060, 25972)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31060;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=25976
    ))
    FROM activities_raw
    WHERE su_id=25976) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30196,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30196, 25976)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30196;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26012
    ))
    FROM activities_raw
    WHERE su_id=26012) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30070,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30070, 26012)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30070;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26014
    ))
    FROM activities_raw
    WHERE su_id=26014) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29307,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29307, 26014)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29307;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11954
    ))
    FROM activities_raw
    WHERE su_id=11954) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29308,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29308, 11954)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29308;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=2578
    ))
    FROM activities_raw
    WHERE su_id=2578) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31222,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31222, 2578)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31222;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26048
    ))
    FROM activities_raw
    WHERE su_id=26048) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31222,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31222, 26048)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31222;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26062
    ))
    FROM activities_raw
    WHERE su_id=26062) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30853,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30853, 26062)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30853;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26077
    ))
    FROM activities_raw
    WHERE su_id=26077) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30509,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30509, 26077)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30509;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10584
    ))
    FROM activities_raw
    WHERE su_id=10584) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31464,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31464, 10584)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31464;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26083
    ))
    FROM activities_raw
    WHERE su_id=26083) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30510,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30510, 26083)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30510;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26106
    ))
    FROM activities_raw
    WHERE su_id=26106) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29258,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29258, 26106)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29258;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10778
    ))
    FROM activities_raw
    WHERE su_id=10778) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29259,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29259, 10778)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29259;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26112
    ))
    FROM activities_raw
    WHERE su_id=26112) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29399,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29399, 26112)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29399;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26117
    ))
    FROM activities_raw
    WHERE su_id=26117) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  26116,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (26116, 26117)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=26116;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26122
    ))
    FROM activities_raw
    WHERE su_id=26122) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31380,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31380, 26122)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31380;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26123
    ))
    FROM activities_raw
    WHERE su_id=26123) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31379,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31379, 26123)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31379;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26201
    ))
    FROM activities_raw
    WHERE su_id=26201) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 26201)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26202
    ))
    FROM activities_raw
    WHERE su_id=26202) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30617,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30617, 26202)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30617;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26203
    ))
    FROM activities_raw
    WHERE su_id=26203) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31267,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31267, 26203)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31267;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6551
    ))
    FROM activities_raw
    WHERE su_id=6551) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31477,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31477, 6551)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31477;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26221
    ))
    FROM activities_raw
    WHERE su_id=26221) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30511,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30511, 26221)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30511;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26223
    ))
    FROM activities_raw
    WHERE su_id=26223) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29467,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29467, 26223)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29467;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26241
    ))
    FROM activities_raw
    WHERE su_id=26241) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30859,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30859, 26241)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30859;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26242
    ))
    FROM activities_raw
    WHERE su_id=26242) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 26242)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26249
    ))
    FROM activities_raw
    WHERE su_id=26249) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30197,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30197, 26249)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30197;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6307
    ))
    FROM activities_raw
    WHERE su_id=6307) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31488,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31488, 6307)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31488;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26261
    ))
    FROM activities_raw
    WHERE su_id=26261) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28724,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28724, 26261)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28724;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26289
    ))
    FROM activities_raw
    WHERE su_id=26289) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31312,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31312, 26289)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31312;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26296
    ))
    FROM activities_raw
    WHERE su_id=26296) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31472,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31472, 26296)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31472;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26297
    ))
    FROM activities_raw
    WHERE su_id=26297) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31323,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31323, 26297)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31323;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26314
    ))
    FROM activities_raw
    WHERE su_id=26314) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29597,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29597, 26314)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29597;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26320
    ))
    FROM activities_raw
    WHERE su_id=26320) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31491,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31491, 26320)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31491;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26322
    ))
    FROM activities_raw
    WHERE su_id=26322) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30619,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30619, 26322)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30619;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26327
    ))
    FROM activities_raw
    WHERE su_id=26327) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31650,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31650, 26327)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31650;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26328
    ))
    FROM activities_raw
    WHERE su_id=26328) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 26328)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26377
    ))
    FROM activities_raw
    WHERE su_id=26377) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30614,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30614, 26377)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30614;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14184
    ))
    FROM activities_raw
    WHERE su_id=14184) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29310,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29310, 14184)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29310;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26404
    ))
    FROM activities_raw
    WHERE su_id=26404) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 26404)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26409
    ))
    FROM activities_raw
    WHERE su_id=26409) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29663,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29663, 26409)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29663;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26415
    ))
    FROM activities_raw
    WHERE su_id=26415) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26415)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26416
    ))
    FROM activities_raw
    WHERE su_id=26416) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29176,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29176, 26416)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29176;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26418
    ))
    FROM activities_raw
    WHERE su_id=26418) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29194,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29194, 26418)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29194;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26420
    ))
    FROM activities_raw
    WHERE su_id=26420) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29195,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29195, 26420)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29195;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26421
    ))
    FROM activities_raw
    WHERE su_id=26421) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29174,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29174, 26421)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29174;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26423
    ))
    FROM activities_raw
    WHERE su_id=26423) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29172,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29172, 26423)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29172;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26424
    ))
    FROM activities_raw
    WHERE su_id=26424) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26424)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26425
    ))
    FROM activities_raw
    WHERE su_id=26425) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29193,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29193, 26425)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29193;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26426
    ))
    FROM activities_raw
    WHERE su_id=26426) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26426)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26427
    ))
    FROM activities_raw
    WHERE su_id=26427) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29193,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29193, 26427)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29193;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26428
    ))
    FROM activities_raw
    WHERE su_id=26428) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29081,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29081, 26428)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29081;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26429
    ))
    FROM activities_raw
    WHERE su_id=26429) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29194,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29194, 26429)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29194;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26431
    ))
    FROM activities_raw
    WHERE su_id=26431) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29195,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29195, 26431)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29195;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26432
    ))
    FROM activities_raw
    WHERE su_id=26432) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26432)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26433
    ))
    FROM activities_raw
    WHERE su_id=26433) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29195,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29195, 26433)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29195;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26434
    ))
    FROM activities_raw
    WHERE su_id=26434) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26434)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26436
    ))
    FROM activities_raw
    WHERE su_id=26436) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29167,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29167, 26436)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29167;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26437
    ))
    FROM activities_raw
    WHERE su_id=26437) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26437)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26438
    ))
    FROM activities_raw
    WHERE su_id=26438) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29175,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29175, 26438)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29175;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26439
    ))
    FROM activities_raw
    WHERE su_id=26439) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29170,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29170, 26439)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29170;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26440
    ))
    FROM activities_raw
    WHERE su_id=26440) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29169,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29169, 26440)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29169;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26441
    ))
    FROM activities_raw
    WHERE su_id=26441) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29171,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29171, 26441)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29171;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26442
    ))
    FROM activities_raw
    WHERE su_id=26442) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29080,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29080, 26442)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29080;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26443
    ))
    FROM activities_raw
    WHERE su_id=26443) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29193,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29193, 26443)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29193;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26444
    ))
    FROM activities_raw
    WHERE su_id=26444) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29193,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29193, 26444)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29193;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26445
    ))
    FROM activities_raw
    WHERE su_id=26445) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26445)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26446
    ))
    FROM activities_raw
    WHERE su_id=26446) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29173,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29173, 26446)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29173;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26447
    ))
    FROM activities_raw
    WHERE su_id=26447) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26447)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26448
    ))
    FROM activities_raw
    WHERE su_id=26448) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29168,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29168, 26448)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29168;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26449
    ))
    FROM activities_raw
    WHERE su_id=26449) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26449)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26450
    ))
    FROM activities_raw
    WHERE su_id=26450) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29195,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29195, 26450)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29195;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26451
    ))
    FROM activities_raw
    WHERE su_id=26451) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29200,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29200, 26451)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29200;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26452
    ))
    FROM activities_raw
    WHERE su_id=26452) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29195,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29195, 26452)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29195;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26453
    ))
    FROM activities_raw
    WHERE su_id=26453) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29177,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29177, 26453)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29177;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26455
    ))
    FROM activities_raw
    WHERE su_id=26455) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29076,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29076, 26455)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29076;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26456
    ))
    FROM activities_raw
    WHERE su_id=26456) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29162,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29162, 26456)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29162;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26457
    ))
    FROM activities_raw
    WHERE su_id=26457) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29165,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29165, 26457)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29165;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26458
    ))
    FROM activities_raw
    WHERE su_id=26458) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29127,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29127, 26458)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29127;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26459
    ))
    FROM activities_raw
    WHERE su_id=26459) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29148,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29148, 26459)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29148;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26460
    ))
    FROM activities_raw
    WHERE su_id=26460) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29193,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29193, 26460)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29193;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26461
    ))
    FROM activities_raw
    WHERE su_id=26461) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29125,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29125, 26461)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29125;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26462
    ))
    FROM activities_raw
    WHERE su_id=26462) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29126,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29126, 26462)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29126;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26463
    ))
    FROM activities_raw
    WHERE su_id=26463) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29163,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29163, 26463)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29163;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26465
    ))
    FROM activities_raw
    WHERE su_id=26465) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29082,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29082, 26465)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29082;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26466
    ))
    FROM activities_raw
    WHERE su_id=26466) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29164,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29164, 26466)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29164;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26467
    ))
    FROM activities_raw
    WHERE su_id=26467) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29193,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29193, 26467)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29193;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26475
    ))
    FROM activities_raw
    WHERE su_id=26475) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30147,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30147, 26475)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30147;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26476
    ))
    FROM activities_raw
    WHERE su_id=26476) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29622,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29622, 26476)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29622;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26477
    ))
    FROM activities_raw
    WHERE su_id=26477) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30785,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30785, 26477)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30785;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26480
    ))
    FROM activities_raw
    WHERE su_id=26480) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29146,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29146, 26480)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29146;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26520
    ))
    FROM activities_raw
    WHERE su_id=26520) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29901,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29901, 26520)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29901;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28289
    ))
    FROM activities_raw
    WHERE su_id=28289) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  1413,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (1413, 28289)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=1413;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14299
    ))
    FROM activities_raw
    WHERE su_id=14299) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29659,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29659, 14299)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29659;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26536
    ))
    FROM activities_raw
    WHERE su_id=26536) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13972,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13972, 26536)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13972;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26545
    ))
    FROM activities_raw
    WHERE su_id=26545) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29288,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29288, 26545)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29288;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27894
    ))
    FROM activities_raw
    WHERE su_id=27894) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  12543,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (12543, 27894)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=12543;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26576
    ))
    FROM activities_raw
    WHERE su_id=26576) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30785,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30785, 26576)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30785;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26584
    ))
    FROM activities_raw
    WHERE su_id=26584) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29669,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29669, 26584)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29669;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=7481
    ))
    FROM activities_raw
    WHERE su_id=7481) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29669,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29669, 7481)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29669;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26583
    ))
    FROM activities_raw
    WHERE su_id=26583) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29669,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29669, 26583)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29669;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26607
    ))
    FROM activities_raw
    WHERE su_id=26607) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30163,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30163, 26607)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30163;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26623
    ))
    FROM activities_raw
    WHERE su_id=26623) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30123,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30123, 26623)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30123;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26630
    ))
    FROM activities_raw
    WHERE su_id=26630) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31518,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31518, 26630)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31518;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26657
    ))
    FROM activities_raw
    WHERE su_id=26657) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30081,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30081, 26657)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30081;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26692
    ))
    FROM activities_raw
    WHERE su_id=26692) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28622,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28622, 26692)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28622;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26693
    ))
    FROM activities_raw
    WHERE su_id=26693) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28629,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28629, 26693)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28629;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26694
    ))
    FROM activities_raw
    WHERE su_id=26694) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28632,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28632, 26694)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28632;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26695
    ))
    FROM activities_raw
    WHERE su_id=26695) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28636,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28636, 26695)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28636;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26696
    ))
    FROM activities_raw
    WHERE su_id=26696) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28643,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28643, 26696)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28643;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26697
    ))
    FROM activities_raw
    WHERE su_id=26697) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 26697)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26698
    ))
    FROM activities_raw
    WHERE su_id=26698) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28649,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28649, 26698)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28649;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26699
    ))
    FROM activities_raw
    WHERE su_id=26699) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28653,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28653, 26699)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28653;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26700
    ))
    FROM activities_raw
    WHERE su_id=26700) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28656,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28656, 26700)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28656;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26702
    ))
    FROM activities_raw
    WHERE su_id=26702) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28671,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28671, 26702)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28671;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26703
    ))
    FROM activities_raw
    WHERE su_id=26703) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28672,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28672, 26703)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28672;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=14189
    ))
    FROM activities_raw
    WHERE su_id=14189) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  14013,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (14013, 14189)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=14013;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26704
    ))
    FROM activities_raw
    WHERE su_id=26704) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28676,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28676, 26704)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28676;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26705
    ))
    FROM activities_raw
    WHERE su_id=26705) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28679,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28679, 26705)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28679;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26706
    ))
    FROM activities_raw
    WHERE su_id=26706) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28678,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28678, 26706)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28678;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26707
    ))
    FROM activities_raw
    WHERE su_id=26707) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28703,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28703, 26707)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28703;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26709
    ))
    FROM activities_raw
    WHERE su_id=26709) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28704,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28704, 26709)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28704;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26708
    ))
    FROM activities_raw
    WHERE su_id=26708) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29326,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29326, 26708)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29326;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26711
    ))
    FROM activities_raw
    WHERE su_id=26711) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31565,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31565, 26711)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31565;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26712
    ))
    FROM activities_raw
    WHERE su_id=26712) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28666,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28666, 26712)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28666;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26713
    ))
    FROM activities_raw
    WHERE su_id=26713) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28708,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28708, 26713)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28708;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26714
    ))
    FROM activities_raw
    WHERE su_id=26714) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28709,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28709, 26714)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28709;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26715
    ))
    FROM activities_raw
    WHERE su_id=26715) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28932,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28932, 26715)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28932;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26716
    ))
    FROM activities_raw
    WHERE su_id=26716) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28711,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28711, 26716)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28711;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26717
    ))
    FROM activities_raw
    WHERE su_id=26717) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28712,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28712, 26717)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28712;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26718
    ))
    FROM activities_raw
    WHERE su_id=26718) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28713,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28713, 26718)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28713;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26719
    ))
    FROM activities_raw
    WHERE su_id=26719) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28714,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28714, 26719)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28714;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26720
    ))
    FROM activities_raw
    WHERE su_id=26720) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28715,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28715, 26720)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28715;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26721
    ))
    FROM activities_raw
    WHERE su_id=26721) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28716,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28716, 26721)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28716;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26722
    ))
    FROM activities_raw
    WHERE su_id=26722) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30743,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30743, 26722)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30743;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26725
    ))
    FROM activities_raw
    WHERE su_id=26725) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29458,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29458, 26725)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29458;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26727
    ))
    FROM activities_raw
    WHERE su_id=26727) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30512,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30512, 26727)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30512;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26733
    ))
    FROM activities_raw
    WHERE su_id=26733) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30854,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30854, 26733)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30854;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11930
    ))
    FROM activities_raw
    WHERE su_id=11930) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29311,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29311, 11930)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29311;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=13881
    ))
    FROM activities_raw
    WHERE su_id=13881) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  26743,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (26743, 13881)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=26743;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26744
    ))
    FROM activities_raw
    WHERE su_id=26744) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 26744)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=11931
    ))
    FROM activities_raw
    WHERE su_id=11931) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29312,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29312, 11931)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29312;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26749
    ))
    FROM activities_raw
    WHERE su_id=26749) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30723,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30723, 26749)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30723;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26766
    ))
    FROM activities_raw
    WHERE su_id=26766) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13090,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13090, 26766)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13090;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26767
    ))
    FROM activities_raw
    WHERE su_id=26767) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13090,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13090, 26767)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13090;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26768
    ))
    FROM activities_raw
    WHERE su_id=26768) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  13090,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (13090, 26768)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=13090;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26775
    ))
    FROM activities_raw
    WHERE su_id=26775) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29260,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29260, 26775)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29260;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26787
    ))
    FROM activities_raw
    WHERE su_id=26787) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  26785,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (26785, 26787)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=26785;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26810
    ))
    FROM activities_raw
    WHERE su_id=26810) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31086,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31086, 26810)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31086;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26818
    ))
    FROM activities_raw
    WHERE su_id=26818) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31507,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31507, 26818)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31507;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26836
    ))
    FROM activities_raw
    WHERE su_id=26836) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30630,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30630, 26836)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30630;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26839
    ))
    FROM activities_raw
    WHERE su_id=26839) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30625,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30625, 26839)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30625;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26840
    ))
    FROM activities_raw
    WHERE su_id=26840) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30625,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30625, 26840)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30625;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26876
    ))
    FROM activities_raw
    WHERE su_id=26876) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26876)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26882
    ))
    FROM activities_raw
    WHERE su_id=26882) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26882)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26883
    ))
    FROM activities_raw
    WHERE su_id=26883) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26883)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26886
    ))
    FROM activities_raw
    WHERE su_id=26886) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26886)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26905
    ))
    FROM activities_raw
    WHERE su_id=26905) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26905)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26908
    ))
    FROM activities_raw
    WHERE su_id=26908) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26908)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26910
    ))
    FROM activities_raw
    WHERE su_id=26910) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26910)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26911
    ))
    FROM activities_raw
    WHERE su_id=26911) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26911)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26912
    ))
    FROM activities_raw
    WHERE su_id=26912) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26912)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26913
    ))
    FROM activities_raw
    WHERE su_id=26913) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26913)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26914
    ))
    FROM activities_raw
    WHERE su_id=26914) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26914)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26915
    ))
    FROM activities_raw
    WHERE su_id=26915) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26915)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26916
    ))
    FROM activities_raw
    WHERE su_id=26916) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26916)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26917
    ))
    FROM activities_raw
    WHERE su_id=26917) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26917)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26919
    ))
    FROM activities_raw
    WHERE su_id=26919) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26919)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26920
    ))
    FROM activities_raw
    WHERE su_id=26920) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26920)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26924
    ))
    FROM activities_raw
    WHERE su_id=26924) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30393,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30393, 26924)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30393;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26927
    ))
    FROM activities_raw
    WHERE su_id=26927) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30393,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30393, 26927)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30393;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26928
    ))
    FROM activities_raw
    WHERE su_id=26928) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26928)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26930
    ))
    FROM activities_raw
    WHERE su_id=26930) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26930)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26948
    ))
    FROM activities_raw
    WHERE su_id=26948) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26948)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26949
    ))
    FROM activities_raw
    WHERE su_id=26949) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30402,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30402, 26949)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30402;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26988
    ))
    FROM activities_raw
    WHERE su_id=26988) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29566,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29566, 26988)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29566;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=26994
    ))
    FROM activities_raw
    WHERE su_id=26994) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30720,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30720, 26994)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30720;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27001
    ))
    FROM activities_raw
    WHERE su_id=27001) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30745,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30745, 27001)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30745;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27095
    ))
    FROM activities_raw
    WHERE su_id=27095) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30126,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30126, 27095)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30126;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27100
    ))
    FROM activities_raw
    WHERE su_id=27100) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30162,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30162, 27100)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30162;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27102
    ))
    FROM activities_raw
    WHERE su_id=27102) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30087,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30087, 27102)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30087;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27103
    ))
    FROM activities_raw
    WHERE su_id=27103) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30088,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30088, 27103)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30088;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27112
    ))
    FROM activities_raw
    WHERE su_id=27112) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31285,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31285, 27112)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31285;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27123
    ))
    FROM activities_raw
    WHERE su_id=27123) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 27123)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27124
    ))
    FROM activities_raw
    WHERE su_id=27124) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30621,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30621, 27124)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30621;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27179
    ))
    FROM activities_raw
    WHERE su_id=27179) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  23241,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (23241, 27179)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=23241;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27190
    ))
    FROM activities_raw
    WHERE su_id=27190) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30104,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30104, 27190)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30104;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10785
    ))
    FROM activities_raw
    WHERE su_id=10785) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29261,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29261, 10785)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29261;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27195
    ))
    FROM activities_raw
    WHERE su_id=27195) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30513,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30513, 27195)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30513;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27200
    ))
    FROM activities_raw
    WHERE su_id=27200) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30609,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30609, 27200)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30609;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27202
    ))
    FROM activities_raw
    WHERE su_id=27202) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30119,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30119, 27202)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30119;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27203
    ))
    FROM activities_raw
    WHERE su_id=27203) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28866,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28866, 27203)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28866;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27256
    ))
    FROM activities_raw
    WHERE su_id=27256) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31381,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31381, 27256)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31381;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27264
    ))
    FROM activities_raw
    WHERE su_id=27264) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30514,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30514, 27264)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30514;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27267
    ))
    FROM activities_raw
    WHERE su_id=27267) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31654,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31654, 27267)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31654;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27287
    ))
    FROM activities_raw
    WHERE su_id=27287) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 27287)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27288
    ))
    FROM activities_raw
    WHERE su_id=27288) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 27288)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27289
    ))
    FROM activities_raw
    WHERE su_id=27289) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 27289)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27291
    ))
    FROM activities_raw
    WHERE su_id=27291) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29840,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29840, 27291)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29840;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27292
    ))
    FROM activities_raw
    WHERE su_id=27292) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  20847,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (20847, 27292)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=20847;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27307
    ))
    FROM activities_raw
    WHERE su_id=27307) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30905,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30905, 27307)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30905;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27308
    ))
    FROM activities_raw
    WHERE su_id=27308) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31655,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31655, 27308)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31655;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27315
    ))
    FROM activities_raw
    WHERE su_id=27315) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30713,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30713, 27315)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30713;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27316
    ))
    FROM activities_raw
    WHERE su_id=27316) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30515,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30515, 27316)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30515;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27317
    ))
    FROM activities_raw
    WHERE su_id=27317) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29135,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29135, 27317)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29135;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27318
    ))
    FROM activities_raw
    WHERE su_id=27318) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30535,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30535, 27318)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30535;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27357
    ))
    FROM activities_raw
    WHERE su_id=27357) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29939,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29939, 27357)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29939;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27362
    ))
    FROM activities_raw
    WHERE su_id=27362) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30516,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30516, 27362)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30516;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27380
    ))
    FROM activities_raw
    WHERE su_id=27380) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30518,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30518, 27380)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30518;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27389
    ))
    FROM activities_raw
    WHERE su_id=27389) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30612,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30612, 27389)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30612;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27390
    ))
    FROM activities_raw
    WHERE su_id=27390) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  7257,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (7257, 27390)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=7257;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27392
    ))
    FROM activities_raw
    WHERE su_id=27392) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30165,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30165, 27392)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30165;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27400
    ))
    FROM activities_raw
    WHERE su_id=27400) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31656,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31656, 27400)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31656;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27412
    ))
    FROM activities_raw
    WHERE su_id=27412) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31211,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31211, 27412)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31211;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6313
    ))
    FROM activities_raw
    WHERE su_id=6313) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31490,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31490, 6313)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31490;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27466
    ))
    FROM activities_raw
    WHERE su_id=27466) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30521,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30521, 27466)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30521;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27468
    ))
    FROM activities_raw
    WHERE su_id=27468) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31277,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31277, 27468)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31277;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=7252
    ))
    FROM activities_raw
    WHERE su_id=7252) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29752,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29752, 7252)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29752;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27477
    ))
    FROM activities_raw
    WHERE su_id=27477) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29858,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29858, 27477)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29858;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27478
    ))
    FROM activities_raw
    WHERE su_id=27478) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29858,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29858, 27478)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29858;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27482
    ))
    FROM activities_raw
    WHERE su_id=27482) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29861,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29861, 27482)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29861;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27486
    ))
    FROM activities_raw
    WHERE su_id=27486) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30391,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30391, 27486)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30391;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27487
    ))
    FROM activities_raw
    WHERE su_id=27487) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30265,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30265, 27487)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30265;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27490
    ))
    FROM activities_raw
    WHERE su_id=27490) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30121,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30121, 27490)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30121;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27497
    ))
    FROM activities_raw
    WHERE su_id=27497) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30312,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30312, 27497)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30312;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27500
    ))
    FROM activities_raw
    WHERE su_id=27500) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29796,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29796, 27500)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29796;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27501
    ))
    FROM activities_raw
    WHERE su_id=27501) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29796,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29796, 27501)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29796;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=10786
    ))
    FROM activities_raw
    WHERE su_id=10786) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29262,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29262, 10786)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29262;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=1789
    ))
    FROM activities_raw
    WHERE su_id=1789) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30714,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30714, 1789)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30714;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27558
    ))
    FROM activities_raw
    WHERE su_id=27558) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29505,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29505, 27558)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29505;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27577
    ))
    FROM activities_raw
    WHERE su_id=27577) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30522,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30522, 27577)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30522;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=28222
    ))
    FROM activities_raw
    WHERE su_id=28222) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31059,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31059, 28222)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31059;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27603
    ))
    FROM activities_raw
    WHERE su_id=27603) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29513,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29513, 27603)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29513;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27613
    ))
    FROM activities_raw
    WHERE su_id=27613) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31377,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31377, 27613)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31377;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27621
    ))
    FROM activities_raw
    WHERE su_id=27621) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31323,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31323, 27621)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31323;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27622
    ))
    FROM activities_raw
    WHERE su_id=27622) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30082,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30082, 27622)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30082;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27631
    ))
    FROM activities_raw
    WHERE su_id=27631) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29270,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29270, 27631)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29270;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=6554
    ))
    FROM activities_raw
    WHERE su_id=6554) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31499,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31499, 6554)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31499;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27670
    ))
    FROM activities_raw
    WHERE su_id=27670) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31042,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31042, 27670)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31042;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27712
    ))
    FROM activities_raw
    WHERE su_id=27712) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  29906,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (29906, 27712)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=29906;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27719
    ))
    FROM activities_raw
    WHERE su_id=27719) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30898,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30898, 27719)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30898;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27732
    ))
    FROM activities_raw
    WHERE su_id=27732) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30802,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30802, 27732)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30802;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=2586
    ))
    FROM activities_raw
    WHERE su_id=2586) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30803,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30803, 2586)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30803;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27733
    ))
    FROM activities_raw
    WHERE su_id=27733) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30802,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30802, 27733)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30802;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27734
    ))
    FROM activities_raw
    WHERE su_id=27734) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30801,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30801, 27734)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30801;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27747
    ))
    FROM activities_raw
    WHERE su_id=27747) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28644,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28644, 27747)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28644;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27757
    ))
    FROM activities_raw
    WHERE su_id=27757) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31176,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31176, 27757)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31176;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27758
    ))
    FROM activities_raw
    WHERE su_id=27758) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31269,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31269, 27758)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31269;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27775
    ))
    FROM activities_raw
    WHERE su_id=27775) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  30523,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (30523, 27775)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=30523;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=27787
    ))
    FROM activities_raw
    WHERE su_id=27787) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31260,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31260, 27787)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31260;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15161
    ))
    FROM activities_raw
    WHERE su_id=15161) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28637,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28637, 15161)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28637;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15160
    ))
    FROM activities_raw
    WHERE su_id=15160) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28634,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28634, 15160)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28634;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15163
    ))
    FROM activities_raw
    WHERE su_id=15163) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28571,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28571, 15163)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28571;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15153
    ))
    FROM activities_raw
    WHERE su_id=15153) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28594,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28594, 15153)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28594;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15152
    ))
    FROM activities_raw
    WHERE su_id=15152) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28650,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28650, 15152)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28650;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15151
    ))
    FROM activities_raw
    WHERE su_id=15151) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28684,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28684, 15151)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28684;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15150
    ))
    FROM activities_raw
    WHERE su_id=15150) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28638,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28638, 15150)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28638;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15147
    ))
    FROM activities_raw
    WHERE su_id=15147) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28645,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28645, 15147)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28645;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15126
    ))
    FROM activities_raw
    WHERE su_id=15126) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28641,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28641, 15126)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28641;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15145
    ))
    FROM activities_raw
    WHERE su_id=15145) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28675,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28675, 15145)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28675;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15125
    ))
    FROM activities_raw
    WHERE su_id=15125) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28654,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28654, 15125)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28654;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15123
    ))
    FROM activities_raw
    WHERE su_id=15123) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28625,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28625, 15123)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28625;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15166
    ))
    FROM activities_raw
    WHERE su_id=15166) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28667,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28667, 15166)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28667;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15162
    ))
    FROM activities_raw
    WHERE su_id=15162) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28539,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28539, 15162)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28539;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15156
    ))
    FROM activities_raw
    WHERE su_id=15156) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28664,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28664, 15156)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28664;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15159
    ))
    FROM activities_raw
    WHERE su_id=15159) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28696,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28696, 15159)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28696;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15149
    ))
    FROM activities_raw
    WHERE su_id=15149) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28532,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28532, 15149)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28532;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15141
    ))
    FROM activities_raw
    WHERE su_id=15141) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28553,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28553, 15141)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28553;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15140
    ))
    FROM activities_raw
    WHERE su_id=15140) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28660,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28660, 15140)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28660;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15139
    ))
    FROM activities_raw
    WHERE su_id=15139) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28697,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28697, 15139)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28697;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15154
    ))
    FROM activities_raw
    WHERE su_id=15154) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28693,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28693, 15154)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28693;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15137
    ))
    FROM activities_raw
    WHERE su_id=15137) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28718,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28718, 15137)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28718;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15144
    ))
    FROM activities_raw
    WHERE su_id=15144) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28670,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28670, 15144)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28670;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15132
    ))
    FROM activities_raw
    WHERE su_id=15132) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28590,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28590, 15132)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28590;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15130
    ))
    FROM activities_raw
    WHERE su_id=15130) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28666,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28666, 15130)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28666;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15128
    ))
    FROM activities_raw
    WHERE su_id=15128) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28659,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28659, 15128)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28659;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15155
    ))
    FROM activities_raw
    WHERE su_id=15155) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28656,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28656, 15155)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28656;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15127
    ))
    FROM activities_raw
    WHERE su_id=15127) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28651,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28651, 15127)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28651;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15136
    ))
    FROM activities_raw
    WHERE su_id=15136) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28588,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28588, 15136)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28588;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15135
    ))
    FROM activities_raw
    WHERE su_id=15135) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28565,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28565, 15135)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28565;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15134
    ))
    FROM activities_raw
    WHERE su_id=15134) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28692,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28692, 15134)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28692;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15124
    ))
    FROM activities_raw
    WHERE su_id=15124) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28627,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28627, 15124)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28627;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15129
    ))
    FROM activities_raw
    WHERE su_id=15129) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28662,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28662, 15129)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28662;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15167
    ))
    FROM activities_raw
    WHERE su_id=15167) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31308,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31308, 15167)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31308;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15157
    ))
    FROM activities_raw
    WHERE su_id=15157) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28668,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28668, 15157)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28668;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15131
    ))
    FROM activities_raw
    WHERE su_id=15131) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28674,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28674, 15131)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28674;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15143
    ))
    FROM activities_raw
    WHERE su_id=15143) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  31361,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (31361, 15143)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=31361;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15142
    ))
    FROM activities_raw
    WHERE su_id=15142) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28661,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28661, 15142)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28661;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15158
    ))
    FROM activities_raw
    WHERE su_id=15158) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28630,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28630, 15158)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28630;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15165
    ))
    FROM activities_raw
    WHERE su_id=15165) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28657,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28657, 15165)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28657;
WITH activities AS (
  SELECT ARRAY(
    SELECT DISTINCT unnest(activities || (
      SELECT activities
      FROM activities_raw
      WHERE su_id=15164
    ))
    FROM activities_raw
    WHERE su_id=15164) activities
)
INSERT INTO activities_raw (su_id, url, activities)
VALUES (
  28658,
  (SELECT DISTINCT unnest(array_agg(url)) url
   FROM activities_raw
   WHERE su_id IN (28658, 15164)
   LIMIT 1),
  (SELECT activities FROM activities)
)
ON CONFLICT (su_id) DO UPDATE
  SET activities=(SELECT activities FROM activities)
  WHERE activities_raw.su_id=28658;
