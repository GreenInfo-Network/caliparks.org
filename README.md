OpenSpaces
===================

Repo for the open spaces project

How to Open Spaces
-------------------
   * Get postgress installed. `brew install postgres` is one way to go. You could also <a href="http://postgresapp.com/">Postgress App</a>
   * Create a `openspaces` user in your postgress db
   * Make sure you have the <a href="https://toolbelt.heroku.com/">Heroku toolbelt</a>
   * Pull the database `heroku pg:pull HEROKU_POSTGRESQL_TEAL_URL openspaces --app stamen-openspaces`
   * Create a .ENV file in the root of repo with one line: `DATABASE_URL=postgres://openspaces@localhost/openspaces`
   * In the root of the repo run `npm install`
   * then `foreman start`

CSS and SASS
------------
This project uses <a href="http://sass-lang.com/">SASS</a>. DO NOT edit the .css files in *public/style*. Instead, edit the .scss files in the *sass* directory

To deploy
---------
`git push heroku master`
