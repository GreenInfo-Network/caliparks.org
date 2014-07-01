parks.stamen.com
===================

Stories pour out of our parks every day. This project is a first step towards visualizing Twitter, Flickr, Instagram, and Foursquare content using the actual boundaries of our parks, so that we can start to understand how people feel about their favorite open spaces. Taken together these stories make plain that parks are integral to the lives of all Californians. They are evidence for the argument that access to open space must be protected—and expanded—for all and that parks need our support. This is also a tool that park rangers, managers, and advocates can use to understand how people are using parks and to connect with their customers and supporters.

How to parks.stamen.com
-------------------
   * Get postgress installed. `brew install postgres` is one way to go. You could also <a href="http://postgresapp.com/">Postgress App</a>
   * Create a local user in your postgress db
   * Make sure you have the <a href="https://toolbelt.heroku.com/">Heroku toolbelt</a>
   * Pull the database `heroku pg:pull [your heroku db url] openspaces --app <your app name>`
   * Create a .ENV file in the root of repo with one line: `DATABASE_URL=postgres://[your local user]@localhost/[your local db]`
   * In the root of the repo run `npm install`
   * then `foreman start`

CSS and SASS
------------
This project uses <a href="http://sass-lang.com/">SASS</a>. DO NOT edit the .css files in *public/style*. Instead, edit the .scss files in the *sass* directory. Otherwise -- world of hurt.

To deploy
---------
`git push heroku master`

The Harvesters
---------
Interested in the social media harvesters which make this all possible? Sure you are! They are in a different [branch](https://github.com/stamen/parks.stamen.com/tree/node-harvester)
