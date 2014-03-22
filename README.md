OpenSpaces
==========

Mapping social media activity in parks and other open spaces in California.

This is a nodejs application using express3x on Heroku


Deploy instructions
=====================
* Make sure you are up to date with the latest from the nodejs branch
* Get your repo prepaired to deploy using the following command: `heroku git:remote -a stamen-openspaces`
* Once all of the Heroku stuff is installed, you should be able to deploy using this command

`git push heroku master`

You may need to update with `git pull --rebase heroku master` first.

Starting dev instance
=====================
`foreman start`

More about the project
=====================

We are collecting all geocoded tweets, flickr photos, instagram photos, and foursquare venues (and check-in counts) within the boundaries of every open space listed in the [California Protected Areas Database (CPAD)](http://calands.org), specifically the CPAD "superunits". In this document "parks" and "open spaces" are used interchangeably, but we really mean "superunits".


Data collection
===============
Twitter harvesting
------------------


*	cron calls logrotate nightly. This kicks or restarts the streaming python reader `twitter-streamer`.

*	`twitter-streamer` saves tweets to csv files, which are separated into one per day by logrotate

*	Then `make twitterHarvesterTable` (also triggered by cron) then does some database stuff:
	*	Load the latest csv into temporary table `tweets_harvest`
	*	Intersect `tweets_harvest` with the parks table to produce a new table `park_tweets_temp`
	*	Inserts the contents of `park_tweets_temp` into `park_tweets`	

The twitter harvester is currently running in alan's homedir on geo.local.

Note: because the twitter harvester is consuming tweets from the streaming API (unlike the other harvesters) it should not need to worry about importing duplicate tweets.
	
Foursquare harvesting
---------------------

Harvesting the venues the first time (determining the existence of venues in each park) is the hard part. This should be re-run periodically to catch any new venues that appear. [more details needed here]


*	Command-line node app that can either harvest venues or requery (update) them.
*	Doesn't require any `make` commands to process.
		 

Flickr harvesting
-----------------

*	Command-line node app queries Flickr API for bounding box of each park.
*	Node app saves harvested photos to the table `flickr_photos`
*	Then `make flickrParkTable` uniquifies the table, and inserts the results into `park_flickr_photos`



Instagram harvesting
--------------------

*	Command-line node app queries Instagram API for an array of circles covering of each park.
*	Node app saves harvested photos to the table `instagram_photos`
*	Then `make instagramParkTable` uniquifies the table, and inserts the results into `park_instagram_photos`




