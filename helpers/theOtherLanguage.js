module.exports = function theOtherLanguage() {
  if (this.locale === "en") {
    return "<a class=\"lang-action\" href=\"/hablas/espanol\">en Español</a>";
  } else {
    return "<a class=\"lang-action\" href=\"/speak/english\">in English</a>";
  }
};
