import {Map} from 'immutable';

import * as actions from './actions';

const INITIAL_STATE = Map();

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.FETCH_PARK_INFO:
    console.log('fetching park info', state);
    console.log(state.merge({ thing: 'whatevs' }));

    // TOOD do a thing
    return state.merge({
      thing: 'whatevs'
    });

  default:
    console.warn(`Unrecognized action type: ${action.type}`);
  }

  return state;
}
