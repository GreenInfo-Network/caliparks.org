import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SvgStore from 'webpack-svgstore-plugin';

let config;

if (process.env.NODE_ENV === 'production') {
  config = require('./webpack.config.dev.babel.js');
} else {
  config = require('./webpack.config.prod.babel.js');
}

export default config;
