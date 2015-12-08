import path from 'path';
import Clean from 'clean-webpack-plugin';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  entry: [
    './public/index.js'
  ],

  output: {
    path: path.resolve(__dirname, 'translations'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 0,
          plugins: [
            'react-intl'
          ],
          extra: {
            'react-intl': {
              'messagesDir': './translations/sources'
            }
          },
          optional: [
            'es7.classProperties'
          ]
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
    new Clean(['translations/*']),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
};
