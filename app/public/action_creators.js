import * as actions from './actions';

export function fetchParkInfo(parkId) {
  return {
    type: actions.FETCH_PARK_INFO,
    parkId
  };
}
