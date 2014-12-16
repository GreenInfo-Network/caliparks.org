module.exports = function pluralize() {

  var options, number;

  options = (typeof arguments[0] !== 'object') ? arguments[1] : arguments[0];
  number  = (typeof arguments[0] !== 'object') ? arguments[0] : null; //If not, the number is already in the string

  var o = (number) ? [number,options.fn(this)] : options.fn(this).split(' '),
      l = o[o.length-1].split('|');

  if ((o[0] | 0) === 1 && o.length === 2) {
    return options.fn(this).split(l[0])[0] + ' ' +  l[0];
  } else {
    return options.fn(this).split(l[0])[0] + ' ' +  l[1];
  }
};
