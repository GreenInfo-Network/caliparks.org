define(["require","exports","module","jquery","stamen-super-classy","block-search-box","routes"], function(
  require,
  exports,
  module,
  jquery,
  StamenSuperClassy,
  BlockSearchBox,
  Routes
) {

  "use strict";

  var routes = new Routes();

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


    function initClearAction() {

      if (clearActionNode) {
        clearActionNode.addEventListener('click', function(e) {
          e.preventDefault();

          searchParams = routes.getParamStateFromLocationObject();
          delete searchParams.with;

          routes.updateSearchUrl(searchParams);
        }, false);
      }

    }

    function initActivityToggleActions() {

      filterDrawerNode.addEventListener('click', function(e) {
        e.preventDefault();

        searchParams = routes.getParamStateFromLocationObject();
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

        routes.updateSearchUrl(searchParams);
      }, false);

      //
      // Put the current number of filters in the status area
      //
      if (toggleDrawerStatusNode) {
        searchParams = routes.getParamStateFromLocationObject();
        withArray    = (searchParams.with ? searchParams.with.split(',') : []);
        toggleDrawerStatusNode.innerHTML = (withArray.length) ? withArray.length : '';
      }

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

    initClearAction();
    initActivityToggleActions();
    initDrawerToggleAction();
    initDrawerCloseAction();

    return that;

  }

  var blockSearchBox       = new BlockSearchBox('.block-search-box',{}, function(err, blockSearchBox) {});
  var activityFilterDrawer = new ActivityFilterDrawer('#activity-filter-area');

});
