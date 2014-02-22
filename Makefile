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

# These geojson and topojson commands are obsolete.
geojson:
	cd data/ && rm -f superunits_hashtags_counts.geojson && ogr2ogr -s_srs EPSG:900913 -t_srs EPSG:4326 -f geojson superunits_hashtags_counts.geojson pg:"host=geo.local user=openspaces" -sql "select a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom from superunits_hashtags a left join (select park_name, count(park_name) as venuecount, sum(checkinscount) as checkinscount from park_contains_all group by park_name order by venuecount desc, checkinscount desc) as b on a.unit_name = b.park_name where a.hashtag is not null group by a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom;"

topojson:
	cd data && rm -f superunits_hashtags_counts.topojson && topojson -o superunits_hashtags_counts.topojson superunits_hashtags_counts.geojson -p -q 1e5

geojson2:
	cd data/ && rm -f superunits_hashtags_counts2.geojson && ogr2ogr -s_srs EPSG:900913 -t_srs EPSG:4326 -f geojson superunits_hashtags_counts2.geojson pg:"host=geo.local user=openspaces" -sql "select a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom from superunits_hashtags a left join (select park_name, count(park_name) as venuecount, sum(checkinscount) as checkinscount from park_contains_all group by park_name order by venuecount desc, checkinscount desc) as b on a.unit_name = b.park_name where a.hashtag is not null OR a.agncy_id = 108 OR a.agncy_id = 109 group by a.unit_name, a.hashtag, a.agncy_id, b.venuecount, b.checkinscount, a.geom;"

topojson2:
	cd data && rm -f superunits_hashtags_counts2.topojson && topojson -o superunits_hashtags_counts2.topojson superunits_hashtags_counts2.geojson -p -q 1e5

twitterHarvesterTable:
# Needs better way of importing the csv file
	psql -U openspaces -h geo.local -c "drop table tweets_harvest;" \
	&& psql -U openspaces -h geo.local -c "create table tweets_harvest (id_str varchar, place varchar, something varchar, coords varchar(40), username varchar(20), fullname varchar(40), client varchar(80), date timestamp, retweet_count int, favorite_count int, lang varchar(3), content varchar);" \
	&& csvclean harvesters/twitter_stream_to_import.csv \
	&& psql -U openspaces -h geo.local -c "\copy tweets_harvest FROM 'harvesters/twitter_stream_to_import_out.csv' DELIMITER ',' CSV;" \
	&& psql -U openspaces -h geo.local -c "alter table tweets_harvest add column wkt varchar;" \
	&& psql -U openspaces -h geo.local -c "update tweets_harvest set wkt = regexp_replace(regexp_replace(regexp_replace(coords, ']', ')'), ',', ''), '\[', 'POINT(');" \
	&& psql -U openspaces -h geo.local -c "SELECT AddGeometryColumn('tweets_harvest','the_geom',4326,'POINT',2);" \
	&& psql -U openspaces -h geo.local -c "UPDATE tweets_harvest SET the_geom = GeometryFromText(wkt, 4326);"

twitterParkTable:
# Instead of creating park_tweets, we need to append to that table...
	psql -U openspaces -h geo.local -c "create table park_tweets_temp as select park.su_id as su_id, park.unit_name as su_name, tweet.* from cpad_2013b_superunits_ids as park join tweets_harvest as tweet on ST_Contains(park.geom,tweet.the_geom);" \
	&& psql -U openspaces -h geo.local -c "insert into park_tweets select * from park_tweets_temp;" \
	&& psql -U openspaces -h geo.local -c "drop table park_tweets_temp;" \

#TODO: include command to create flickrHarvesterTable

#TODO: include step to uniquify
flickrParkTable:
	psql -U openspaces -h geo.local -c "drop table park_flickr_photos;" \
	&& psql -U openspaces -h geo.local -c "create table park_flickr_photos as select park.su_id as su_id, park.unit_name as su_name, photo.* from cpad_2013b_superunits_ids as park join flickr_photos_distinct as photo on ST_Contains(park.geom,photo.the_geom);"

instagramHarvesterTable:
	psql -U openspaces -h geo.local -c "drop table instagram_photos;" \
	&& psql -U openspaces -h geo.local -c "create table instagram_photos (photoid varchar(40), attribution varchar, latitude float, longitude float, placename varchar, placeid bigint, commentcount int, filter varchar(20), created_time bigint, link varchar, likescount int, standard_resolution varchar, width int, height int, caption varchar, username varchar(40), website varchar, profile_picture varchar, bio varchar, userid bigint)" \
	&& psql -U openspaces -h geo.local -c "SELECT AddGeometryColumn('instagram_photos','the_geom',4326,'POINT',2);"
# Later, populate the_geom after importing.

# should no longer be needed
instagramHarvesterTableUpdate:
	psql -U openspaces -h geo.local -c "UPDATE instagram_photos SET the_geom = ST_SetSRID(ST_MakePoint(longitude,latitude), 4326);"

instagramHarvesterTableDistinct:
	psql -U openspaces -h geo.local -c "drop table instagram_photos_distinct;" \
	&& psql -U openspaces -h geo.local -c "create table instagram_photos_distinct as select distinct on (photoid) * from instagram_photos;" \

# This keeps track of all the harvester queries
instagramMetadataTable:
	psql -U openspaces -h geo.local -c "drop table instagram_metadata;" \
	&& psql -U openspaces -h geo.local -c "create table instagram_metadata (su_id int, lat float, lng float, radius float, date timestamp, count int);" \
	&& psql -U openspaces -h geo.local -c "select AddGeometryColumn('instagram_metadata','the_geom',3310,'POLYGON',2);"

# should no longer be needed
instagramMetadataTableUpdate:
	psql -U openspaces -h geo.local -c "UPDATE instagram_metadata SET the_geom = ST_Buffer(ST_transform(ST_SetSRID(ST_makepoint(lng, lat),4326),3310), radius);"

# Later, populate the_geom after importing.
#TODO: include step to uniquify
instagramParkTable:
	psql -U openspaces -h geo.local -c "drop table park_instagram_photos;" \
	&& psql -U openspaces -h geo.local -c "create table park_instagram_photos as select park.su_id as su_id, park.unit_name as su_name, photo.* from cpad_2013b_superunits_ids as park join instagram_photos_distinct as photo on ST_Contains(park.geom,photo.the_geom);"

# The venues returned from the harvester (not cropped to parks)
foursquareHarvesterTable:
	psql -U openspaces -h geo.local -c "drop table foursquare_venues;" \
	&& psql -U openspaces -h geo.local -c "create table foursquare_venues (id serial, venueid varchar(80), name varchar(255), lat numeric(15,12), lng numeric(15,12), address varchar(255), postcode varchar(20), city varchar(80), state varchar(40), country varchar(40), cc varchar(10), categ_id varchar(80), categ_name varchar(80), verified boolean, restricted boolean, referral_id varchar(80), harvested_park_id bigint, harvested_park_name varchar(80));" \
	&& psql -U openspaces -h geo.local -c "select AddGeometryColumn('foursquare_venues','the_geom',4326,'POINT',2);"
# Later, populate the_geom after importing.

foursquareHarvesterTableUpdate:
	psql -U openspaces -h geo.local -c "UPDATE foursquare_venues SET the_geom = ST_SetSRID(ST_MakePoint(lng,lat), 4326);"


# This keeps track of all the harvester queries
foursquareMetadataTable:
	psql -U openspaces -h geo.local -c "drop table foursquare_metadata;" \
	&& psql -U openspaces -h geo.local -c "create table foursquare_metadata (su_id int, latMin float, lngMin float, latMax float, lngMax float, date timestamp, count int);" \
	&& psql -U openspaces -h geo.local -c "select AddGeometryColumn('foursquare_metadata','the_geom',4326,'POLYGON',2);"
# Later, populate the_geom after importing.

foursquareMetadataTableUpdate:
	psql -U openspaces -h geo.local -c "UPDATE foursquare_metadata SET the_geom = ST_MakeEnvelope(lngMin,latMin,lngMax,latMax,4326);"

foursquareActivityTable:
	psql -U openspaces -h geo.local -c "drop table foursquare_venue_activity;" \
	&& psql -U openspaces -h geo.local -c "create table foursquare_venue_activity (venueid varchar(80), timestamp timestamp default NOW(), checkinscount bigint, userscount bigint, tipcount bigint, likescount bigint, mayor_id varchar(20), mayor_firstname varchar(80), mayor_lastname varchar(80));" \

foursquareParkTable:
	psql -U openspaces -h geo.local -c "drop table foursquare_venues_distinct;" \
	&& psql -U openspaces -h geo.local -c "create table foursquare_venues_distinct as select distinct on (venueid) * from foursquare_venues;" \
	&& psql -U openspaces -h geo.local -c "drop table park_foursquare_venues;" \
	&& psql -U openspaces -h geo.local -c "create table park_foursquare_venues as select park.su_id as su_id, park.unit_name as su_name, venue.* from cpad_2013b_superunits_ids as park join foursquare_venues_distinct as venue on ST_Contains(park.geom,venue.the_geom);"

foursquareVenuesActivityView:
	psql -U openspaces -h geo.local -c "create view park_foursquare_venues_activity as select a.*, b.timestamp, b.checkinscount, b.userscount, b.tipcount, b.likescount, b.mayor_id, b.mayor_firstname, b.mayor_lastname from park_foursquare_venues a left join (select distinct on (venueid) * from foursquare_venue_activity order by venueid, timestamp desc) as b on a.venueid = b.venueid;"

parkTotals:
	psql -U openspaces -h geo.local -c "create view park_totals as select parks.su_id, parks.unit_name, parks.agncy_id, parks.agncy_name, parks.gis_acres, foursquare.venuecount, foursquare.checkinscount, foursquare.userscount, flickr.flickrphotos, flickr.flickrusers, instagram.instagramphotos, instagram.instagramusers, twitter.tweets, twitter.twitterusers from cpad_2013b_superunits_ids as parks left join (select su_id, count(venueid) as venuecount, sum(checkinscount) as checkinscount, sum(userscount) as userscount from park_foursquare_venues_activity group by su_id) as foursquare on parks.su_id = foursquare.su_id left join (select su_id, count(photoid) as flickrphotos, count(distinct owner) as flickrusers from park_flickr_photos group by su_id) as flickr on parks.su_id = flickr.su_id left join (select su_id, count(photoid) as instagramphotos, count(distinct userid) as instagramusers from park_instagram_photos group by su_id) as instagram on parks.su_id = instagram.su_id left join (select su_id, count(id_str) as tweets, count(distinct username) as twitterusers from park_tweets group by su_id) as twitter on parks.su_id = twitter.su_id;"
