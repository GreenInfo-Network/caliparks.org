import request from 'superagent';
import {Promise} from 'es6-promise';

const END_POINTS = {
  stories: 'http://jsonplaceholder.typicode.com/posts',
  parks: '/api/db/photos'
};


/**
 * Wrapper for calling a XHR requests
 */

function validateEndPoint(endpoint) {
  return END_POINTS[endpoint] ? true : false;
}

module.exports = {
  isServer: () => {
    return (typeof __REACT_ENGINE__ === 'undefined') ? true : false;
  },
  get: (endpoint) => {
    console.log('Endpoint good: ', validateEndPoint(endpoint));
    return new Promise((resolve, reject) => {
      request
        .get(END_POINTS[endpoint])
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }
};
