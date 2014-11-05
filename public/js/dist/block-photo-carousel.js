define([ "require", "exports", "module", "handlebars", "jquery", "content-carousel", "stamen-super-classy" ], function(require, exports, module, Handlebars) {
    var StamenSuperClassy = require("stamen-super-classy"), ContentCarousel = require("content-carousel");
    module.exports = function(rootSelector) {
        function fetchPhotos() {
            activeFetchRequest || stopFetching || (activeFetchRequest = !0, $.getJSON(location.href + "/flickr.json?startat=" + fetchStartat + "&limit=" + fetchLimit, function(data) {
                "ok" === data.status && data.response.flickr.total ? (data.response.flickr.total < fetchLimit && (stopFetching = !0), 
                fetchStartat += data.response.flickr.total, data.response.flickr.items.forEach(function(photo) {
                    $(slideContainerNode).append(Handlebars.compile(photoTemplate)(photo));
                })) : stopFetching = !0, activeFetchRequest = !1;
            }));
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
            }), $.ajax("/js/partials/flickr_coverphoto.handlebars", {
                success: function(template) {
                    photoTemplate = template;
                }
            });
        }
        var that = this, backButtonSelector = ".carousel-back-button", forwardButtonSelector = ".carousel-forward-button", stopFetching = !1, activeFetchRequest = !1, fetchStartat = 20, fetchLimit = 50, photoTemplate = null;
        StamenSuperClassy.apply(this, arguments);
        var rootNode = that.get(rootSelector)[0], backButtonNode = that.get(backButtonSelector, rootNode)[0], forwardButtonNode = that.get(forwardButtonSelector, rootNode)[0], slideContainerNode = that.get(".slide-container", rootNode)[0];
        return rootNode ? (init(), that) : null;
    };
});