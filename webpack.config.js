var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var TARGET = process.env.TARGET || 'production';
var ROOT_PATH = path.resolve(__dirname);
var APP_ENTRY_POINTS = [
    './src/app/client.js',
    './src/styles/app.scss'
  ];
var LIVE_RELOAD_PORT = process.env.RELOAD_PORT || 3001;

var common = {
  output: {
    path: path.resolve(ROOT_PATH, 'build/public'),
    filename: 'app.js'
  },
  eslint: {
    configFile: path.resolve(ROOT_PATH,'.eslintrc')
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
    ]
  }
};

if (TARGET === 'development') {
  module.exports = merge(
    common,
    {
      devtool: 'eval',
      entry: [
        'webpack-dev-server/client?http://localhost:' +  LIVE_RELOAD_PORT + '/',
        'webpack/hot/only-dev-server'
      ].concat(APP_ENTRY_POINTS),
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?optional[]=es7.classProperties']
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            loaders: ['style', 'css', 'sass']
          },
        ]
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ],
    }
  );
} else {
  module.exports = merge(
    common,
    {
      devtool: 'source-map',
      entry: APP_ENTRY_POINTS,
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel?optional[]=es7.classProperties'
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style', 'css!sass')
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new ExtractTextPlugin('styles.css')
      ]
    }
  );
}