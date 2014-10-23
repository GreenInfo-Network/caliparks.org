# [parks.stamen.com](http://parks.stamen.com)

Stories pour out of our parks every day. This project is a first step towards
visualizing [Twitter](http://twitter.com), [Flickr](http://flickr.com),
[Instagram](http://instagram.com), and [Foursquare](http://foursquare.com)
content using the actual boundaries of our parks, so that we can start to
understand how people feel about their favorite open spaces. Taken together
these stories make plain that parks are integral to the lives of all
Californians. They are evidence for the argument that access to open space must
be protected—and expanded—for all and that parks need our support. This is also
a tool that park rangers, managers, and advocates can use to understand how
people are using parks and to connect with their customers and supporters.

## How to parks.stamen.com

* Install PostgreSQL. `brew install postgres` is one way to go. You could also install [Postgres.app](http://postgresapp.com/)
* Create a local user in your postgres db
* Make sure you have the [Heroku toolbelt](https://toolbelt.heroku.com/)
* Pull the database: `heroku pg:pull [your Heroku db name] openspaces --app <your app name>`
* In the root of the repo run `npm install`
* `cp envSample .env`
* Change .env to match your local config
* `npm start`

## CSS and SASS

This project uses [SASS](http://sass-lang.com/). DO NOT edit the .css files in
`public/style`. Instead, edit the `.scss` files in the `sass` directory.
Otherwise -- world of hurt.

## To deploy

```bash
git push heroku parksforward:master
```

## The Harvesters

Interested in the social media harvesters which make this all possible? Sure
you are! They are in a different
[branch](https://github.com/stamen/parks.stamen.com/tree/node-harvester)
