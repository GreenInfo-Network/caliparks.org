import glob from 'glob';


var utils = {};

// see https://github.com/isaacs/node-glob
utils.glob = function (pattern, options, callback) {
  glob(pattern, options, function (err, files) {
    callback(err, files);
  });
};

module.exports = utils;
