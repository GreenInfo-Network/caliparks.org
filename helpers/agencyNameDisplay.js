module.exports = function agencyNameDisplay(options) {

  var name_parts = options.fn(this).split(',');

  return (name_parts.length > 1) ? name_parts[1] + ' ' + name_parts[0] : name_parts[0];
}
