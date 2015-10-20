import glob from 'glob';
import {Promise} from 'es6-promise';


// see https://github.com/isaacs/node-glob
module.exports = {
  glob: (pattern, options, callback) => {
    return new Promise((resolve, reject) => {
      glob(pattern, options, (err, files) => {
        if (err) {
          return reject(err);
        }
        resolve(files);
      });
    });
  }
};
