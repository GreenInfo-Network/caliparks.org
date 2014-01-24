import json
import pprint
import sys
import glob

import psycopg2

# modified from tmcw: https://gist.github.com/tmcw/3407807


# Database must be structured like so:
# create table flickr_photos (photoid bigint, owner varchar(20), secret varchar(20), server int, farm int, title varchar, latitude float, longitude float, accuracy int, context int, place_id varchar(20), woeid bigint, tags varchar, dateupload int, datetaken varchar(30), ownername varchar, description varchar, license int, o_width int, o_height int, url_l varchar(80), height_l int, width_l int, park_id bigint, park_name varchar(80));

dbname = "openspaces"
user = "openspaces"
password = ""
host = "geo.local"

tablename = "flickr_photos"

dsn = "dbname='" + dbname + "' user='" + user + "' password='" + password + "' host='" + host + "'"


conn = psycopg2.connect(dsn)
cur = conn.cursor()


# read files in data directory.

# Loop over files (one per park)
for filename in glob.glob("flickr_data_new/*.json"):
  print filename
  filejson = json.load(open(filename))

  # Loop over photos
  for photo in filejson:
    photoid = photo['id']
    owner = photo['owner']
    secret = photo['secret']
    server = photo['server']
    farm = photo['farm']
    title = photo['title']
    latitude = photo['latitude']
    longitude = photo['longitude']
    accuracy = photo['accuracy']
    context = photo['context']
    if 'place_id' in photo:
      place_id = photo['place_id']
    if 'woeid' in photo:
      woeid = photo['woeid']
    tags = photo['tags']
    dateupload = photo['dateupload']
    datetaken = photo['datetaken']
    ownername = photo['ownername']
    description = photo['description']['_content']
    license = photo['license']
    if 'o_width' in photo:
      o_width = photo['o_width']
    if 'o_height' in photo:
      o_height = photo['o_height']
    if 'url_l' in photo:
      url_l = photo['url_l']
    if 'height_l' in photo:
      height_l = photo['height_l']
    if 'width_l' in photo:
      width_l = photo['width_l']
    park_id = photo['park']['id']
    park_name = photo['park']['name']

    (photoid, owner, secret, server, farm, title, latitude, longitude, accuracy, context, place_id, woeid, tags, park_id, park_name)

    querystring = "INSERT INTO " + tablename + "(photoid, owner, secret, server, farm, title, latitude, longitude, accuracy, context, place_id, woeid, tags, dateupload, datetaken, ownername, description, license, o_width, o_height, url_l, height_l, width_l, park_id, park_name) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    
    cur.execute(querystring, (photoid, owner, secret, server, farm, title, latitude, longitude, accuracy, context, place_id, woeid, tags, dateupload, datetaken, ownername, description, license, o_width, o_height, url_l, height_l, width_l, park_id, park_name))

    conn.commit() 

  # End photo loop

# End park loop

cur.close()
conn.close() 
