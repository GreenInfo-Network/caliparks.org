PATH := node_modules/.bin:$(PATH)

#######################################
### Twitter stuff #####################
#######################################

twitterHarvesterTable:
# Needs better way of importing the csv file
	cd harvesters && rm twitter_stream_to_import* \
	&& cp twitter_stream.csv.1 twitter_stream_to_import.csv \
	&& psql -U openspaces -h geo.local -c "drop table if exists tweets_harvest;" \
	&& psql -U openspaces -h geo.local -c "create table tweets_harvest (id_str varchar, place varchar, something varchar, coords varchar(40), username varchar(20), fullname varchar(40), client varchar(80), date timestamp, retweet_count int, favorite_count int, lang varchar(3), content varchar);" \
	&& /usr/local/bin/csvclean twitter_stream_to_import.csv \
	&& psql -U openspaces -h geo.local -c "\copy tweets_harvest FROM 'twitter_stream_to_import_out.csv' DELIMITER ',' CSV;" \
	&& psql -U openspaces -h geo.local -c "alter table tweets_harvest add column wkt varchar;" \
	&& psql -U openspaces -h geo.local -c "update tweets_harvest set wkt = regexp_replace(regexp_replace(regexp_replace(coords, ']', ')'), ',', ''), '\[', 'POINT(');" \
	&& psql -U openspaces -h geo.local -c "SELECT AddGeometryColumn('tweets_harvest','the_geom',4326,'POINT',2);" \
	&& psql -U openspaces -h geo.local -c "UPDATE tweets_harvest SET the_geom = GeometryFromText(wkt, 4326);" \
	&& psql -U openspaces -h geo.local -c "create table park_tweets_temp as select park.su_id as su_id, park.unit_name as su_name, tweet.* from cpad_2013b_superunits_ids as park join tweets_harvest as tweet on ST_Contains(park.geom,tweet.the_geom);" \
	&& psql -U openspaces -h geo.local -c "insert into park_tweets select * from park_tweets_temp;" \
&& psql -U openspaces -h geo.local -c "drop table if exists park_tweets_temp;"

#######################################
### Foursquare stuff ##################
#######################################

# The venues returned from the harvester (not cropped to parks)
# Run once to create the table.
foursquareHarvesterTable:
	psql -U openspaces -h geo.local -c "drop table if exists foursquare_venues;" \
	&& psql -U openspaces -h geo.local -c "create table foursquare_venues (id serial, venueid varchar(80), name varchar(255), lat double precision, lng double precision, address varchar(255), postcode varchar(20), city varchar(80), state varchar(40), country varchar(40), cc varchar(10), categ_id varchar(80), categ_name varchar(80), verified boolean, restricted boolean, referral_id varchar(80), harvested_park_id bigint, harvested_park_name varchar(80));" \
	&& psql -U openspaces -h geo.local -c "select AddGeometryColumn('foursquare_venues','the_geom',4326,'POINT',2);"

# This keeps track of all the harvester queries
# Run once to create the table.
foursquareMetadataTable:
	psql -U openspaces -h geo.local -c "drop table if exists foursquare_metadata;" \
	&& psql -U openspaces -h geo.local -c "create table foursquare_metadata (su_id int, latMin float, lngMin float, latMax float, lngMax float, date timestamp, count int);" \
	&& psql -U openspaces -h geo.local -c "select AddGeometryColumn('foursquare_metadata','the_geom',4326,'POLYGON',2);"

# Run once to create the table.
foursquareActivityTable:
	psql -U openspaces -h geo.local -c "drop table if exists foursquare_venue_activity;" \
	&& psql -U openspaces -h geo.local -c "create table foursquare_venue_activity (venueid varchar(80), timestamp timestamp default NOW(), checkinscount bigint, userscount bigint, tipcount bigint, likescount bigint, mayor_id varchar(20), mayor_firstname varchar(80), mayor_lastname varchar(80));" \

# Run this whenever we reharvest foursquare_venues.
foursquareParkTable:
	psql -U openspaces -h geo.local -c "drop table if exists foursquare_venues_distinct;" \
	&& psql -U openspaces -h geo.local -c "create table foursquare_venues_distinct as select distinct on (venueid) * from foursquare_venues;" \
	&& psql -U openspaces -h geo.local -c "drop table if exists park_foursquare_venues;" \
	&& psql -U openspaces -h geo.local -c "create table park_foursquare_venues as select park.su_id as su_id, park.unit_name as su_name, venue.* from cpad_2013b_superunits_ids as park join foursquare_venues_distinct as venue on ST_Contains(park.geom,venue.the_geom);"

# Run once to create the table.
foursquareVenuesActivityView:
	psql -U openspaces -h geo.local -c "drop view park_foursquare_venues_activity;" \
	&& psql -U openspaces -h geo.local -c "create view park_foursquare_venues_activity as select a.*, b.timestamp, b.checkinscount, b.userscount, b.tipcount, b.likescount, b.mayor_id, b.mayor_firstname, b.mayor_lastname from park_foursquare_venues a left join (select distinct on (venueid) * from foursquare_venue_activity order by venueid, timestamp desc) as b on a.venueid = b.venueid;"

#######################################
### Totals ############################
#######################################

parkTotals:
	psql -U openspaces -h geo.local -c "create view park_totals as select parks.su_id, parks.unit_name, parks.agncy_id, parks.agncy_name, parks.gis_acres, foursquare.venuecount, foursquare.checkinscount, foursquare.userscount, flickr.flickrphotos, flickr.flickrusers, instagram.instagramphotos, instagram.instagramusers, twitter.tweets, twitter.twitterusers from cpad_2013b_superunits_ids as parks left join (select su_id, count(venueid) as venuecount, sum(checkinscount) as checkinscount, sum(userscount) as userscount from park_foursquare_venues_activity group by su_id) as foursquare on parks.su_id = foursquare.su_id left join (select su_id, count(photoid) as flickrphotos, count(distinct owner) as flickrusers from park_flickr_photos group by su_id) as flickr on parks.su_id = flickr.su_id left join (select su_id, count(photoid) as instagramphotos, count(distinct userid) as instagramusers from park_instagram_photos group by su_id) as instagram on parks.su_id = instagram.su_id left join (select su_id, count(id_str) as tweets, count(distinct username) as twitterusers from park_tweets group by su_id) as twitter on parks.su_id = twitter.su_id;"

flickr: db/flickr deps/foreman
	foreman run flickr

instagram: db/instagram deps/foreman
	foreman run instagram

deps/foreman:
	@type ogr2ogr 2> /dev/null 1>&2 || sudo gem install foreman || (echo "Please install foreman" && false)

deps/gdal:
	@type ogr2ogr 2> /dev/null 1>&2 || brew install gdal || (echo "Please install gdal" && false)

deps/pv:
	@type pv 2> /dev/null 1>&2 || brew install pv || (echo "Please install pv" && false)

deps/npm:
	@npm install

data/CPAD_Units_nightly.zip:
	mkdir $$(dirname $@)
	curl -sL http://websites.greeninfo.org/common_data/California/Public_Lands/CPAD/dev/CPAD2014a4/CPAD_Units_nightly.zip -o $@

db: deps/npm
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "SELECT 1" > /dev/null 2>&1 || \
		createdb)

db/all: db/cpad_superunits db/flickr

db/postgis: db
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\dx postgis" > /dev/null 2>&1 || \
		psql -c "CREATE EXTENSION postgis")

db/cpad: db data/CPAD_Units_nightly.zip deps/gdal deps/pv deps/npm db/postgis
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\d cpad_units" > /dev/null 2>&1 || \
		ogr2ogr --config PG_USE_COPY YES \
			-t_srs EPSG:3310 \
			-nlt PROMOTE_TO_MULTI \
			-nln cpad_units \
			-lco GEOMETRY_NAME=geom \
			-lco SRID=3310 \
			-f PGDump /vsistdout/ \
			/vsizip/$(word 2,$^)/CPAD_Units_nightly.shp | pv | psql -q)

db/cpad_superunits: db/cpad
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\d $(subst db/,,$@)" > /dev/null 2>&1 || \
		psql -f sql/$(subst db/,,$@).sql)

db/CDB_RectangleGrid: db
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\sf $(subst db/,,$@)" > /dev/null 2>&1 || \
		psql -f sql/$(subst db/,,$@).sql)

db/CDB_HexagonGrid: db
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\sf $(subst db/,,$@)" > /dev/null 2>&1 || \
		psql -f sql/$(subst db/,,$@).sql)

db/GetIntersectingHexagons: db/CDB_HexagonGrid
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\sf $(subst db/,,$@)" > /dev/null 2>&1 || \
		psql -f sql/$(subst db/,,$@).sql)

#######################################
### Harvester initialization grids ####
#######################################

db/latlng_array: db/CDB_RectangleGrid db/cpad_superunits
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\d $(subst db/,,$@)" > /dev/null 2>&1 || \
		psql -f sql/$(subst db/,,$@).sql)

#######################################
### Flickr database tables ############
#######################################

db/flickr: db/flickr_metadata db/flickr_photos db/cpad_superunits db/latlng_array

db/flickr_photos: db
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\d $(subst db/,,$@)" > /dev/null 2>&1 || \
		psql -f sql/$(subst db/,,$@).sql)

# This keeps track of all the harvester queries
# Run once to create the table.
db/flickr_metadata: db
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\d $(subst db/,,$@)" > /dev/null 2>&1 || \
		psql -f sql/$(subst db/,,$@).sql)

#######################################
### Instagram database tables #########
#######################################

db/instagram: db/cpad_superunits db/instagram_regions db/instagram_photos

db/instagram_photos: db
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\d $(subst db/,,$@)" > /dev/null 2>&1 || \
		psql -f sql/$(subst db/,,$@).sql)

db/instagram_regions: db/cpad_superunits db/GetIntersectingHexagons
	@(set -a && source .env && export $$(pgexplode | xargs) && \
		psql -c "\d $(subst db/,,$@)" > /dev/null 2>&1 || \
		psql -f sql/$(subst db/,,$@).sql)
