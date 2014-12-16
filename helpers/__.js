module.exports = function __() {
  return arguments[0].data.root.__.apply(arguments[0].data.root, [arguments[0].fn(this)]);
};
