define([ "require", "exports", "module", "jquery", "content-carousel", "stamen-super-classy", "content-fetcher" ], function(require, exports, module, jquery, ContentCarousel, StamenSuperClassy, ContentFetcher) {
    "use strict";
    module.exports = function(rootSelector) {
        function fetchPhotos() {
            contentFetcher.fetch();
        }
        function init() {
            var carouselSliderSelector = rootSelector + " .slide-container";
            that.carouselInstance = new ContentCarousel(rootSelector + " .slide-container", {
                slideClass: "coverphoto",
                snapToSlide: !0,
                showLoader: !0
            }), backButtonNode.addEventListener("click", function() {
                that.carouselInstance.goBackward();
            }, !1), forwardButtonNode.addEventListener("click", function() {
                that.carouselInstance.goForward();
            }, !1), $(carouselSliderSelector).on("scroll", function(e) {
                e.target.scrollWidth - e.target.scrollLeft < 4 * e.target.offsetWidth && fetchPhotos();
            }), that.carouselInstance.on("forward", function(e) {
                e.caller.target.scrollLeft > e.caller.target.scrollWidth - (e.caller.target.offsetWidth + e.caller.target.offsetWidth / 2) ? rootNode.parentNode.parentNode.classList.add("scrolled-furthest") : rootNode.parentNode.parentNode.classList.remove("scrolled-furthest"), 
                e.caller.target.scrollLeft < e.caller.target.offsetWidth / 2 ? rootNode.parentNode.parentNode.classList.add("not-scrolled") : rootNode.parentNode.parentNode.classList.remove("not-scrolled");
            }), that.carouselInstance.on("backward", function(e) {
                e.caller.target.scrollLeft > e.caller.target.scrollWidth - (e.caller.target.offsetWidth + e.caller.target.offsetWidth / 2) ? rootNode.parentNode.parentNode.classList.add("scrolled-furthest") : rootNode.parentNode.parentNode.classList.remove("scrolled-furthest"), 
                e.caller.target.scrollLeft < e.caller.target.offsetWidth / 2 ? rootNode.parentNode.parentNode.classList.add("not-scrolled") : rootNode.parentNode.parentNode.classList.remove("not-scrolled");
            }), contentFetcher = new ContentFetcher(slideContainerNode, "flickr_coverphoto", location.href + "/flickr.json", "response.flickr.items", {
                startat: 20,
                incrementArg: "startat",
                srcArguments: {
                    startat: 20,
                    limit: 20
                }
            });
        }
        var contentFetcher, that = this, backButtonSelector = ".carousel-back-button", forwardButtonSelector = ".carousel-forward-button";
        StamenSuperClassy.apply(this, arguments);
        var rootNode = that.utils.get(rootSelector)[0], backButtonNode = that.utils.get(backButtonSelector, rootNode)[0], forwardButtonNode = that.utils.get(forwardButtonSelector, rootNode)[0], slideContainerNode = that.utils.get(".slide-container", rootNode)[0];
        return rootNode ? (init(), that) : null;
    };
});