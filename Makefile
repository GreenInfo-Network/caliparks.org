all: geojson topojson

geojson:
	cd data/ && rm -f superunits_hashtags_counts.geojson && ogr2ogr -s_srs EPSG:900913 -t_srs EPSG:4326 -f geojson superunits_hashtags_counts.geojson pg:"host=geo.local user=openspaces" -sql "select a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom from superunits_hashtags a left join (select park_name, count(park_name) as venuecount, sum(checkinscount) as checkinscount from park_contains_all group by park_name order by venuecount desc, checkinscount desc) as b on a.unit_name = b.park_name where a.hashtag is not null group by a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom;"

topojson:
	cd data && rm -f superunits_hashtags_counts.topojson && topojson -o superunits_hashtags_counts.topojson superunits_hashtags_counts.geojson -p -q 1e5
