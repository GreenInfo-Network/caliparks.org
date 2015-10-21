import Client from 'react-engine/lib/client';
import Routes from './routes.jsx';

// boot options
const options = {
  routes: Routes,

  // supply a function that can be called
  // to resolve the file that was rendered.
  viewResolver: (viewName) => {
    console.log('V: ', viewName);
    return require('./views/' + viewName);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
  Client.boot(options);
});
