define([ "require", "exports", "module", "stamen-super-classy" ], function(require, exports, module, StamenSuperClassy) {
    "use strict";
    var rootNode, locateMeNode, that, formNode, searchFieldNode;
    module.exports = function(rootSelector, config, callback) {
        function setLocateMeLoadingState(show) {
            var pathNode = that.utils.get("path", locateMeNode)[0];
            show ? (locateMeNode.classList.add("pulse"), pathNode.style.fill = "blue") : (locateMeNode.classList.remove("pulse"), 
            pathNode.style.fill = "inherit"), that.fire("loading", {
                show: show
            });
        }
        function initLocateMe() {
            locateMeNode.addEventListener("click", function() {
                navigator.geolocation ? (setLocateMeLoadingState(!0), navigator.geolocation.getCurrentPosition(function(r) {
                    r.coords && (setLocateMeLoadingState(!1), location.href = "/parks/near/" + parseFloat(r.coords.latitude).toFixed(4) + "," + parseFloat(r.coords.longitude).toFixed(4) + "&geocoded=true");
                }, function() {
                    setLocateMeLoadingState(!1);
                })) : location.href = "/parks/near?geocoded=true";
            });
        }
        function initForm() {
            formNode.addEventListener("submit", function(e) {
                e.preventDefault(), searchFieldNode.value.length || searchFieldNode.val("San Francisco"), 
                location.href = "/parks/near/" + searchFieldNode.value.replace(/\s/g, "+");
            });
        }
        function initialize() {
            that.on("ready", function() {
                callback(null, that);
            }), initLocateMe(), initForm();
        }
        return that = this, StamenSuperClassy.apply(this, arguments), rootNode = that.utils.get(rootSelector)[0], 
        locateMeNode = that.utils.get(".locate-me", rootNode)[0], formNode = that.utils.get("form", rootNode)[0], 
        searchFieldNode = that.utils.get("input[type=search]", rootNode)[0], initialize(), 
        that;
    };
});