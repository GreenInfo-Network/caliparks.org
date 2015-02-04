function clientTranslate(string) {
  //
  // At this time we only need to support Spanish and English
  //
  if ((typeof STMN === "object") && STMN.locale === "es") { //Spanish

    return STMN.localeEs[string];

  } else { //Leave it default english

    return string;

  }
}

module.exports = function __() {
  var func = arguments[0].data.root.__ || clientTranslate;
  return (func.apply(arguments[0].data.root, [
    arguments[0].fn(this)
  ]) || "").replace(/%s/,arguments[0].hash.arg);
};
