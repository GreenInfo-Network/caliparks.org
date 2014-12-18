"use strict";

var env       = require('require-env'),
    pg        = require('pg'),
    escape    = require('pg-escape'),
    getPlace  = require('../lib/get-place.js'),
    hipcamp   = require('../lib/hipcamp.js'),
    sanitizer = require('sanitizer');

var DATABASE_URL = env.require('DATABASE_URL');

var buildQuery = function buildQuery(data, callback) {
  // format activities to match pg's @> operator (for arrays)
  var activities = (data.query.with || '')
        .split(',')
        .slice(0, 20)
        .filter(function(x) {
          return !!x;
        })
        .map(function(x) {
          return "'" + x + "'";
        })
        .join(', '),
      fullQuery,
      scoreSubQuery = [
        ', (',
        '  WITH stats AS (',
        '    SELECT * FROM park_stats',
        '  )',
        '  SELECT (stats.flickr_photo_count + stats.instagram_photo_count + stats.tweet_count + stats.foursquare_venue_count + stats.foursquare_tip_count) * (CASE WHEN stats.hipcamp_activity_count > 0 THEN 10 ELSE 1 END) * (CASE WHEN stats.cpad_facility_count > 0 THEN 5 ELSE 1 END) AS score',
        '  FROM stats',
        '  WHERE stats.superunit_id = shortlist.superunit_id',
        ') AS score',
      ].join('\n'),
      geoScoreSubQuery = [
        ', (',
        '  WITH stats AS (',
        '    SELECT * FROM park_stats',
        '  )',
        '  SELECT ((stats.flickr_photo_count + stats.instagram_photo_count + stats.tweet_count + stats.foursquare_venue_count + stats.foursquare_tip_count) * (CASE WHEN stats.hipcamp_activity_count > 0 THEN 10 ELSE 1 END) * (CASE WHEN stats.cpad_facility_count > 0 THEN 5 ELSE 1 END) / (ST_Distance(geom::geometry, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geometry)*10)) AS score',
        '  FROM stats',
        '  WHERE stats.superunit_id = shortlist.superunit_id',
        ') AS score',
      ].join('\n'),
      scoreOrderBy = 'score DESC,';

  //
  // Decide which kind of search this is
  //
  var perpage = ((data.options) ? data.options.perpage : null) || 100,
      not     = ((data.options) ? data.options.not     : null) ? ' AND superunit_id <> ' + parseInt(data.options.not) : '',
      startat = ((data.options) ? data.options.startat : null) || 0;

  if (data.query.bbox) {
    // bbox takes priority

    var bbox = data.query.bbox.split(",").map(parseFloat);

    fullQuery = {
      text: escape([
        'SELECT',
        '  shortlist.unit_name,',
        '  shortlist.superunit_id,',
        '  shortlist.access_typ,',
        '  shortlist.park_url,',
        '  shortlist.mng_agncy,',
        '  activities.activities,',
        '  ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(shortlist.geom, 4326)))) AS centroid',
        '  %s',
        'FROM (select superunit_id, activities from activities) activities',
        'JOIN cpad_superunits shortlist USING (superunit_id)',
        'LEFT JOIN (SELECT su_id, geom FROM cpad_entry_points WHERE pt_type = \'primary\' LIMIT 1) AS cpad_entry_points ON cpad_entry_points.su_id = shortlist.superunit_id',
        'WHERE ST_Transform(shortlist.geom, 4326) && ST_MakeEnvelope($3, $4, $5, $6, 4326)',
        '  AND activities @> %s',
        '  AND access_typ=\'Open Access\'',
        'ORDER BY %s shortlist.unit_name ASC',
        'OFFSET $1',
        'LIMIT $2'
    ].join('\n'),
      scoreSubQuery,
      'ARRAY[' + activities + ']::text[]',
      scoreOrderBy),
      values : [startat, perpage].concat(bbox)
    };

    return callback(null, fullQuery, null);

  } else if (data.query.with && data.query.near) { //Has amenities & near filter

    // With
    //

    return getPlace(data.query.near, function(err, place) {
      if (err) {
        return callback(err);
      }

      fullQuery = {
        text: escape([
          "SELECT",
          "  shortlist.unit_name,",
          "  shortlist.superunit_id,",
          "  shortlist.access_typ,",
          "  shortlist.park_url,",
          "  shortlist.mng_agncy,",
          "  activities.activities,",
          "  ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(shortlist.geom, 4326)))) AS centroid,",
          "  ST_Distance(shortlist.geom, ST_Transform(ST_SetSRID(ST_MakePoint($1, $2), 4326), ST_SRID(shortlist.geom))) AS distance",
          "FROM (select superunit_id, activities from activities) activities",
          "JOIN cpad_superunits shortlist USING (superunit_id)",
          "LEFT JOIN (SELECT su_id, geom FROM cpad_entry_points WHERE pt_type = 'primary' LIMIT 1) AS cpad_entry_points ON cpad_entry_points.su_id = shortlist.superunit_id",
          "WHERE activities @> ARRAY[%s]",
          "  AND access_typ='Open Access'",
          "ORDER BY distance ASC",
          "OFFSET $3",
          "LIMIT $4"
        ].join('\n'),
          activities),
          values : [place.coordinates[1], place.coordinates[0], startat, perpage]
        };

      return callback(null, fullQuery, place.bounds);
    });

  } else if (data.query.near) { //Has near filter

    return getPlace(data.query.near, function(err, place) {
      if (err) {
        return callback(err);
      }

      fullQuery = {
        text: [
          "SELECT",
          "  shortlist.unit_name,",
          "  shortlist.superunit_id,",
          "  shortlist.access_typ,",
          "  shortlist.park_url,",
          "  shortlist.mng_agncy,",
          "  ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(shortlist.geom, 4326)))) AS centroid,",
          "  activities,",
          "  geo.distance distance",
          "FROM (  SELECT    *  FROM cpad_superunits  LEFT JOIN activities USING (superunit_id)  WHERE access_typ='Open Access' AND ST_DWithin(geom, ST_Transform(ST_SetSRID(ST_MakePoint($1,$2), 4326), ST_SRID(geom)), 300000)) AS shortlist",
          "LEFT JOIN (SELECT *, park_stats.flickr_photo_count + park_stats.instagram_photo_count + park_stats.tweet_count + park_stats.foursquare_venue_count + park_stats.foursquare_tip_count AS score FROM park_stats) stats ON stats.superunit_id = shortlist.superunit_id",
          "LEFT JOIN (SELECT *, ST_Distance(cpad_superunits.geom, ST_Transform(ST_SetSRID(ST_MakePoint($1,$2), 4326), ST_SRID(cpad_superunits.geom))) as distance FROM cpad_superunits) geo ON geo.superunit_id = shortlist.superunit_id",
          "LEFT JOIN (SELECT su_id, geom FROM cpad_entry_points WHERE pt_type = 'primary' LIMIT 1) AS cpad_entry_points ON cpad_entry_points.su_id = shortlist.superunit_id",

          // cap to parks within 50km (to make the activity whitelist behave as
          // expected)
          "WHERE geo.distance <= 50000",

          // put parks matching the activity whitelist first
          "ORDER BY NOT ARRAY['kiteboardingWindsurfing','climbing','horsebackRiding','rusticCabins','caving','whitewaterRaftingKayaking','boating','backpacking','historicalSite','fishing','biking','hiking','swimming','ohv','kayakingCanoeing','snowSports','wildlifeWatching','surfing','camping'] @> shortlist.activities,",
          "  geo.distance ASC",
          "OFFSET $4",
          "LIMIT $3"
        ].join('\n'),
        values: [place.coordinates[1], place.coordinates[0], perpage, startat]
      };

      return callback(null, fullQuery, place.bounds);
    });

  } else if (data.query.with) { // Has amenities filter

    fullQuery = {
      text: escape([
        "SELECT",
        "  shortlist.unit_name,",
        "  shortlist.superunit_id,",
        "  shortlist.access_typ,",
        "  shortlist.park_url,",
        "  shortlist.mng_agncy,",
        "  activities.activities,",
        "  ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(shortlist.geom, 4326)))) AS centroid",
        "  %s",
        "FROM (select superunit_id, activities from activities) activities",
        "JOIN cpad_superunits shortlist USING (superunit_id)",
        "LEFT JOIN (SELECT su_id, geom FROM cpad_entry_points WHERE pt_type = 'primary' LIMIT 1) AS cpad_entry_points ON cpad_entry_points.su_id = shortlist.superunit_id",
        "WHERE activities @> %s",
        "  AND access_typ='Open Access'",
        "ORDER BY %s shortlist.unit_name ASC",
        "OFFSET $1",
        "LIMIT $2"
    ].join("\n"), scoreSubQuery, "ARRAY[" + activities + "]::text[]", scoreOrderBy),
      values : [startat, perpage]
    };

    return callback(null, fullQuery, null);

  } else {
    fullQuery = {
      text: [
        "SELECT",
        "  shortlist.unit_name,",
        "  shortlist.superunit_id,",
        "  shortlist.access_typ,",
        "  shortlist.park_url,",
        "  shortlist.mng_agncy,",
        "  activities.activities,",
        "  ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(shortlist.geom, 4326)))) AS centroid",
        "FROM cpad_superunits shortlist",
        "JOIN featured_parks USING (superunit_id)",
        "LEFT JOIN (select superunit_id, activities from activities) activities USING (superunit_id)",
        "LEFT JOIN (SELECT su_id, geom FROM cpad_entry_points WHERE pt_type = 'primary' LIMIT 1) AS cpad_entry_points ON cpad_entry_points.su_id = shortlist.superunit_id",
        "WHERE access_typ='Open Access'",
        "ORDER BY random()",
        "LIMIT $1"
      ].join("\n"),
      values : [perpage]
    };

    return callback(null, fullQuery, null);
  }
}

var getPark = function getPark(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  superunit_id, unit_name, manager_id, cpad_superunits.mng_agncy, access_typ, gis_acres, park_url,",
      "  ST_AsGeoJSON(ST_Envelope(ST_Transform(cpad_superunits.geom, 4326))) AS bbox,",
      "  ST_AsGeoJSON(ST_Transform(cpad_superunits.geom, 4326)) AS geometry,",
      "  ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(cpad_superunits.geom, 4326)))) AS centroid,",
      "  activities.activities,",
      "  site_hipcamp_activities.url AS hipcamp_url",
      "FROM cpad_superunits",
      "LEFT JOIN (SELECT su_id, geom FROM cpad_entry_points WHERE pt_type = 'primary' LIMIT 1) AS cpad_entry_points ON cpad_entry_points.su_id = cpad_superunits.superunit_id",
      "LEFT JOIN activities USING (superunit_id)",
      "LEFT JOIN site_hipcamp_activities ON site_hipcamp_activities.su_id=cpad_superunits.superunit_id",
      "WHERE superunit_id = $1",
      "   AND access_typ='Open Access'",
      "LIMIT 1"
    ].join("\n");

    return client.query(query, [parkId], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      //
      // Format activity data
      //
      if (result.rows[0] && result.rows[0].activities) {
        result.rows[0].activity = {};
        result.rows[0].activity.items = hipcamp.filterActivityData(result.rows[0].activities);
      }

      return callback(null, result.rows[0]);
    });
  });
};

var getParkStats = function(parkId, options, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  superunit_id,",
      " flickr_photo_count,",
      " instagram_photo_count,",
      " foursquare_tip_count,",
      " foursquare_venue_count,",
      " swarm_checkin_count,",
      " tweet_count",
      "FROM park_stats",
      "WHERE superunit_id = $1"
    ].join("\n");

    return client.query(query, [parkId], function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      return callback(null, result.rows[0]);
    });
  });
};

var getRandomBest = function(callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var query = [
      "SELECT",
      "  *,",
      " (stats.flickr_photo_count + stats.instagram_photo_count + stats.tweet_count + stats.foursquare_venue_count + stats.foursquare_tip_count) AS score",
      "FROM park_stats stats",
      "ORDER BY score DESC",
      "LIMIT 1",
      "OFFSET random()*1000"
    ].join("\n");

    return client.query(query, function(err, result) {
      done();

      if (err) {
        return callback(err);
      }
      return callback(null, result.rows[0]);
    });
  });
};

var getParks = function(options, _callback) {

  var dbLimit = '';

  return pg.connect(DATABASE_URL, function(err, client, done, elapsedMS) {

    var callback = function() {
      done();
      return _callback.apply(null, arguments);
    };

    if (options.perpage) {
      dbLimit = ' LIMIT ' + options.perpage;
    }

    return buildQuery(options, function(err, fullQuery, bounds) {

      if (err) {
        return callback(err);
      }

      return client.query(fullQuery, function(err, result) {

        if (err) {
          console.error('error running query: %s', fullQuery.text, err);
          return callback(err);
        }

        //
        // Format output
        //
        result.rows.forEach(function(row) {

          //
          // Clean up activity names and categorize
          //
          if (row.activities) {
            row.activity = {};
            row.activity.items = hipcamp.filterActivityData(row.activities);
          }

          //
          // Convert meters to miles
          //
          if (row.distance) {
            //convert to miles
            row.distance *= 0.00062137;

            if (row.distance <= 0.25) {
              row.distance = 0.25;
            } else if (row.distance <= 0.5) {
              row.distance = 0.5;
            } else if (row.distance <= 0.75) {
              row.distance = 0.75;
            } else {
              row.distance = Math.round(row.distance);
            }
          }

          row.name  = row.unit_name;
        });

        //
        // Sometimes it is important to filter out one item from the
        // results. This can be passed as an argument from API consumers
        //
        if (options.options && options.options.not) {
          result.rows = result.rows.filter(function(row) {
            if ((row.superunit_id|0) !== (options.options.not|0)) {
              return true;
            }
          });
        }

        return callback(null, result.rows, bounds);
      });
    });

  });
};

//cpad_superunits
var getParksByIdList = function getParksByIdList(idListArray, withString, callback) {
  return pg.connect(DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      return callback(err);
    }

    var queryArray = sanitizer.sanitize((withString || '')).split(',').slice(0, 20),
        activities = queryArray
        .filter(function(x) {
          return !!x;
        })
        .map(function(x) {
          return "'" + x + "'";
        })
        .join(', '),
        query;


    if (withString && withString.length) {
      query = {
        text : escape([
          "SELECT unit_name, superunit_id, activities,",
          "  ST_AsGeoJSON(ST_Transform(cpad_superunits.geom, 4326)) AS geometry,",
          "  ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(cpad_superunits.geom, 4326)))) AS centroid",
          " FROM cpad_superunits",
          "LEFT JOIN (SELECT su_id, geom FROM cpad_entry_points WHERE pt_type = \'primary\' LIMIT 1) AS cpad_entry_points ON cpad_entry_points.su_id = cpad_superunits.superunit_id",
          "LEFT JOIN activities USING (superunit_id)",
          'WHERE activities @> %s',
          "AND superunit_id = ANY(%s);"
          ].join("\n"),'ARRAY[' + activities + ']','ARRAY['+idListArray.join(',')+']')
        };
    } else {
      query = {
        text : escape([
          "SELECT unit_name, superunit_id, activities,",
          "  ST_AsGeoJSON(ST_Transform(cpad_superunits.geom, 4326)) AS geometry,",
          "  ST_AsGeoJSON(COALESCE(cpad_entry_points.geom, ST_Centroid(ST_Transform(cpad_superunits.geom, 4326)))) AS centroid",
          " FROM cpad_superunits",
          "LEFT JOIN (SELECT su_id, geom FROM cpad_entry_points WHERE pt_type = \'primary\' LIMIT 1) AS cpad_entry_points ON cpad_entry_points.su_id = cpad_superunits.superunit_id",
          "LEFT JOIN activities USING (superunit_id)",
          "WHERE superunit_id = ANY(%s);"
          ].join("\n"),'ARRAY['+idListArray.join(',')+']')
        };
    }


    return client.query(query, function(err, result) {
      done();

      if (err) {
        return callback(err);
      }

      result.rows = result.rows.map(function(row) {
        //
        // Format activity data
        //
        if (row && row.activities) {
          row.activity = {};
          row.activity.items = hipcamp.filterActivityData(row.activities);
        }

        return row;
      });

      return callback(null, result.rows);
    });
  });
};

module.exports = {
  getPark          : getPark,
  getParkStats     : getParkStats,
  getParks         : getParks,
  getRandomBest    : getRandomBest,
  getParksByIdList : getParksByIdList
};
