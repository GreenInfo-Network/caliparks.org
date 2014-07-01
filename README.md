parks.stamen.com social media harvesters
=========
Mapping social media activity in parks and other open spaces in California.

This repository contains the Heroku-based node.js social media harvesters.

Most of this code has been copied over from the [local-harvester branch](https://github.com/stamen/parks.stamen.com/tree/local-harvester) of the repository.

These harvesters collect geotagged content from Flickr, Foursquare, and Instagram. (currently Twitter is handled using a separate codebase).

More about the project
=====================

We are collecting all geocoded tweets, flickr photos, instagram photos, and foursquare venues (and check-in counts) within the boundaries of every open space listed in the [California Protected Areas Database (CPAD)](http://calands.org), specifically the CPAD "superunits". In this document "parks" and "open spaces" are used interchangeably, but we really mean "superunits".

Data collection
===============
Testing locally
---------------

Run using Foreman. 

Set up a .env file that looks like something this:

	DATABASE_URL=postgres://username@hostname/dbname
	FLICKR_CLIENT_ID=YOURCLIENTIDHERE
	FLICKR_CLIENT_SECRET=YOURCLIENTSECRETHERE
	FOURSQUARE_CLIENT_ID=YOURCLIENTIDHERE
	FOURSQUARE_CLIENT_SECRET=YOURCLIENTSECRETHERE
	INSTAGRAM_CLIENT_ID=YOURCLIENTIDHERE
	INSTAGRAM_CLIENT_SECRET=YOURCLIENTSECRETHERE

Then run one of the harvester commands.

For example: `foreman run flickr`

Foursquare harvesting
---------------------

Harvesting the venues the first time (determining the existence of venues in each park) is the hard part. This should be re-run periodically to catch any new venues that appear. [more details needed here]

To collect venues the first time: 

Locally: `foreman run foursquare_venues`

To update the checkin counts for already-harvested venues:

Locally: `foreman run foursquare_update`

Flickr harvesting
-----------------

*	Command-line node app queries Flickr API for bounding box of each park. To run locally: `foreman run flickr`
*	Node app saves harvested photos to the table `flickr_photos`
*	Then `make flickrParkTable` uniquifies the table, and inserts the results into `park_flickr_photos`

Instagram harvesting
--------------------

*	Command-line node app queries Instagram API for an array of circles covering of each park. To run locally: `foreman run instagram`
*	Node app saves harvested photos to the table `instagram_photos`
*	Then `make instagramParkTable` uniquifies the table, and inserts the results into `park_instagram_photos`

About the algorithms
--------------------

Add more here (including screenshots).

For a summary of what the different harvesters do, and how they do it, read this blog post: [Mapping the Intersection Between Social Media and Open Spaces in California](http://content.stamen.com/mapping_the_intersection_between_social_media_and_open_spaces_in_ca)

