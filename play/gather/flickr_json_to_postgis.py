import json
import pprint
import sys
import glob

import psycopg2

# modified from tmcw: https://gist.github.com/tmcw/3407807

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
for filename in glob.glob("data/*.json"):
  print filename
  filejson = json.load(open(filename))

  # Loop over photos
  for photo in filejson:
    print photo
    photoid = photo['id']
    owner = photo['owner']
    secret = photo['secret']
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
    park_id = photo['park']['id']
    park_name = photo['park']['name']

    (photoid, owner, secret, farm, title, latitude, longitude, accuracy, context, place_id, woeid, tags, park_id, park_name)

    querystring = "INSERT INTO " + tablename + "(photoid, owner, secret, farm, title, latitude, longitude, accuracy, context, place_id, woeid, tags, park_id, park_name) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    
    cur.execute(querystring, (photoid, owner, secret, farm, title, latitude, longitude, accuracy, context, place_id, woeid, tags, park_id, park_name))

    conn.commit() 

  # End photo loop

# End park loop

cur.close()
conn.close() 
