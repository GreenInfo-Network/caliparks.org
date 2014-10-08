"use strict";

var stream = require("stream"),
    util = require("util");

var retry = require("retry");

var Balancer = function(targets) {
  stream.PassThrough.call(this, {
    objectMode: true,
    highWaterMark: 1 // don't buffer
  });

  this.targets = targets || [];

  this._transform = function(x, _, callback) {
    var balancer = this;

    var operation = retry.operation({
      minTimeout: 1,
      maxTimeout: 1000,
      randomize: true
    });

    return operation.attempt(function(currentAttempt) {
      var target = balancer.targets
        .filter(function(x) {
          return x._writableState.length === 0;
        })
        .shift();

      // retry if none was available
      if (!target) {
        if (operation.retry(true)) {
          return;
        }

        // ran out of attempts; restart
        return setImmediate(balancer._transform.bind(balancer), x, _, callback);
      }

      // hand off the payload
      target.write(x);

      return callback();
    });
  };

  // delegate to the underlying array
  // TODO push is a bad name for this, as it's already used by streams; see if
  // pipe() can be used and push() reimplemented
  // either way, events should be passed through (which they're not currently)
  this.push = this.targets.push.bind(this.targets);
};

util.inherits(Balancer, stream.PassThrough);

module.exports = Balancer;
