define(["require","exports","module","jquery","stamen-super-classy"], function(
  require,
  exports,
  module,
  jquery,
  StamenSuperClassy
) {

  "use strict";

  function ActivityFilterDrawer(rootSelector) {

    var that = this;

    StamenSuperClassy.apply(that, arguments);

    var rootNode         = that.utils.get(rootSelector)[0],
        clearActionNode  = that.utils.get('.clear-activities-action', rootNode)[0],
        filterDrawerNode = that.utils.get('.filter-drawer', rootNode)[0],
        searchParams;


    function objectifyUrlSearchParams(locationSearchString) {
      return JSON.parse(locationSearchString.substring(1)
        .replace(/^/,'{"')
        .replace(/$/, '"}')
        .replace(/&/g,'","')
        .replace(/=/g,'":"'));
    }

    function stringifyUrlSearchParams(paramsObject) {
      var stringOut = '?';

      for (var i in paramsObject) {
        if (paramsObject.hasOwnProperty(i)) {
          stringOut += (i + '=' + paramsObject[i] + '&');
        }
      }

      return stringOut.substring(0, stringOut.length-1);
    }

    function initClearAction() {

      clearActionNode.addEventListener('click', function(e) {
        e.preventDefault();

        searchParams = objectifyUrlSearchParams(location.search);
        delete searchParams.with;

        updateUrl(searchParams);
      }, false);
    }

    function initActivityToggleActions() {

      filterDrawerNode.addEventListener('click', function(e) {
        e.preventDefault();

        searchParams = objectifyUrlSearchParams(location.search);

        var withArray  = (searchParams.with ? searchParams.with.split(',') : []),
            filter     = e.target.getAttribute('data-filter') || e.target.parentNode.getAttribute('data-filter') || e.target.parentNode.parentNode.getAttribute('data-filter'),
            index      = withArray.indexOf(filter);

        if (index > -1) { //Meaning that this page already has this filter selected
          withArray.splice(index);
          searchParams['with'] = withArray.join(',');
        } else {
          withArray.push(filter);
          searchParams['with'] = withArray.join(',');
        }

        updateUrl(searchParams);
      }, false);

    }

    function updateUrl(paramObject) {

      //
      // if search is in the `with` context, it would make the most sense to
      // redirect them to the plain old search context
      //
      // Otherwise just change the with search param
      //
      if (!searchParams['with'] && location.href.split('/')[4] === 'with') {
        location.href = '/parks/search' + (location.hash||'') + stringifyUrlSearchParams(searchParams);
      } else {

        if (!searchParams['with']) {
          delete searchParams['with'];
        }

        location.search = stringifyUrlSearchParams(searchParams);
      }
    }

    initClearAction();
    initActivityToggleActions();

    return that;

  }

  var activityFilterDrawer = new ActivityFilterDrawer('#activity-filter-area');

});
