import path from 'path';
import {sync as globSync} from 'glob';
import {readFileSync} from 'fs';
import express from 'express';
import renderer from 'react-engine';
import favicon from 'serve-favicon';
import locale from "locale";
import cookieParser from 'cookie-parser';
import dataStore from '../services/store';
import config from '../config';


const translations = globSync(path.join(__dirname, '../locales/*.json'))
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
const ENVIRONMENT = process.env.NODE_ENV || 'production';

// create the view engine with `react-engine`
const engine = renderer.server.create({
  routes: require(path.join(__dirname, '../public/routes.jsx')),
  routesFilePath: path.join(__dirname, '../public/routes.jsx'), // optional, enables live reloading of React routes and components
  page404: require(path.join(__dirname, '../public/views/404.jsx'))
});

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', path.join(__dirname, '../public/views'));

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', renderer.expressView);

app.use(cookieParser());

// favicon
app.use(favicon(path.join(__dirname, '../public/assets/favicon.ico')));

//expose public folder as static assets
app.use(express.static(path.join(__dirname, '../public')));

locale.Locale.default = config.locales[0];
app.use(locale(config.locales));
app.use((req, res, next) => {
  console.log('Detected locale (from browser) is %s', req.locale);

  // Locale can be changed by passing ?hl=<locale> in the querystring
  if (req.query.hl) {
    // But only the supported ones!
    if (config.locales.indexOf(req.query.hl) > -1) {
      req.locale = req.query.hl;
      console.log('Locale has been set from querystring: %s', req.locale);
    }
  }

  // TODO: make cookies work
  // Or by setting a `hl` cookie
  else if (req.cookies && req.cookies.hl) {
    if (config.locales.indexOf(req.cookies.hl) > -1) {
      req.locale = req.cookies.hl;
      console.log('Locale has been set from cookie: %s', req.locale);
    }
  }

  next();
});

let loadHeaderImages = true;
let headerImages = [];

function getInitialPayload(callback) {
  if (!loadHeaderImages) return callback(headerImages);
  dataStore.file.glob('assets/images/header/*.jpg', {cwd: path.join(__dirname,'../public/')})
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
app.get('/', (req, res, next) => {
  if (req.originalUrl !== '/favicon.ico') {
    getInitialPayload((images) => {
      let parks = [];
      dataStore.db.photos({}).then((data) => {
        parks = data;
      }).catch((err) => {
        console.log('Err: ', err);
      }).then(() => {
        res.render(req.originalUrl, {
          title: config.app.name,
          messages: translations[req.locale],
          lang: req.locale,
          viewdata: {
            header: images,
            parks: parks
          }
        });
      });
    });
  } else {
     next();
  }
});

app.get('/parks', (req, res, next) => {
  res.redirect('/');
});

app.get('/parks/:id(\\d{3,6})', (req, res, next) => {
  getInitialPayload((images) => {
    res.render(req.url, {
      title: config.app.name,
      viewdata: {
        header: images
      }
    });
  });
});

app.get('/explore', (req, res, next) => {
  getInitialPayload((images) => {
    res.render(req.url, {
      title: config.app.name,
      viewdata: {
        header: images
      }
    });
  });
});

app.get('/discover', (req, res, next) => {
  getInitialPayload((images) => {
    res.render(req.url, {
      title: config.app.name,
      viewdata: {
        header: images
      }
    });
  });
});

app.get('/wander', (req, res, next) => {
  getInitialPayload((images) => {
    res.render(req.url, {
      title: config.app.name,
      viewdata: {
        header: images
      }
    });
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

// 404 template
app.use((req, res, next) => {
  res.render('404', {
    title: config.app.name,
    url: req.url
  });
});

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Start hot reload server
if (ENVIRONMENT === 'development') {
 require('./lib/hotserver.js')(PORT, process.env.RELOAD_PORT || 3001);
}


