# create geojson for all flickr photo points
import json
from os import listdir
from urllib import urlretrieve as get
import csv

base_dir = "data/"
files = [base_dir + filename for filename in listdir(base_dir)]

outfile = open("photos-sample-500.csv", "w")
writer = csv.DictWriter(outfile, ["park", "lng", "lat", "farm", "secret", "server", "ident"])
writer.writeheader()

geojson = {"type": "FeatureCollection", "features": []}
for filename in files:
    with open(filename) as infile:
        photos = json.load(infile)
        for photo in photos:
            # print photo
            # rebuild the photo URL (XXX just do this on the frontend to keep file sizes small)
            # url = "http://farm%s.staticflickr.com/%s/%s_%s_s.jpg" % (farm, server, ident, secret)
            lng, lat = map(float, [photo["longitude"], photo["latitude"]])
            row = {
                "park": filename.replace("data/", "").replace(".json", ""), 
                "lng": lng, 
                "lat": lat, 
                "farm": photo["farm"], 
                "secret": photo["secret"], 
                "server": photo["server"], 
                "ident": photo["id"]
            }
            writer.writerow(row)
            print "wrote row", row
            # geojson["features"].append({
            #     "type": "Feature",
            #     "geometry": {
            #         "type": "Point",
            #         "coordinates": coordinates 
            #     },
            #     "properties": {
            #         "url": url
            #     }
            # })

outfile.close()
# print json.dumps(geojson)