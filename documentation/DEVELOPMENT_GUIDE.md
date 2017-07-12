# General Code Orientation and How-To Quick Reference

## Our Heroku Apps

Our Heroku apps are as follows:

http://caliparks-development.herokuapp.com/

http://caliparks-production.herokuapp.com/

These correspond to the *development* and *production* push targets defined in *package.json*


## Run Development Webserver

CD into the *app/* folder.

Set *NODE_ENV* to "development" or "production" in .env file

Run either the *dev* or *prod* command:
```
npm run start:dev

npm run start:prod
```

The web server will be listening on port 5000, e.g. http://localhost:5000

Tip: Don't forget to `npm run webpack:server` after making changes to `server.js`, so the that ES6 code can be understood by Node.JS.

Tip: If you run into `Invariant` issues you will need to reboot the dev server.


## Push to Staging / Production

CD into the *app/* folder.

Run either version of the command:

```
npm run deploy:production

npm run deploy:development
```

These actually run *git push* commands to the target Heroku app. The actual command aliases are defined in *package.json*


## Causing Heroku to Recompile the Bundle if You Haven't Changed Anything

Sorry, but there is no way to do this. Even the old "empty commit" trick does not work, as Heroku recognizes that "Everything up-to-date" and will not force a recompile of the bundle.

Your only option is to make a real change, e.g. some comment, and then push only to the *development* or *production* target. Sad, but true.


## Configuration Variables

* *app/server/config.js* variable *name* - -The title of this application.

* *app/server/config.js* variable *trackingID* -- The Google Analytics tracking code.

## React
This is a React.JS app that **currently uses** ES6 with Babel@6.x, React@0.14.x, ReactRouter@1.x, Redux@3.x, React Intl@2.0.0-pr-3, ReactEngine@3.x, Express@4.x., and Webpack@1.x.

Two React Components, React-Slick and React Fullpage, have been forked from their original repositories / authors for custom modifications. This was originally done by Stamen, but the forked versions are now in the GreenInfo-Network Github org.

Note that ES6 code transpiled to ES2015 via Babel and Webpack. Furthermore, the server side code is also transpiled using Babel. See `webpack.config.<name>.babel.js` configuration files in the `app/` directory and their relevant scripts in `app/package.json`.

### Server Side Rendering
This app uses server side rendering with Express and [React Engine](https://github.com/paypal/react-engine) to match routes between Express and React Router. This appears to allow for using a single Express server for both client side routing with React as well as API endpoints. Note that this set up does not result in a univerisal / isomorphic / single page application as each route (other than to the various sections on the home page) requires a full page refresh.

To learn more about how React Engine works, see [the example app in their GitHub repo](https://github.com/paypal/react-engine/tree/master/examples/movie%20catalog).

## CSS and SASS
This project uses [SASS](http://sass-lang.com/). DO NOT edit the .css files in *public/*. Instead, edit the *.scss* files in the *styles* directory.

## Map Configuration + Tile Setup
See *app/public/components/parkMap.jsx*

The map tiles are defined around line 228;  look for a *CustomTileLayer* declaration.
