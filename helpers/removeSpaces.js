module.exports = function removeSpaces(options) {
  return options.fn(this).replace(/ /g, "_").toLowerCase();
};
