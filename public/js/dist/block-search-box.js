define([ "require", "exports", "module", "vendor/typeahead", "vendor/bloodhound", "jquery", "stamen-super-classy", "routes" ], function(require, exports, module, typeahead, bloodhound, jquery, StamenSuperClassy, Routes) {
    "use strict";
    var rootNode, locateMeNode, that, old, formNode, searchFieldNode, searchParts, defaultSearchString, state = {}, data = {}, bloodHoundSources = {};
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
        function initTypeahead() {
            return bloodHoundSources.activities = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: $.map(data.activities, function(activity) {
                    return {
                        value: activity
                    };
                })
            }), bloodHoundSources.places = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: $.map(data.places, function(city) {
                    return {
                        value: city
                    };
                })
            }), bloodHoundSources.activities.initialize(), bloodHoundSources.places.initialize(), 
            searchFieldNode.typeahead({
                hint: !0,
                highlight: !0,
                minLength: 1
            }, {
                name: "places",
                displayKey: "value",
                source: bloodHoundSources.places.ttAdapter(),
                templates: {
                    header: "<h3>Places</h3>"
                }
            }, {
                name: "activities",
                displayKey: "value",
                source: bloodHoundSources.activities.ttAdapter(),
                templates: {
                    header: "<h3>Activities</h3>"
                }
            });
        }
        function paramaterizeObject(obj) {
            return JSON.stringify(obj).split("{").join("").split("}").join("").split(":").join("=").split(",").join("&").split('"').join("").split(" ").join("+");
        }
        function initForm() {
            formNode.bind("submit", function(e) {
                e.preventDefault(), state.searchType.q || state.searchType.near || state.searchType.with ? location.href = "/parks/search?" + paramaterizeObject(state.searchType) : searchFieldNode.val().indexOf(" near ") > -1 ? (searchParts = searchFieldNode.val().split(" near "), 
                location.href = "/parks/search?with=" + searchParts[0] + "&near=" + searchParts[1]) : searchFieldNode.val().indexOf(" with ") > -1 ? (searchParts = searchFieldNode.val().split(" with "), 
                location.href = "/parks/search?q=" + searchParts[0] + "&with=" + searchParts[1]) : location.href = "/parks/search?q=" + searchFieldNode.val();
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
            }), defaultSearchString && searchFieldNode.attr("value", defaultSearchString), state.searchType = {}, 
            initLocateMe(), initForm(), updateData("activities", "/data/uniqueActivities.json", function() {
                updateData("places", "/data/californiaCities.json", function() {
                    initTypeahead(), that.fire("ready");
                });
            });
        }
        that = this, StamenSuperClassy.apply(this, arguments);
        var routes = new Routes();
        return rootNode = $(rootSelector), locateMeNode = rootNode.find(".locate-me"), formNode = rootNode.find("form"), 
        searchFieldNode = rootNode.find("input[type=search]"), defaultSearchString = routes.getParamStateAsSearchString() || "", 
        initialize(), that;
    };
});