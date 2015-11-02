'use strict';

var webpack = require('webpack');
var path = require('path');
var SvgStore = require('webpack-svgstore-plugin');

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
      {test: /\.jsx?$/, loader: "eslint", exclude: [/node_modules/, /sticky.js/]}
    ],

    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    new SvgStore(path.join(__dirname + '/public/assets/svgs'), {
      // svg prefix
      svg: {
        style: 'position:absolute; width:0; height:0',
        xmlns: 'http://www.w3.org/2000/svg'
      },
      output: [
        {
          filter: 'all',
          sprite: 'main.svg'
        }
      ]
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  node: {}
};
