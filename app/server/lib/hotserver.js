// Start hot reload server
// TODO: Clean this up
import webpack from 'webpack';
import wpconfig from '../../webpack.config.dev.babel.js';
import WebpackDevServer from 'webpack-dev-server';

export default function(port, reloadPort) {
  new WebpackDevServer(webpack(wpconfig), {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '*': `http://localhost:${port}`
    }
  }).listen(reloadPort, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }

    console.log(`Hot reloading at: http://localhost:${reloadPort}`);
  });
}
