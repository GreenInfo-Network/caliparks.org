# Caliparks.org :: App
Staging site here: [https://stamen-caliparks-dev.herokuapp.com/](https://stamen-caliparks-dev.herokuapp.com/)

### Setup
* In the root of the repo run `npm install`
* `mv .env-sample .env`
* Change setting in .env to match your local config
* Install `node-foreman` by running `npm install -g foreman`
* Run `npm run build`.

#### To mirror openspaces database locally
* Install PostgreSQL. `brew install postgres` is one way to go. You could also install [Postgres.app](http://postgresapp.com/)
* Create a local user in your postgres db
* Make sure you have the [Heroku toolbelt](https://toolbelt.heroku.com/)
* Pull the database: `heroku pg:pull [your Heroku db name] openspaces --app <your app name>`
* Update `.env` file

### To run for development
Set `NODE_ENV` to "development" in `.env` file

Then start the app using the command below.  Afterwards navigate your browser to [http://localhost:3001](http://localhost:3001)
```bash
npm run start:dev
```

### To run for production
Set `NODE_ENV` to "production" in `.env` file

Then start the app using the command below.  Afterwards navigate your browser to [http://localhost:5000](http://localhost:5000)
```bash
npm run start:prod
```
or
```bash
npm start
```

## CSS and SASS
This project uses [SASS](http://sass-lang.com/). DO NOT edit the .css files in
`public/`. Instead, edit the `.scss` files in the `styles` directory.
Otherwise -- world of hurt.