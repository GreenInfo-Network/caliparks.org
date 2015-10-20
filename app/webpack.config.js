'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  entry: [
    './public/index.js',
    './styles/app.scss'
  ],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  eslint: {
    configFile: path.join(__dirname, '.eslintrc')
  },

  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: "eslint", exclude: /node_modules/}
    ],

    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
  },

  plugins: [],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  node: {}
};
