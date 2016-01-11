import path from 'path';
import Clean from 'clean-webpack-plugin';
import SvgStore from 'webpack-svgstore-plugin';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './public/index.js',
    './styles/app.scss'
  ],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
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
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            ['react-transform', {
              'transforms': [{
                'transform': 'react-transform-hmr',
                'imports': ['react'],
                'locals': ['module']
              }]
            }]
          ]
        },
        exclude: [/node_modules/, /react-fullpage/]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'autoprefixer', 'sass']
      }
    ]
  },

  plugins: [
    // wipe any output files
    new Clean(['public/bundle.js*', 'public/styles.css*', 'public/main.svg']),
    // ensure consistent build hashes
    new webpack.optimize.OccurenceOrderPlugin(),
    // enable hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    // don't generate assets containing errors
    new webpack.NoErrorsPlugin(),
    new SvgStore(path.join(__dirname, 'public', 'assets', 'svgs', '**/*.svg'), '.', {
      name: 'main.svg',
      prefix: '',
      svgoOptions: {
        svg: {
          style: 'position:absolute; width:0; height:0',
          xmlns: 'http://www.w3.org/2000/svg'
        }
      }
    })
  ],
  resolve: {
    alias: {
      react: path.join(__dirname, 'node_modules/react'),
      'react-dom': path.join(__dirname, 'node_modules/react-dom')
    },
    extensions: ['', '.js', '.jsx', '.json']
  }
};
