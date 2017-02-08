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

Tip: Don't forget to `npm run webpack:server` after making changes, so the webpackserver-rendered bits will be rebuilt.

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

Sorry, but there is no way to do this. Even the old "empty commit" trick does not work, as Heroku recognizes that "everything is "Everything up-to-date" and will not force a recompile of the bundle.

Your only option is to make a real change, e.g. some comment, and then push only to the *development* or *production* target. Sad, but true.


## Configuration Variables

* *app/server/config.js* variable *name* - -The title of this application.

* *app/server/config.js* variable *trackingID* -- The Google Analytics tracking code.


## Map Configuration + Tile Setup

See *app/public/components/parkMap.jsx*

The map tiles are defined around line 228;  look for a *CustomTileLayer* declaration.


## CSS and SASS

This project uses [SASS](http://sass-lang.com/). DO NOT edit the .css files in *public/*. Instead, edit the *.scss* files in the *styles* directory.
