"use strict";

var stream = require("stream"),
    util = require("util");

var Worker = function(process) {
  stream.Writable.call(this, {
    objectMode: true,
    highWaterMark: 1 // don't buffer
  });

  this._write = function(x, _, callback) {
    return process(x, function(err) {
      if (err) {
        console.warn(err.stack);
      }

      // always pretend success
      return callback();
    });
  };
};

util.inherits(Worker, stream.Writable);

module.exports = Worker;
