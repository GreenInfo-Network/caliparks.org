import {Map} from 'immutable';
import {combineReducers} from 'redux';

import * as actions from './actions';

const INITIAL_STATE = Map();

function featuredParks(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.REQUEST_FEATURED_PARKS:
    return Map(state).merge({
      isFetching: true
    });

  case actions.RECEIVE_FEATURED_PARKS:
    return Map(state).merge({
      isFetching: false,
      parks: action.parks,
      lastUpdated: action.receivedAt
    });

  default:
    return state;
  }
}

function mostSharedParks(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.REQUEST_MOST_SHARED_PARKS:
    return Map(state).merge({
      isFetching: true
    });

  case actions.RECEIVE_MOST_SHARED_PARKS:
    return Map(state).merge({
      isFetching: false,
      parks: action.parks,
      lastUpdated: action.receivedAt
    });

  default:
    return state;
  }
}

const identity = (state = INITIAL_STATE, action) => state;

const combinedReducers = combineReducers({
  featuredParks,
  mostSharedParks,
  // TODO consider folding these into a global subtree
  // TODO may also need react-router-related props (to support correct routing)?
  gak: identity,
  lang: identity,
  messages: identity,
  title: identity,
  url: identity,
  viewData: identity
});

export default function rootReducer(state = INITIAL_STATE, action) {
  return combinedReducers.apply(null, arguments);
}
