OpenSpaces
==========

Mapping social activity in open spaces in California.

This is a nodejs application using express3x on Heroku


Deploy instructions
=====================
1) Make sure you are up to date with the latest from the nodejs branch
2) Get your repo prepaired to deploy using the following command: `heroku git:remote -a stamen-openspaces`
3) Once all of the Heroku stuff is installed, you should be able to deploy using this command

`git push heroku nodejs:master`

You may need to update with `git pull --rebase heroku master` first.
