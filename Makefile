#SHELL := /bin/bash
DATED=$(shell date '+%Y-%m-%d')

all: geojson topojson


glop:
	ssh studio.stamen.com "cd /var/www/com.stamen.studio/openspaces/show/latest && git pull"

latest:
	ssh studio.stamen.com "cd /var/www/com.stamen.studio/openspaces/show/latest && git pull"

dated-latest:
	ssh studio.stamen.com "cd /var/www/com.stamen.studio/openspaces/show \
	&& mkdir -p $(DATED) \
	&& cp -r latest/www/ $(DATED)"


show:
	ssh studio.stamen.com "cd /var/www/com.stamen.studio/openspaces/show \
	&& mkdir -p $(DATED) \
	&& cp -r --parents fractured_atlas/play $(DATED)"

geojson:
	cd data/ && rm -f superunits_hashtags_counts.geojson && ogr2ogr -s_srs EPSG:900913 -t_srs EPSG:4326 -f geojson superunits_hashtags_counts.geojson pg:"host=geo.local user=openspaces" -sql "select a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom from superunits_hashtags a left join (select park_name, count(park_name) as venuecount, sum(checkinscount) as checkinscount from park_contains_all group by park_name order by venuecount desc, checkinscount desc) as b on a.unit_name = b.park_name where a.hashtag is not null group by a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom;"

topojson:
	cd data && rm -f superunits_hashtags_counts.topojson && topojson -o superunits_hashtags_counts.topojson superunits_hashtags_counts.geojson -p -q 1e5

geojson2:
	cd data/ && rm -f superunits_hashtags_counts2.geojson && ogr2ogr -s_srs EPSG:900913 -t_srs EPSG:4326 -f geojson superunits_hashtags_counts2.geojson pg:"host=geo.local user=openspaces" -sql "select a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom from superunits_hashtags a left join (select park_name, count(park_name) as venuecount, sum(checkinscount) as checkinscount from park_contains_all group by park_name order by venuecount desc, checkinscount desc) as b on a.unit_name = b.park_name where a.hashtag is not null OR a.agncy_id = 108 OR a.agncy_id = 109 group by a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom;"

topojson2:
	cd data && rm -f superunits_hashtags_counts2.topojson && topojson -o superunits_hashtags_counts2.topojson superunits_hashtags_counts2.geojson -p -q 1e5

flickrdbtable:
	psql -U openspaces -h geo.local -c "drop table park_flickr_photos;" \
	&& psql -U openspaces -h geo.local -c "create table park_flickr_photos as select park.su_id as su_id, park.unit_name as su_name, park.hashtag as park_hashtag, photo.* from cpad_2013b_superunits_ids as park join flickr_photos_distinct as photo on ST_Contains(park.geom,photo.the_geom);"

flickrgeojson:
	cd data/ && rm -f park_flickr_photos.json \
	&& ogr2ogr -f geojson park_flickr_photos.json pg:"host=geo.local user=openspaces" -sql "select containing_park_id::int, photoid::text, owner, secret, server, farm, title, woeid, the_geom from park_flickr_photos;"
