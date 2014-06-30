Social media harvesters
=========
Mapping social media activity in parks and other open spaces in California.


This repository contains the Heroku-based node.js social media harvesters.

Most of this code has been copied over from the [local-harvester branch](https://github.com/stamen/parks.stamen.com/tree/local-harvester) of the repository.

These harvesters collect geotagged content from Flickr, Foursquare, and Instagram. (currently Twitter is handled using a separate codebase).


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


About the algorithms
--------------------

Add more here (including screenshots).

For a summary of what the different harvesters do, and how they do it, read this blog post: [Mapping the Intersection Between Social Media and Open Spaces in California](http://content.stamen.com/mapping_the_intersection_between_social_media_and_open_spaces_in_ca)

