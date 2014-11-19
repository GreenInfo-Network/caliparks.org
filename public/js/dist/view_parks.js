define([ "require", "exports", "module", "jquery", "stamen-super-classy" ], function(require, exports, module, jquery, StamenSuperClassy) {
    "use strict";
    function ActivityFilterDrawer(rootSelector) {
        function objectifyUrlSearchParams(locationSearchString) {
            return locationSearchString.length ? JSON.parse(locationSearchString.substring(1).replace(/^/, '{"').replace(/$/, '"}').replace(/&/g, '","').replace(/=/g, '":"')) : {};
        }
        function stringifyUrlSearchParams(paramsObject) {
            var stringOut = "?";
            for (var i in paramsObject) paramsObject.hasOwnProperty(i) && (stringOut += i + "=" + paramsObject[i] + "&");
            return stringOut.substring(0, stringOut.length - 1);
        }
        function initClearAction() {
            clearActionNode && clearActionNode.addEventListener("click", function(e) {
                e.preventDefault(), searchParams = objectifyUrlSearchParams(location.search), delete searchParams.with, 
                updateUrl(searchParams);
            }, !1);
        }
        function initActivityToggleActions() {
            filterDrawerNode.addEventListener("click", function(e) {
                e.preventDefault(), searchParams = objectifyUrlSearchParams(location.search), withArray = searchParams.with ? searchParams.with.split(",") : [];
                var filter = e.target.getAttribute("data-filter") || e.target.parentNode.getAttribute("data-filter") || e.target.parentNode.parentNode.getAttribute("data-filter"), index = withArray.indexOf(encodeURI(filter));
                index > -1 ? (withArray.splice(index), searchParams["with"] = withArray.join(",")) : (withArray.push(filter), 
                searchParams["with"] = withArray.join(",")), updateUrl(searchParams);
            }, !1), searchParams = objectifyUrlSearchParams(location.search), withArray = searchParams.with ? searchParams.with.split(",") : [], 
            toggleDrawerStatusNode.innerHTML = withArray.length ? withArray.length : "";
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
        function updateUrl() {
            searchParams["with"] || "with" !== location.href.split("/")[4] ? (searchParams["with"] || delete searchParams["with"], 
            location.search = stringifyUrlSearchParams(searchParams)) : location.href = "/parks/search" + (location.hash || "") + stringifyUrlSearchParams(searchParams);
        }
        var that = this;
        StamenSuperClassy.apply(that, arguments);
        var searchParams, withArray, rootNode = that.utils.get(rootSelector)[0], clearActionNode = that.utils.get(".clear-activities-action", rootNode)[0], filterDrawerNode = that.utils.get(".filter-drawer", rootNode)[0], toggleDrawerActionNode = that.utils.get(".toggle-activities-drawer-action", rootNode)[0], toggleDrawerStatusNode = that.utils.get(".status", toggleDrawerActionNode)[0], closeDrawerActionNode = that.utils.get(".close-drawer-action", rootNode)[0];
        return initClearAction(), initActivityToggleActions(), initDrawerToggleAction(), 
        initDrawerCloseAction(), that;
    }
    new ActivityFilterDrawer("#activity-filter-area");
});