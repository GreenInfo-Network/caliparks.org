import webpack from 'webpack';

import config from './webpack.config';

const LIVE_RELOAD_PORT = process.env.RELOAD_PORT || 3001;

config.devtool = 'eval';
config.entry = [
  `webpack-dev-server/client?http://localhost:${LIVE_RELOAD_PORT}/`,
  'webpack/hot/only-dev-server'
].concat(config.entry);

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
].concat(config.plugins);

config.module.loaders = [
  {
    test: /\.jsx?$/,
    loaders: ['react-hot', 'babel?optional[]=es7.classProperties'],
    exclude: [/node_modules/]
  }
].concat(config.module.loaders);

module.exports = config;
