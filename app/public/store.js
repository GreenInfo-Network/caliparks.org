import {applyMiddleware, createStore} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

const middleware = [thunkMiddleware];

if (typeof __REACT_ENGINE__ !== 'undefined') {
  // redux-logger only works in a browser environment
  middleware.push(createLogger());
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function makeStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    // enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
