export CONSUMER_KEY="KhlyHmwUyTg3up0ewoAw"
export CONSUMER_SECRET="mLa9C2ykxvOQHNZq8NyD71fZLmDunsBsKPqw9BNsxk"
export ACCESS_KEY="194094820-ncNvwQQWnsB30cWbGLUO9eIOaLJpy3IkyxIiNfGe"
export ACCESS_SECRET="QOOWWyqgWCDNAYQ3i6UVZrBBAtO5yfa86c9AauieTg"
python twitter-streamer/streamer/streamer.py -f=place.full_name,place.coordinates,coordinates.coordinates,user.screen_name,user.name,source,created_at,lang,text --locations="-124.58,32.27,-113.98,42.05" > twitter_stream.csv
