'use strict';

import path from 'path';
import express from 'express';
import engine from 'react-engine';
import favicon from 'serve-favicon';
import config from '../config';
import routes from '../routes'; // Shared routes

const app = express();
const port = process.env.PORT || config.app.port || 5000;
const ENVIRONMENT = process.env.NODE_ENV || 'production';
const LIVE_RELOAD_PORT = process.env.RELOAD_PORT || 3001;

// Setup React Views engine
app.engine('.jsx', engine.server.create({
  routes: routes,
  routesFilePath: path.normalize(path.join(__dirname, '../routes.js')) // optional, enables live reloading of React routes and components
}));
app.set('views', path.normalize(path.join(__dirname, '../views')));
app.set('view engine', 'jsx');
app.set('view', require('react-engine/lib/expressView'));

// Routes & Middlewares

const publicPath = path.normalize(path.join(__dirname, '../../../build/public'));
app.use(express.static(publicPath));


app.use(express.static(path.normalize(path.join(__dirname, '../../../static'))));

const faviconPath = path.normalize(path.join(__dirname, '../../../build/public/favicon.ico'));
app.use(favicon(faviconPath));

// These routes must match '../routes'
require('./routes')(app);


/*
app.get('*', (req, res) => {
  res.render(req.url, {
    viewdata: viewData,
    title: config.app.name
  });
});
*/

// Start the application server
app.listen(port, () => {
  console.log(`WebServer listening on port ${port}`);
});


// Start hot reload server
if (ENVIRONMENT === 'development') {
 require('./lib/devserver.js')(port, LIVE_RELOAD_PORT);
}