define([ "require", "exports", "module", "stamen-super-classy", "routes" ], function(require, exports, module, StamenSuperClassy, Routes) {
    "use strict";
    var routes = new Routes();
    module.exports = function(rootSelector, viewData, callback) {
        function initClearAction() {
            clearActionNode && clearActionNode.addEventListener("click", function(e) {
                e.preventDefault(), searchParams = routes.getParamStateFromLocationObject(), delete searchParams.with, 
                routes.updateSearchUrl(searchParams);
            }, !1);
        }
        function initActivityToggleActions() {
            filterDrawerNode.addEventListener("click", function(e) {
                e.preventDefault(), searchParams = routes.getParamStateFromLocationObject(), withArray = searchParams.with ? searchParams.with.toLowerCase().split(",") : [];
                var filter = e.target.getAttribute("data-filter") || e.target.parentNode.getAttribute("data-filter") || e.target.parentNode.parentNode.getAttribute("data-filter"), index = withArray.indexOf(encodeURI(filter).toLowerCase());
                index > -1 ? (withArray.splice(index), searchParams["with"] = withArray.join(",")) : (withArray.push(filter), 
                searchParams["with"] = withArray.join(",")), routes.updateSearchUrl(searchParams);
            }, !1), console.log(rootNode, toggleDrawerActionNode, toggleDrawerStatusNode), toggleDrawerStatusNode && (searchParams = routes.getParamStateFromLocationObject(), 
            withArray = searchParams.with ? searchParams.with.split(",") : [], toggleDrawerStatusNode.innerHTML = withArray.length ? withArray.length : "");
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