import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

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
