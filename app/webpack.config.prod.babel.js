import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Clean from 'clean-webpack-plugin';
import SvgStore from 'webpack-svgstore-plugin';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
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
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: [/node_modules/, /react-fullpage/, /react-slick/, /socs.js/]
      }
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass'], {
          remove: false // extract as styles.css, but also leave in the bundle
        })
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    // wipe any output files
    new Clean(['public/bundle.js*', 'public/styles.css*', 'public/main.svg']),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.css"),
    new SvgStore(path.join(__dirname, 'public', 'assets', 'svgs', '**/*.svg'), '/', {
      name: 'main.svg',
      svgoOptions: {
        svg: {
          style: 'position:absolute; width:0; height:0',
          xmlns: 'http://www.w3.org/2000/svg'
        }
      }
    }),
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
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
};
