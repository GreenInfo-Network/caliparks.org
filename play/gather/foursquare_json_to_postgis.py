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

tablename = "foursquare_venues"

dsn = "dbname='" + dbname + "' user='" + user + "' password='" + password + "' host='" + host + "'"


conn = psycopg2.connect(dsn)
cur = conn.cursor()


# read files in 4sqdata directory.

# Loop over files (one per park)
for filename in glob.glob("4sqdata/*.json"):
  print filename
  filejson = json.load(open(filename))

  # Loop over venues
  for venue in filejson:
    venueid = venue['id']
    name = venue['name']
    if 'lat' in venue['location']:
      lat = venue['location']['lat']
    if 'lng' in venue['location']:
      lng = venue['location']['lng']
    if 'address' in venue['location']:
      address = venue['location']['address']
    if 'postalCode' in venue['location']:
      postalcode = venue['location']['postalCode']
    if 'city' in venue['location']:
      city = venue['location']['city']
    if 'state' in venue['location']:
      state = venue['location']['state']
    if 'country' in venue['location']:
      country = venue['location']['country']
    if 'cc' in venue['location']:
      cc = venue['location']['cc']
    if len(venue['categories']) > 0:
      categ_id = venue['categories'][0]['id'] # Should really test for "primary" = true
      categ_name = venue['categories'][0]['name']
    verified = venue['verified']
    restricted = venue['restricted']
    checkinscount = venue['stats']['checkinsCount']
    userscount = venue['stats']['usersCount']
    tipcount = venue['stats']['tipCount']
    referral_id = venue['referralId']
    park_id = venue['park']['id']
    park_name = venue['park']['name']


    querystring = "INSERT INTO " + tablename + " (venueid, name, lat, lng, address, postcode, city, state, country, cc, categ_id, categ_name, verified, restricted, checkinscount, userscount, tipcount, referral_id, park_id, park_name) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    
    cur.execute(querystring, ( venueid, name, lat, lng, address, postalcode, city, state, country, cc, categ_id, categ_name, verified, restricted, checkinscount, userscount, tipcount, referral_id, park_id, park_name))

    conn.commit() 

  # End venue loop

# End park loop

cur.close()
conn.close() 
