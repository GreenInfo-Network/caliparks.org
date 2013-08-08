import json
import pprint
import sys

# modified from tmcw: https://gist.github.com/tmcw/3407807

points = []
vids = set()
 
alljson = json.load(open("dump.json"))

venues = alljson[1]['response']['venues']

# print venues
# print len(venues)
pp = pprint.PrettyPrinter(indent=4, stream=sys.stderr)
pp.pprint(venues)

for pj in venues:
    #print pj['name']
    #print pj['id']
    try:
        if pj['id'] not in vids:
            vids.add(pj['id'])
            coords = [
                pj['location']['lng'],
                pj['location']['lat']]
            if len(pj['categories']) > 0:
                category = pj['categories'][0]['name']
            else:
                category = None
            points.append({
                'geometry': {
                    'type': 'Point',
                    'coordinates': coords
                },
                'properties': {
                    'name': pj['name'],
                    'category': category,
                    'hereNow': pj['hereNow']['count'],
                    'venueid': pj['id'],
                    'address': pj['location'].get('address', None),
                    'city': pj['location'].get('city', None),
                    'state': pj['location'].get('state', None),
                    'country': pj['location']['country'],
                    'restricted': pj['restricted'],
                    'specialsCount': pj['specials']['count'],
                    'checkinsCount': pj['stats']['checkinsCount'],
                    'tipCount': pj['stats']['tipCount'],
                    'usersCount': pj['stats']['usersCount'],
                    'verified': pj['verified']
                }
            })
    except Exception, e:
        print >> sys.stderr, e, type(e)
        pass

print json.dumps({ 'type': 'FeatureCollection', 'features': points }, open('checkins.geojson', 'w'))
