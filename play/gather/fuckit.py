# fuck node, doing this in python
# create html gallery of flickr photos
from os import listdir
import json

basedir = "data/"
url = "http://farm%s.staticflickr.com/%s/%s_%s_s.jpg"
files = [f for f in listdir(basedir) if ".json" in f]
for filename in files:
    html = "<html><head><style>img { width: 75px; height: 75px;  }</style></head><body>"
    with open(basedir + filename) as infile:
        photos = json.load(infile)
        imgs = map(lambda p: url % (p["farm"], p["server"], p["id"], p["secret"]), photos)
        html += "\n".join(["<img src='%s'>" % img for img in imgs]) + "</body></html>"
        with open("gallery/" + filename.replace(".json", ".html"), "w") as outfile:
            outfile.write(html)
        print "done", filename
        
