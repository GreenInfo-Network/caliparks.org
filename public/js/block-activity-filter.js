define(["require","exports","module","stamen-super-classy","routes"], function(
  require,
  exports,
  module,
  StamenSuperClassy,
  Routes
) {

  "use strict";

  var routes = new Routes();

  module.exports = function ActivityFilterDrawer(rootSelector, viewData, callback) {

    var that = this;

    StamenSuperClassy.apply(that, arguments);

    var rootNode           = that.utils.get(rootSelector)[0],
        handleNode             = that.utils.get(".filter-handle", rootNode)[0],
        clearActionNode        = that.utils.get(".clear-activities-action", rootNode)[0],
        filterDrawerNode       = that.utils.get(".filter-drawer", rootNode)[0],
        toggleDrawerActionNode = that.utils.get(".toggle-activities-drawer-action", rootNode)[0],
        toggleDrawerStatusNode = that.utils.get(".status", toggleDrawerActionNode)[0],
        closeDrawerActionNode  = that.utils.get(".close-drawer-action", rootNode)[0],
        state = {},
        searchParams, withArray;


    function initClearAction() {

      if (clearActionNode) {
        clearActionNode.addEventListener("click", function(e) {
          e.preventDefault();

          var selected = that.utils.get(".selected",filterDrawerNode);

          searchParams = routes.getParamStateFromLocationObject();
          delete searchParams.with;

          for (var i=0; selected.length > i; i++) {
            selected[i].classList.remove("selected");
          }

          updateStatusNode([]);
          that.fire("filter-select", {
            "params"  : searchParams,
            "element" : e.target
          });
        }, false);
      }

    }

    function updateStatusNode(withArray) {

      if (withArray.length) {
        handleNode.classList.add("has");
        toggleDrawerStatusNode.innerHTML = withArray.length;
      } else {
        handleNode.classList.remove("has");
      }

    }

    function lock() {
      state.locked = true;
    }

    function unLock() {
      state.locked = false;
    }

    function initActivityToggleActions() {

      filterDrawerNode.addEventListener("click", function(e) {

        if (!state.locked) {
          searchParams = routes.getParamStateFromLocationObject();
          withArray  = (searchParams.with ? searchParams.with.toLowerCase().split(",") : []);

          var toggleAction = that.utils.parentHasClass(e.target,"toggle-activity-action"),
          filter, index;

          if (toggleAction) {
            filter = toggleAction.getAttribute("data-filter");
            index  = withArray.indexOf(encodeURI(filter).toLowerCase());


            if (index > -1) { //Meaning that this page already has this filter selected
              if (index === 0) {
                withArray = [withArray[1]];
              } else {
                withArray.splice(index);
              }
              searchParams["with"] = withArray.join(",");
              toggleAction.classList.remove("selected");
            } else {
              withArray.push(filter);
              searchParams["with"] = withArray.join(",");
              toggleAction.classList.add("selected");
            }

            updateStatusNode(withArray);
            setTimeout(function() {
              that.fire("filter-select", {
                "params"  : searchParams,
                "element" : toggleAction
              });
            },0);
          }
        }

      }, false);

      //
      // Put the current number of filters in the status area
      //
      searchParams = routes.getParamStateFromLocationObject();
      withArray    = (searchParams.with ? searchParams.with.split(",") : []);
      updateStatusNode(withArray);

    }

    function initDrawerToggleAction() {

      toggleDrawerActionNode.addEventListener("click", function(e) {

        e.preventDefault();

        rootNode.classList.toggle("closed");

      }, false);

    }

    function initDrawerCloseAction() {

      closeDrawerActionNode.addEventListener("click", function(e) {

        e.preventDefault();

        rootNode.classList.add("closed");

      }, false);

    }

    initClearAction();
    initActivityToggleActions();
    initDrawerToggleAction();
    initDrawerCloseAction();

    //
    // Interface
    //
    that.lock   = lock;
    that.unLock = unLock;

    //
    // Go go go!
    //
    callback(null, that);

    return that;

  };

});
