import json

# modified from tmcw: https://gist.github.com/tmcw/3407807

points = []
vids = set()
 
alljson = json.load(open("dump.json"))

venues = alljson[1]['response']['venues']

# print venues
# print len(venues)


for pj in venues:
    print pj['name']
    print pj['id']
    try:
        if pj['id'] not in vids:
            vids.add(pj['id'])
            coords = [
                pj['location']['lng'],
                pj['location']['lat']]
            points.append({
                'geometry': {
                    'type': 'Point',
                    'coordinates': coords
                },
                'properties': {
                    'name': pj['name'],
                    'id': pj['id']
                }
            })
    except Exception, e:
        print e
        pass

print points
 
json.dump({ 'type': 'FeatureCollection', 'features': points }, open('checkins.geojson', 'w'))
