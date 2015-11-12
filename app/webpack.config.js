let config;

if (process.env.NODE_ENV === 'production') {
  config = require('./webpack.config.prod.babel.js');
} else {
  config = require('./webpack.config.dev.babel.js');
}

export default config;
