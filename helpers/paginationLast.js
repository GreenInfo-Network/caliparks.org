function constructPaginationArgs(pageData, forward) {
  var paramsObject = {};

  for (var i in pageData) {
    if (pageData.hasOwnProperty(i) && pageData[i] && pageData[i].toString().length) {
      if (['startat','perpage','not'].indexOf(i) > -1) {
        paramsObject[i] = pageData[i];
      }
    }
  }

  for (var i in pageData.query) {
    if (pageData.query.hasOwnProperty(i)) {
      if (['q','near','with','bbox'].indexOf(i) > -1 && pageData.query[i] && pageData.query[i].toString().length) {
        paramsObject[i] = pageData.query[i];
      }
    }
  }

  //
  // Make sure special search routes are not duplicated in search params
  //
  if (pageData.context && paramsObject[pageData.context]) {
    delete paramsObject[pageData.context];
  }

  return paramsObject;
}

function stringifyPaginationArgs(paramsObject) {

  return Object.keys(paramsObject).map(function(key) {
    return key + '=' + encodeURI(paramsObject[key]);
  }).join('&');

}

module.exports = function paginationLast(options) {
  var paramArray;

  if (!options.data.root.perpage) {
    options.data.root.perpage = (options.data.root.query.perpage||30);
  }

  if (!options.data.root.startat) {
    options.data.root.startat = (options.data.root.query.startat||0);
  }

  var paginationArgs;
  if ((options.data.root.startat|0) >= (options.data.root.perpage|0)) {
    paginationArgs = constructPaginationArgs(options.data.root);
    paginationArgs.startat = parseInt((paginationArgs.startat||0),10) - parseInt((paginationArgs.perpage||0), 10);
    return options.fn(this).replace(/href="#"/,'href="?' + stringifyPaginationArgs(paginationArgs) + '"');
  }
};
