module.exports = function json(options) {
  return JSON.stringify(options.fn(this));
};
