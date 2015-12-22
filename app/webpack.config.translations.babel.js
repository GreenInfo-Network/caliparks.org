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
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            ['react-intl', {
              'messagesDir': './translations/sources'
            }]
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
    new Clean(['translations/**/*']),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
};
