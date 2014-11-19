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

    var rootNode               = that.utils.get(rootSelector)[0],
        clearActionNode        = that.utils.get('.clear-activities-action', rootNode)[0],
        filterDrawerNode       = that.utils.get('.filter-drawer', rootNode)[0],
        toggleDrawerActionNode = that.utils.get('.toggle-activities-drawer-action', rootNode)[0],
        toggleDrawerStatusNode = that.utils.get('.status', toggleDrawerActionNode)[0],
        closeDrawerActionNode  = that.utils.get('.close-drawer-action', rootNode)[0],
        searchParams, withArray;


    function objectifyUrlSearchParams(locationSearchString) {

      if (locationSearchString.length) {
        return JSON.parse(locationSearchString.substring(1)
          .replace(/^/,'{"')
          .replace(/$/, '"}')
          .replace(/&/g,'","')
          .replace(/=/g,'":"'));
      } else {
        return {};
      }
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

      if (clearActionNode) {
        clearActionNode.addEventListener('click', function(e) {
          e.preventDefault();

          searchParams = objectifyUrlSearchParams(location.search);
          delete searchParams.with;

          updateUrl(searchParams);
        }, false);
      }

    }

    function initActivityToggleActions() {

      filterDrawerNode.addEventListener('click', function(e) {
        e.preventDefault();

        searchParams = objectifyUrlSearchParams(location.search);
        withArray  = (searchParams.with ? searchParams.with.split(',') : []);

        var filter     = e.target.getAttribute('data-filter') || e.target.parentNode.getAttribute('data-filter') || e.target.parentNode.parentNode.getAttribute('data-filter'),
            index      = withArray.indexOf(encodeURI(filter));

        if (index > -1) { //Meaning that this page already has this filter selected
          withArray.splice(index);
          searchParams['with'] = withArray.join(',');
        } else {
          withArray.push(filter);
          searchParams['with'] = withArray.join(',');
        }

        updateUrl(searchParams);
      }, false);

      //
      // Put the current number of filters in the status area
      //
      searchParams = objectifyUrlSearchParams(location.search);
      withArray    = (searchParams.with ? searchParams.with.split(',') : []);
      toggleDrawerStatusNode.innerHTML = (withArray.length) ? withArray.length : '';

    }

    function initDrawerToggleAction() {

      toggleDrawerActionNode.addEventListener('click', function(e) {

        e.preventDefault();

        rootNode.classList.toggle('closed')

      }, false);

    }

    function initDrawerCloseAction() {

      closeDrawerActionNode.addEventListener('click', function(e) {

        e.preventDefault();

        rootNode.classList.add('closed')

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
    initDrawerToggleAction();
    initDrawerCloseAction();

    return that;

  }

  var activityFilterDrawer = new ActivityFilterDrawer('#activity-filter-area');

});
