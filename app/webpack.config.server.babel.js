var path = require('path');
var Clean = require('clean-webpack-plugin');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

// node_modules/.bin/babel ./server --out-dir ./dist-modules/server
// node_modules/.bin/babel ./public/routes.jsx --out-file ./dist-modules/public/routes.js
module.exports = {
  entry: './server/server.js',
  target: 'node',
  node: {
    __dirname: true
  },
  output: {
    path: path.join(__dirname, 'server'),
    filename: 'index.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    // wipe any output files
    new Clean(['server/index.js']),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
}
