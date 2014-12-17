module.exports = function languageBanner(options) {
  if (this.settings.showLangBanner) {
    return options.fn(this);
  } else {
    return "";
  }
};
