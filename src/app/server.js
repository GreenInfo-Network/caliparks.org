import path from 'path';
import express from 'express';
import engine from 'react-engine';
import favicon from 'serve-favicon';
import config from './config';
import routes from './routes';

const app = express();
const port = config.app.port;
const ENVIRONMENT = process.env.NODE_ENV || 'production';

console.log('CI: ',__dirname)
// -- Setup React Views engine -------------------------------------------------
app.engine('.jsx', engine.server.create({
  routes: require(path.join(__dirname, 'routes.js')),
  routesFilePath: path.join(__dirname, 'routes.js') // optional, enables live reloading of React routes and components
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.set('view', engine.expressView);

// -- Routes & Middlewares -----------------------------------------------------

const publicPath = path.join(__dirname, '..', '..', 'build', 'public');
app.use(express.static(publicPath));

const faviconPath = path.join(__dirname, '..', '..', 'build', 'public', 'favicon.ico');
app.use(favicon(faviconPath));

const viewData = {};
app.get('*', (req, res) => {
  res.render(req.url, {
    viewdata: viewData,
    title: config.app.name
  });
});

// -- Start the application server ---------------------------------------------

app.listen(port, () => {
  console.log(`WebServer listening on port ${port}`);
});


// TODO: Clean this up
import webpack from 'webpack';
import wpconfig from '../../webpack.config.js';
import WebpackDevServer from 'webpack-dev-server';
const LIVE_RELOAD_PORT = process.env.RELOAD_PORT || 3001;

if (ENVIRONMENT === 'development') {
  new WebpackDevServer(webpack(wpconfig), {
    hot: true,
    historyApiFallback: true,
    proxy: {
      "*": "http://localhost:" + port
    }
  }).listen(LIVE_RELOAD_PORT, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Hot reloading at: http://localhost:' + LIVE_RELOAD_PORT);
  });
}