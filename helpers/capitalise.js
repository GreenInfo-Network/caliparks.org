module.exports = function lowercase(options) {
  var string = options.fn(this);
  return string.substring(0,1).toUpperCase() + string.substring(1);
};
