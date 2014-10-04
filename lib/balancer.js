"use strict";

var stream = require("stream"),
    util = require("util");

var Balancer = function(targets) {
  stream.PassThrough.call(this, {
    objectMode: true,
    highWaterMark: 1 // don't buffer
  });

  this.targets = targets || [];

  this._transform = function(x, _, callback) {
    // fetch the first available worker (i.e. the first one with no buffered
    // tasks)
    var target = this.targets
      .filter(function(x) {
        return x._writableState.length === 0;
      })
      .pop();

    // retry if none was available
    if (!target) {
      return setImmediate(this._transform.bind(this), x, _, callback);
    }

    // hand off the payload
    target.write(x);

    return callback();
  };

  // delegate to the underlying array
  this.push = this.targets.push.bind(this.targets);
};

util.inherits(Balancer, stream.PassThrough);

module.exports = Balancer;
