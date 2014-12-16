module.exports = function __() {
  var func = arguments[0].data.root.__ || function(s){return s;};
  return func.apply(arguments[0].data.root, [arguments[0].fn(this)]);
};
