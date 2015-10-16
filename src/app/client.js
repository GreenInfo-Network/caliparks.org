import Client from 'react-engine/lib/client';
import Routes from './routes.js';

// -- Boot Options
const options = {
  routes: Routes,
  viewResolver: function(viewName) {
    return require('./views/' + viewName);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
  Client.boot(options);
});
