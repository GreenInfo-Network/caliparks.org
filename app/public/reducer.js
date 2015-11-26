import {combineReducers} from 'redux';
import * as actions from './actions';

const INITIAL_STATE = {};

function featuredParks(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.REQUEST_FEATURED_PARKS:
    return {
      ...state,
      isFetching: true
    };

  case actions.RECEIVE_FEATURED_PARKS:
    return {
      ...state,
      isFetching: false,
      parks: action.parks,
      lastUpdated: action.receivedAt
    };

  default:
    return state;
  }
}

function mostSharedParks(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.REQUEST_MOST_SHARED_PARKS:
    return {
      ...state,
      isFetching: true
    };

  case actions.RECEIVE_MOST_SHARED_PARKS:
    return {
      ...state,
      isFetching: false,
      parks: action.parks.slice(0),
      lastUpdated: action.receivedAt,
      interval: action.interval
    };

  default:
    return state;
  }
}

function selectedPark(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.CLEAR_SELECTED_PARK:
    return {
      ...state,
      isFetching: false,
      park: [],
      images: [],
      parkid: [],
      lastUpdated: null
    };

  case actions.REQUEST_SELECTED_PARK:
    return {
      ...state,
      isFetching: true
    };

  case actions.REQUEST_SELECTED_PARK_PHOTOS:
    return {
      ...state,
      isFetching: true
    };

  case actions.RECEIVE_SELECTED_PARK:
    return {
      ...state,
      isFetching: false,
      park: action.park.park,
      images: action.park.images,
      parkid: action.parkid,
      lastUpdated: action.receivedAt
    };

  case actions.RECEIVE_SELECTED_PARK_PHOTOS:
    return {
      ...state,
      isFetching: false,
      images: state.images ? state.images.concat(action.images) : action.images,
      lastUpdated: action.receivedAt
    };

  default:
    return state;
  }
}

function selectedActivity(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.CLEAR_SELECTED_ACTIVITY:
    return {
      ...state,
      isFetching: false,
      parks: [],
      activity: '',
      lastUpdated: null
    };

  case actions.REQUEST_SELECTED_ACTIVITY:
    return {
      ...state,
      isFetching: true
    };

  case actions.RECEIVE_SELECTED_ACTIVITY:
    return {
      ...state,
      isFetching: false,
      parks: action.parks,
      activity: action.activity,
      lastUpdated: action.receivedAt
    };

  default:
    return state;
  }
}

function windowSize(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.SET_WINDOW_SIZE:
    return {
      ...state,
      width: action.size.width,
      height: action.size.height
    };

  default:
    return state;
  }
}

const identity = (state = INITIAL_STATE, action) => state;

const combinedReducers = combineReducers({
  featuredParks,
  mostSharedParks,
  selectedPark,
  selectedActivity,
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
