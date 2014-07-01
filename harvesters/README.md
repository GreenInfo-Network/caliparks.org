To run the twitter streamer, create a script like this:

`start-twitter-streamer.sh`

```
export CONSUMER_KEY="CONSUMERKEYGOESHERE"
export CONSUMER_SECRET="CONSUMERSECRETGOESHERE"
export ACCESS_KEY="ACCESSKEYGOESHERE"
export ACCESS_SECRET="ACCESSSECRETGOESHERE"
python twitter-streamer/streamer/streamer.py -f=id_str,place.full_name,place.coordinates,coordinates.coordinates,user.screen_name,user.name,source,created_at,lang,retweet_count,favorite_count,text --locations="-124.58,32.27,-113.98,42.05" > twitter_stream.csv
```

More info available [here](https://github.com/inactivist/twitter-streamer)

To use logrotate, use this as your `logrotate.conf`:

```
/path/to/repository/harvesters/twitter_stream.csv {
	daily
	rotate 52
	missingok
	postrotate
		kill -HUP `cat /path/to/repository/harvesters/twitter-streamer.pid` || true
		export CONSUMER_KEY="CONSUMERKEYGOESHERE"
		export CONSUMER_SECRET="CONSUMERSECRETGOESHERE"
		export ACCESS_KEY="ACCESSKEYGOESHERE"
		export ACCESS_SECRET="ACCESSSECRETGOESHERE"
		/usr/bin/python /path/to/repository/harvesters/twitter-streamer/streamer/streamer.py -f=id_str,place.full_name,place.coordinates,coordinates.coordinates,user.screen_name,user.name,source,created_at,retweet_count,favorite_count,lang,text --locations="-124.58,32.27,-113.98,42.05" > /path/to/repository/harvesters/twitter_stream.csv &
		echo $! > /path/to/repository/harvesters/twitter-streamer.pid
	endscript
}
```