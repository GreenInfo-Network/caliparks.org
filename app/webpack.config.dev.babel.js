import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SvgStore from 'webpack-svgstore-plugin';
import webpack from 'webpack';

export default {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
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
      {test: /\.jsx?$/, loader: 'eslint',  exclude: [/node_modules/, /sticky.js/]}
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          stage: 0,
          plugins: [
            'react-transform'
          ],
          extra: {
            'react-transform': {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }
              ]
            }
          },
          optional: [
            'es7.classProperties'
          ]
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  plugins: [
    // ensure consistent build hashes
    new webpack.optimize.OccurenceOrderPlugin(),
    // enable hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    // don't generate assets containing errors
    new webpack.NoErrorsPlugin(),
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
  }
};
