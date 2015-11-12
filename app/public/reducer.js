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
      lastUpdated: action.receivedAt,
      interval: action.interval
    });

  default:
    return state;
  }
}

function selectedPark(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.CLEAR_SELECTED_PARK:
    return Map(state).merge({
      isFetching: false,
      park: [],
      images: [],
      parkid: [],
      lastUpdated: null
    });

  case actions.REQUEST_SELECTED_PARK:
    return Map(state).merge({
      isFetching: true
    });

  case actions.REQUEST_SELECTED_PARK_PHOTOS:
    return Map(state).merge({
      isFetching: true
    });

  case actions.RECEIVE_SELECTED_PARK:
    return Map(state).merge({
      isFetching: false,
      park: action.park.park,
      images: action.park.images,
      parkid: action.parkid,
      lastUpdated: action.receivedAt
    });

  case actions.RECEIVE_SELECTED_PARK_PHOTOS:
    // TODO: Not sure this is best way to concat new
    // images to Immutable state images
    const prv = state.toJS();
    return Map(state).merge({
      isFetching: false,
      images: prv.images ? prv.images.concat(action.images) : action.images,
      lastUpdated: action.receivedAt
    });

  default:
    return state;
  }
}

function windowSize(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.SET_WINDOW_SIZE:
    return Map(state).merge({
      width: action.size.width,
      height: action.size.height
    });

  default:
    return state;
  }
}

const identity = (state = INITIAL_STATE, action) => state;

const combinedReducers = combineReducers({
  featuredParks,
  mostSharedParks,
  selectedPark,
  windowSize,
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
