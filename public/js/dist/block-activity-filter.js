define([ "require", "exports", "module", "stamen-super-classy", "routes" ], function(require, exports, module, StamenSuperClassy, Routes) {
    "use strict";
    var routes = new Routes();
    module.exports = function(rootSelector, viewData, callback) {
        function initClearAction() {
            clearActionNode && clearActionNode.addEventListener("click", function(e) {
                e.preventDefault(), searchParams = routes.getParamStateFromLocationObject(), delete searchParams.with, 
                updateStatusNode([]), that.fire("filter-select", searchParams);
            }, !1);
        }
        function updateStatusNode(withArray) {
            toggleDrawerStatusNode.innerHTML = withArray.length ? withArray.length : 0;
        }
        function initActivityToggleActions() {
            filterDrawerNode.addEventListener("click", function(e) {
                searchParams = routes.getParamStateFromLocationObject(), withArray = searchParams.with ? searchParams.with.toLowerCase().split(",") : [];
                var toggleAction = that.utils.parentHasClass(e.target, "toggle-activity-action"), filter = toggleAction.getAttribute("data-filter"), index = withArray.indexOf(encodeURI(filter).toLowerCase());
                index > -1 ? (0 === index ? withArray = [ withArray[1] ] : withArray.splice(index), 
                searchParams["with"] = withArray.join(","), toggleAction.classList.remove("selected")) : (withArray.push(filter), 
                searchParams["with"] = withArray.join(","), toggleAction.classList.add("selected")), 
                updateStatusNode(withArray), that.fire("filter-select", searchParams);
            }), searchParams = routes.getParamStateFromLocationObject(), withArray = searchParams.with ? searchParams.with.split(",") : [], 
            updateStatusNode(withArray);
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
        var searchParams, withArray, rootNode = that.utils.get(rootSelector)[0], clearActionNode = that.utils.get(".clear-activities-action", rootNode)[0], filterDrawerNode = that.utils.get(".filter-drawer", rootNode)[0], toggleDrawerActionNode = that.utils.get(".toggle-activities-drawer-action", rootNode)[0], toggleDrawerStatusNode = that.utils.get(".status", toggleDrawerActionNode)[0], closeDrawerActionNode = that.utils.get(".close-drawer-action", rootNode)[0];
        return initClearAction(), initActivityToggleActions(), initDrawerToggleAction(), 
        initDrawerCloseAction(), callback(null, that), that;
    };
});