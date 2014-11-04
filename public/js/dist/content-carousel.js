define([ "require", "exports", "module", "jquery", "stamen-super-classy" ], function(require, exports, module) {
    "use strict";
    var StamenSuperClassy = require("stamen-super-classy");
    module.exports = function(rootSelector, options) {
        var animationInterval, that = this;
        StamenSuperClassy.apply(this, arguments), options = options || {};
        var coverPhotos, rootElement = document.querySelector(rootSelector), optionsInternal = {};
        return rootElement.style.overflow = "auto", optionsInternal.slideClass = options.slideClass || "carousel-slide", 
        coverPhotos = $(rootSelector + " ." + optionsInternal.slideClass), rootSelector && rootElement ? (that.goForward = function() {
            animationInterval && (clearInterval(animationInterval), animationInterval = null);
            var pos, next, start = rootElement.scrollLeft;
            options.snapToSlide ? (coverPhotos = $(rootSelector + " ." + optionsInternal.slideClass), 
            next = Math.round(rootElement.scrollLeft / coverPhotos[0].offsetWidth) + 1, pos = coverPhotos[next] ? coverPhotos[next].offsetLeft : start) : pos = start + rootElement.offsetWidth, 
            $(rootElement).animate({
                scrollLeft: pos
            }, null, null, function() {
                that.fire("forward", {
                    target: rootElement
                });
            });
        }, that.goBackward = function() {
            animationInterval && (clearInterval(animationInterval), animationInterval = null);
            var pos, next, start = rootElement.scrollLeft;
            options.snapToSlide ? (coverPhotos = $(rootSelector + " ." + optionsInternal.slideClass), 
            next = Math.round(rootElement.scrollLeft / coverPhotos[0].offsetWidth) - 1, pos = coverPhotos[next] ? coverPhotos[next].offsetLeft : start) : pos = start - rootElement.offsetWidth, 
            $(rootElement).animate({
                scrollLeft: start - rootElement.offsetWidth
            }, null, null, function() {
                that.fire("backward", {
                    target: rootElement
                });
            });
        }, rootElement.classList.add("stmn-carousel-module"), rootElement.style.overflow = "hidden", 
        rootElement.style.overflowX = "scroll", rootElement.style.position = "relative", 
        that) : !1;
    };
});