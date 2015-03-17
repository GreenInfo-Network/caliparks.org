module.exports = function isproduction(options) {

  if (process.env.NODE_ENV === "production") {
    return options.fn(this);
  }

};
