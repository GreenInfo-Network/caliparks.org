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

tablename = "foursquare_nextvenues"

dsn = "dbname='" + dbname + "' user='" + user + "' password='" + password + "' host='" + host + "'"


conn = psycopg2.connect(dsn)
cur = conn.cursor()


# read files in 4sqdata directory.

# Loop over files (one per park)
for filename in glob.glob("4sqnextvenues/*.json"):
  print filename
  try:
    filejson = json.load(open(filename))
  except ValueError as e:
    print "ValueError";
    next;

  print filename, "has", len(filejson), "venues"

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
    referral_id = venue['prev']['referralId']
    prev_id = venue['prev']['id']


    querystring = "INSERT INTO " + tablename + " (venueid, name, lat, lng, address, postcode, city, state, country, cc, categ_id, categ_name, verified, restricted, checkinscount, userscount, tipcount, referral_id, prev_venue_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    
    cur.execute(querystring, ( venueid, name, lat, lng, address, postalcode, city, state, country, cc, categ_id, categ_name, verified, restricted, checkinscount, userscount, tipcount, referral_id, prev_id))

    conn.commit() 

  # End venue loop

# End park loop

cur.close()
conn.close() 
