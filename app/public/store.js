import {applyMiddleware, createStore} from 'redux';

import apiMiddleware from './api_middleware';
import reducer from './reducer';

const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware
)(createStore);

export default function makeStore() {
  const store = createStoreWithMiddleware(reducer);

  if (module.hot) {
    // enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
