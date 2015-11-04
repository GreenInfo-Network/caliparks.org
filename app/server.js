import {readFileSync} from 'fs';
import path from 'path';

import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import {sync as globSync} from 'glob';
import locale from 'locale';
import morgan from 'morgan';
import ReactEngine from 'react-engine';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import dataStore from './services/store';
import config from './config';
import webpackConfig from './webpack.config.dev.babel.js';


const translations = globSync(path.join(__dirname, './locales/*.json'))
  .map((filename) => [
    path.basename(filename, '.json'),
    readFileSync(filename, 'utf8'),
  ])
  .map(([locale, file]) => [locale, JSON.parse(file)])
  .reduce((collection, [locale, messages]) => {
    collection[locale] = messages;
    return collection;
  }, {});

const app = express();
const PORT = process.env.PORT || config.app.port || 3000;
const GOOGLE_APP_KEY = process.env.GOOGLE_APP_KEY || null;

// create the view engine with `react-engine`
const engine = ReactEngine.server.create({
  routes: require(path.join(__dirname, './public/routes.jsx')),
  routesFilePath: path.join(__dirname, './public/routes.jsx'), // optional, enables live reloading of React routes and components
});

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', path.join(__dirname, './public/views'));

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', ReactEngine.expressView);

// compress responses
app.use(compression());

if (process.NODE_ENV !== 'production') {
  // logging
  app.use(morgan('dev', {
    skip: (req, res) => req.url.indexOf('/socket.io') >= 0
  }));

  // integrated webpack build
  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(cookieParser());

// favicon
app.use(favicon(path.join(__dirname, './public/assets/favicon.ico')));

// expose public folder as static assets
app.use(express.static(path.join(__dirname, './public')));

const availableLocales = Object.keys(config.locales.available);
const localeCookieName = config.locales.cookie;

locale.Locale.default = availableLocales[0];
app.use(locale(availableLocales));
app.use((req, res, next) => {
  // console.log('Detected locale (from browser) is %s', req.locale);

  // Locale can be changed by passing ?hl=<locale> in the querystring
  if (req.query.hl) {
    // But only the supported ones!
    if (availableLocales.indexOf(req.query.hl) > -1) {
      req.locale = req.query.hl;
      console.log('Locale has been set from querystring: %s', req.locale);
    }
  } else if (req.cookies && req.cookies[localeCookieName]) {
    // Or by setting cookie
    if (availableLocales.indexOf(req.cookies[localeCookieName]) > -1) {
      req.locale = req.cookies[localeCookieName];
      console.log('Locale has been set from cookie: %s', req.locale);
    }
  }

  res.locals.messages = translations[req.locale] || translations['en'];
  next();
});

let loadHeaderImages = true;
let headerImages = [];

function getInitialPayload(callback) {
  if (!loadHeaderImages) return callback(headerImages);

  dataStore
    .file.glob('assets/images/header/*.jpg', {
      cwd: path.join(__dirname, './public/'
    )})
    .then((data) => {
      headerImages = data;
    })
    .catch((err) => {
      console.log('Err: ', err);
    })
    .then(() => {
      loadHeaderImages = false;
      callback(headerImages);
    });
}

// routes
// These basically are only called on initial load
// TODO: Move to separate file
//
app.use('/', (req, res, next) => {
  return getInitialPayload((images) => {
    res.locals = {
      title: config.app.name,
      messages: res.locals.messages,
      lang: req.locale,
      gak: GOOGLE_APP_KEY,
      viewData: {
        header: images
      }
    };

    return next();
  });
});

// load (additional) data required for /
app.get('/', (req, res, next) => {
  return dataStore.db.photos({}).then((data) => {
    res.locals.viewData.parks = data;
    return next();
  }).catch((err) => {
    return next(err);
  });
});

// Handles XHR based requests
app.get('/api/xhr/:id', (req, res, next) => {
  if (dataStore.xhr[req.params.id]) {
    dataStore.xhr[req.params.id]().then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(200).json([]);
    });
    res.status(200).json([]);
  }
});

// Handles Database requests
app.get('/api/db/:id', (req, res, next) => {
  if (dataStore.db[req.params.id]) {
    dataStore.db[req.params.id]().then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(200).json([]);
    });
  } else {
    res.status(200).json([]);
  }
});

// defer to react-router
app.use((req, res, next) => {
  return res.render(req.url, {
    url: req.url
  });
});

app.listen(PORT, function() {
  console.log('Listening at http://%s:%d/', this.address().address, this.address().port);
});
