# [parks.stamen.com](http://parks.stamen.com)

Stories pour out of our parks every day. This project is visualizing [Instagram](http://instagram.com) content using the actual boundaries of our parks, so that we can start to understand how people feel about their favorite open spaces. Taken together these stories make plain that parks are integral to the lives of all Californians. They are evidence for the argument that access to open space must be protected—and expanded—for all and that parks need our support. This is also a tool that park rangers, managers, and advocates can use to understand how people are using parks and to connect with their customers and supporters.

## How to parks.stamen.com
* Install PostgreSQL. `brew install postgres` is one way to go. You could also install [Postgres.app](http://postgresapp.com/)
* Create a local user in your postgres db
* Make sure you have the [Heroku toolbelt](https://toolbelt.heroku.com/)
* Pull the database: `heroku pg:pull [your Heroku db name] openspaces --app <your app name>`
* In the root of the repo run `npm install`
* `cp .env-sample .env`
* Change setting in .env to match your local config
* Run `npm run build`.

### To run for development
Set `NODE_ENV` to "development" in `.env` file

Then start the app using the command below.  Afterwards navigate your browser to [http://localhost:3001](http://localhost:3001)
```bash
npm run dev
```

### To run for production
Set `NODE_ENV` to "production" in `.env` file

Then start the app using the command below.  Afterwards navigate your browser to [http://localhost:5000](http://localhost:5000)
```bash
npm start
```

## CSS and SASS
This project uses [SASS](http://sass-lang.com/). DO NOT edit the .css files in
`public/`. Instead, edit the `.scss` files in the `src/styles` directory.
Otherwise -- world of hurt.


## To deploy
```bash
npm run deploy
git push heroku parksforward:master
```

## The Harvesters
Interested in the social media harvesters which make this all possible? Sure
you are! They are in a different
[branch](https://github.com/stamen/parks.stamen.com/tree/node-harvester)