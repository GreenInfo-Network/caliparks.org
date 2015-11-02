import webpack from 'webpack';

import config from './webpack.config';

config.devtool = 'source-map';

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]);

config.module.loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel?optional[]=es7.classProperties'
  }
].concat(config.module.loaders);

module.exports = config;
