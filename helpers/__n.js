module.exports = function __n() {
  return arguments[0].data.root.__n.apply(arguments[0].data.root, [arguments[0].fn(this)]);
};
