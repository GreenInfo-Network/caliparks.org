define([ "require", "exports", "module" ], function(require, exports, module) {
    "use strict";
    module.exports = function() {
        return this.getMobileOperatingSystem = function() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i) ? "iOS" : userAgent.match(/Android/i) ? "Android" : "unknown";
        }, this;
    };
});