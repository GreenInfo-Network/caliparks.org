"use strict";

var util = require("util");

var Split = function() {
  Error.call(this, "Split requested.");
};

util.inherits(Split, Error);

module.exports = Split;
