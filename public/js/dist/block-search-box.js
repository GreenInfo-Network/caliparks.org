define([ "require", "exports", "module", "vendor/typeahead", "vendor/bloodhound", "jquery", "stamen-super-classy", "routes" ], function(require, exports, module, typeahead, bloodhound, jquery, StamenSuperClassy, Routes) {
    "use strict";
    var rootNode, locateMeNode, that, old, formNode, searchFieldNode, state = {}, data = {};
    module.exports = function(rootSelector, config, callback) {
        function updateData(key, path, callback) {
            old = data[key], $.getJSON(path, function(json) {
                data[key] = json, that.fire("dataUpdated", {
                    old: old,
                    "new": data[key]
                }), callback && callback(null, json);
            });
        }
        function setLocateMeLoadingState(show) {
            show ? (locateMeNode.addClass("pulse"), locateMeNode.find("path").css({
                fill: "blue"
            })) : (locateMeNode.removeClass("pulse"), locateMeNode.find("path").css({
                fill: "inherit"
            })), that.fire("loading", {
                show: show
            });
        }
        function initLocateMe() {
            locateMeNode.get()[0].addEventListener("click", function() {
                navigator.geolocation ? (setLocateMeLoadingState(!0), navigator.geolocation.getCurrentPosition(function(r) {
                    r.coords && (setLocateMeLoadingState(!1), location.href = searchFieldNode.val().length ? "/parks/search/?q" + searchFieldNode.val() + "&near=" + parseFloat(r.coords.latitude).toFixed(4) + "," + parseFloat(r.coords.longitude).toFixed(4) : "/parks/near/" + parseFloat(r.coords.latitude).toFixed(4) + "," + parseFloat(r.coords.longitude).toFixed(4));
                }, function() {
                    setLocateMeLoadingState(!1);
                })) : location.href = "/parks/near";
            });
        }
        function paramaterizeObject(obj) {
            return JSON.stringify(obj).split("{").join("").split("}").join("").split(":").join("=").split(",").join("&").split('"').join("").split(" ").join("+");
        }
        function initForm() {
            formNode.bind("submit", function(e) {
                e.preventDefault(), state.searchType.q || state.searchType.near || state.searchType.with ? location.href = "/parks/search?" + paramaterizeObject(state.searchType) : (searchFieldNode.val().length || searchFieldNode.val("San Francisco"), 
                location.href = "/parks/near/" + searchFieldNode.val().replace(/\s/g, "+"));
            }), searchFieldNode.bind("keyup", function(e) {
                13 !== e.keyCode && 13 !== e.which && 39 !== e.keyCode && 39 !== e.which ? e.preventDefault() : (13 === e.keyCode || 13 === e.which) && e.preventDefault();
            }), searchFieldNode.bind("typeahead:selected", function(e, choice, category) {
                "places" === category ? state.searchType = {
                    near: choice.value
                } : "activities" === category && (state.searchType = {
                    "with": choice.value
                });
            });
        }
        function initialize() {
            that.on("ready", function() {
                callback(null, that);
            }), searchFieldNode.attr("value", decodeURI(location.href.split("/near/")[1] || "").replace(/\+/g, " ")), 
            state.searchType = {}, initLocateMe(), initForm(), updateData("activities", "/data/uniqueActivities.json", function() {
                updateData("places", "/data/californiaCities.json", function() {
                    that.fire("ready");
                });
            });
        }
        that = this, StamenSuperClassy.apply(this, arguments);
        new Routes();
        return rootNode = $(rootSelector), locateMeNode = rootNode.find(".locate-me"), formNode = rootNode.find("form"), 
        searchFieldNode = rootNode.find("input[type=search]"), initialize(), that;
    };
});