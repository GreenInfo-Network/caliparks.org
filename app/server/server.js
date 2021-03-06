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
import webpackConfig from '../webpack.config.dev.babel.js';
import Routes from '../public/routes';

import getInvolvedLinks from '../public/assets/data/stories.json';

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

const PORT = process.env.PORT || config.app.port || 3000;
const GOOGLE_APP_KEY = process.env.GOOGLE_APP_KEY || null;

const app = express();

// compress responses
app.use(compression());

if (process.env.NODE_ENV !== 'production') {
  // logging
  app.use(morgan('dev'));

  // integrated webpack build
  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    noInfo: false,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
}

// create the view engine with `react-engine`
app.engine('.jsx', ReactEngine.server.create({
  routes: Routes
}));

// set the view directory
app.set('views', path.join(__dirname, '../public/views'));

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', ReactEngine.expressView);

app.use(cookieParser());

// favicon
// TODO: switch to https://www.npmjs.com/package/serve-favicons
app.use(favicon(path.join(__dirname, '../public/assets/favicon.ico')));

// expose public folder as static assets
app.use(express.static(path.join(__dirname, '../public'), { maxAge: 3600e3 }));

// default caching rules for dynamic content
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');

  return next();
});

const availableLocales = Object.keys(config.locales.available);
const localeCookieName = config.locales.cookie;

locale.Locale.default = availableLocales[0];
app.use(locale(availableLocales));
app.use((req, res, next) => {
  console.log('Detected locale (from browser) is %s', req.locale);

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

  req.locale = req.locale || 'en';

  res.locals.messages = translations[req.locale] || translations['en'];
  next();
});

app.use((req, res, next) => {
  res.header('Vary', 'Accept-Language');
  res.header('Content-Language', req.locale);

  return next();
});

let loadHeaderImages = true;
let headerImages = [];

function getInitialPayload(callback) {
  if (!loadHeaderImages) return callback(headerImages);

  dataStore
    .file.glob('assets/images/header/*.jpg', {
      cwd: path.join(__dirname, '../public/'
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
      gaID: config.app.trackingID,
      baseUrl: req.protocol + '://' + req.get('host'),
      mostSharedParks: {
        parks: [],
        interval: 'week-now',
        isFetching: false
      },
      selectedPark: {
        images: [],
        totalImages: 0,
        park: [],
        isFetching: false
      },
      selectedActivity: {
        parks: [],
        isFetching:false
      },
      viewData: {
        header: images
      }
    };

    return next();
  });
});

// load (additional) data required for /
app.get('/', (req, res, next) => {
  return dataStore.db('latestPhotoFromMostSharedPark', {}).then((parks) => {
    res.locals.featuredParks = {
      parks
    };
    return next();
  })
  .catch((err) => {
    return next(err);
  });
});

app.get('/park/:id', (req, res, next) => {
  return dataStore.db('getSelectedParkPhotos', {id: req.params.id}).then((images) => {
    res.locals.selectedPark.images = (images.length) ? images[0].items : [];
    res.locals.selectedPark.totalImages = (images.length) ? images[0].total : 0;

    return dataStore.db('getSelectedPark', {id: req.params.id});
  })
  .then((park) => {
    res.locals.selectedPark.park = park;
    res.locals.selectedPark.involved = getInvolvedLinks[req.params.id] || null;

    return next();
  })
  .catch((err) => {
    return next(err);
  });
});

app.get('/activity/:activity', (req, res, next) => {
  return dataStore.db('getParksForActivity', {activity: req.params.activity}).then((parks) => {
    res.locals.selectedActivity.parks = parks;

    return next();
  }).catch((err) => {
    return next(err);
  });
});

app.get('/wander', (req, res, next) => {
  return dataStore.db('randomPark').then((park) => {
    const parkid = park[0].su_id;
    res.set('Cache-Control', 'private, max-age=0, no-cache');
    return res.redirect('/park/' + parkid);
  }).catch((err) => {
    return next(err);
  });
});

app.get('/api/featured_parks.json', (req, res, next) => {
  return dataStore.db('latestPhotoFromMostSharedPark', {}).then((data) => {
    return res.json(data);
  }).catch((err) => {
    return next(err);
  });
});

app.get('/api/search', (req, res, next) => {
  return dataStore.db('listParks').then((data) => {
    return res.json(data);
  }).catch((err) => {
    return next(err);
  });
});

app.get('/api/search/activity/:activity', (req, res, next) => {
  return dataStore.db('listParksWithActivity', {activity: req.params.activity}).then((data) => {
    return res.json(data);
  }).catch((err) => {
    return next(err);
  });
});

app.get('/api/most_shared_parks.json', (req, res, next) => {
  const obj = {
    top: [],
    others: []
  };

  return dataStore.db('mostSharedParks', {interval: req.query.interval || null, bbox: req.query.bbox}).then((data) => {
    obj.top = data;

    if (req.query.all) {
      const ids = data.map((item) => {
        return item.su_id;
      });

      if (!ids.length) return [];

      return dataStore.db('parksNotIn', {interval: req.query.interval || null, bbox: req.query.bbox, notIn: ids});
    }

    return [];
  })
  .then((others) => {
    obj.others = others;
    return res.json(obj);
  })
  .catch((err) => {
    return next(err);
  });
});

app.get('/api/selected_park.json', (req, res, next) => {
  if (!req.query.id) return next();

  const obj = {
    park: [],
    images: [],
    totalImages: -1,
    involved: getInvolvedLinks[req.query.id] || null
  };

  return dataStore.db('getSelectedParkPhotos', {id: req.query.id}).then((images) => {
    obj.images = (images.length) ? images[0].items : [];
    obj.totalImages = (images.length) ? images[0].total : 0;

    return dataStore.db('getSelectedPark', {id: req.query.id});
  })
  .then((park) => {
    obj.park = park;
    return res.json(obj);
  })
  .catch((err) => {
    return next(err);
  });
});

app.get('/api/selected_activity.json', (req, res, next) => {
  return dataStore.db('getParksForActivity', {activity: req.query.activity, bbox: req.query.bbox}).then((data) => {
    return res.json(data);
  }).catch((err) => {
    return next(err);
  });
});

app.get('/api/park/:id/photos', (req, res, next) => {
  const options = {
    id: req.params.id,
    offset: req.query.offset || 0
  };

  return dataStore.db('getSelectedParkPhotos', options)
  .then((images) => {
    const obj = {};
    obj.images = (images.length) ? images[0].items : [];
    obj.totalImages = (images.length) ? images[0].total : 0;
    return res.json(obj);
  })
  .catch((err) => {
    return next(err);
  });
});

app.get('/api/park/:id/bounds', (req, res, next) => {
  const options = {
    id: req.params.id
  };

  return dataStore.db('getBoundsForPark', options)
  .then((bounds) => {
    return res.json(bounds);
  })
  .catch((err) => {
    return next(err);
  });
});

app.get('/api/wander', (req, res, next) => {
  return dataStore.db('randomPark').then((park) => {
    const parkid = (park && park.length) ? park[0].su_id : null;
    res.set('Cache-Control', 'private, max-age=0, no-cache');
    return res.json({id: parkid});
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
  res.render(req.url, {
    url: req.url
  });
});

// Error handler
// TODO: Should we handle errors
// more specifically
app.use((err, req, res, next) => {
  console.log(['error encountered', err, req, res, next]);
  res.redirect('/404');
});


app.listen(PORT, function() {
  console.log('Listening at http://%s:%d/', this.address().address, this.address().port);
});
