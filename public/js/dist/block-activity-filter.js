define([ "require", "exports", "module", "stamen-super-classy", "routes" ], function(require, exports, module, StamenSuperClassy, Routes) {
    "use strict";
    var routes = new Routes();
    module.exports = function(rootSelector, viewData, callback) {
        function initClearAction() {
            clearActionNode && clearActionNode.addEventListener("click", function(e) {
                e.preventDefault();
                var selected = that.utils.get(".selected", filterDrawerNode);
                searchParams = routes.getParamStateFromLocationObject(), delete searchParams.with;
                for (var i = 0; selected.length > i; i++) selected[i].classList.remove("selected");
                that.fire("filter-select", {
                    params: searchParams,
                    element: e.target
                });
            }, !1);
        }
        function lock() {
            state.locked = !0;
        }
        function unLock() {
            state.locked = !1;
        }
        function initActivityToggleActions() {
            filterDrawerNode.addEventListener("click", function(e) {
                if (!state.locked) {
                    searchParams = routes.getParamStateFromLocationObject(), withArray = searchParams.with ? searchParams.with.toLowerCase().split(",") : [];
                    var filter, index, toggleAction = that.utils.parentHasClass(e.target, "toggle-activity-action");
                    toggleAction && (filter = toggleAction.getAttribute("data-filter"), index = withArray.indexOf(encodeURI(filter).toLowerCase()), 
                    index > -1 ? (0 === index ? withArray = [ withArray[1] ] : withArray.splice(index), 
                    searchParams["with"] = withArray.join(","), toggleAction.classList.remove("selected")) : (withArray.push(filter), 
                    searchParams["with"] = withArray.join(","), toggleAction.classList.add("selected")), 
                    setTimeout(function() {
                        that.fire("filter-select", {
                            params: searchParams,
                            element: toggleAction
                        });
                    }, 0));
                }
            }, !1), searchParams = routes.getParamStateFromLocationObject(), withArray = searchParams.with ? searchParams.with.split(",") : [];
        }
        function initDrawerToggleAction() {
            toggleDrawerActionNode.addEventListener("click", function(e) {
                e.preventDefault(), rootNode.classList.toggle("closed");
            }, !1);
        }
        function initDrawerCloseAction() {
            closeDrawerActionNode.addEventListener("click", function(e) {
                e.preventDefault(), rootNode.classList.add("closed");
            }, !1);
        }
        var that = this;
        StamenSuperClassy.apply(that, arguments);
        var searchParams, withArray, rootNode = that.utils.get(rootSelector)[0], clearActionNode = (that.utils.get(".filter-handle", rootNode)[0], 
        that.utils.get(".clear-activities-action", rootNode)[0]), filterDrawerNode = that.utils.get(".filter-drawer", rootNode)[0], toggleDrawerActionNode = that.utils.get(".toggle-activities-drawer-action", rootNode)[0], closeDrawerActionNode = (that.utils.get(".status", toggleDrawerActionNode)[0], 
        that.utils.get(".close-drawer-action", rootNode)[0]), state = {};
        return initClearAction(), initActivityToggleActions(), initDrawerToggleAction(), 
        initDrawerCloseAction(), that.lock = lock, that.unLock = unLock, callback(null, that), 
        that;
    };
});