OpenSpaces
==========

Mapping social media activity in parks and other open spaces in California.

This is a nodejs application using express3x on Heroku


Deploy instructions
=====================
* Make sure you are up to date with the latest from the nodejs branch
* Get your repo prepaired to deploy using the following command: `heroku git:remote -a stamen-openspaces`
* Once all of the Heroku stuff is installed, you should be able to deploy using this command

`git push heroku nodejs:master`

You may need to update with `git pull --rebase heroku master` first.


More about the project
=====================

We are collecting all geocoded tweets, flickr photos, instagram photos, and foursquare venues (and check-in counts) within the boundaries of every open space listed in the [California Protected Areas Database (CPAD)](http://calands.org), specifically the CPAD "superunits". In this document "parks" and "open spaces" are used interchangeably, but we really mean "superunits".


Data collection
---------------

*	Twitter

	cron, logrotate, Python script.
	Currently running in alan's homedir on geo.local

*	Flickr

	Command-line node app queries Flickr API for bounding box of each park.
	Running locally on Alan's machine

*	Foursquare

	Command-line node app

	Running locally on Alan's machine. Latest version not quite finished.

*	Instagram

	Command-line node app
	Not finished.


Internal API
------------

*	There isn't one.

	Currently, we dump out flat JSON files containing social media counts for each park.



User interface
--------------

http://parks.stamen.com

*	Map/GLOP

	Shows all parks


*	Page Per Park

	Prominently features each park's hashtag, and counts of social media activity in the park. Includes links to browse up and down the rankings of parks according to each social media type.



