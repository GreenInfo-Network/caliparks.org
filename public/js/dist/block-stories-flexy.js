define([ "require", "exports", "module", "stamen-super-classy" ], function(require, exports, module, StamenSuperClassy) {
    "use strict";
    module.exports = function(rootSelector, viewData, callback) {
        var stories, story, link, timeout, isWaiting, that = this;
        StamenSuperClassy.apply(that, arguments), stories = that.utils.get(rootSelector)[0], 
        stories.addEventListener("click", function(e) {
            return e.preventDefault(), story = that.utils.parentHasClass(e.target, "block-story"), 
            link = that.utils.get(".main-link", story)[0], e.target.classList.contains("attribution-link") ? location.href = e.target.href : void (story && link && !isWaiting && (e.target.classList.add("wait"), 
            isWaiting = !0, !navigator.geolocation || STMN.ua && "Firefox" === STMN.ua.split(" ")[0] ? location.href = link.getAttribute("href") : (timeout = setTimeout(function() {
                location.href = link.getAttribute("href");
            }, 1e5), navigator.geolocation.getCurrentPosition(function(position) {
                clearTimeout(timeout), location.href = link.getAttribute("href") + "?near=" + position.coords.latitude.toFixed(4) + ", " + position.coords.longitude.toFixed(4);
            }, function() {
                clearTimeout(timeout), location.href = link.getAttribute("href");
            }))));
        }), callback && callback();
    };
});