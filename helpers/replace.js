module.exports = function replace(options) {
  return options.fn(this).split(options.hash.item).join(options.hash.with);
};
