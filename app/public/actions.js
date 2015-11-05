import fetch from 'isomorphic-fetch';


export const SET_STATE = 'SET_STATE';
export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

export const FETCH_PARK_INFO = 'FETCH_PARK_INFO';
export function fetchParkInfo(parkId) {
  return {
    type: FETCH_PARK_INFO,
    parkId
  };
}

export const REQUEST_FEATURED_PARKS = 'REQUEST_FEATURED_PARKS';
export function requestFeaturedParks() {
  return {
    type: REQUEST_FEATURED_PARKS
  };
}

export const RECEIVE_FEATURED_PARKS = 'RECEIVE_FEATURED_PARKS';
export function receiveFeaturedParks(parks) {
  return {
    type: RECEIVE_FEATURED_PARKS,
    parks,
    receivedAt: Date.now()
  };
}

export function fetchFeaturedParks() {
  return (dispatch) => {
    dispatch(requestFeaturedParks());

    return fetch('/api/featured_parks.json')
      .then(response => response.json())
      .then(parks => dispatch(receiveFeaturedParks(parks)))
      .catch(err => console.warn(err.stack));
  };
}
