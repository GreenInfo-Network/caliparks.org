define([ "require", "exports", "module", "block-activity-filter", "block-search-box", "slippymap", "stamen-super-classy", "routes", "content-fetcher", "../../js/helpers/paginationLast.js", "../../js/helpers/paginationNext.js" ], function(require, exports, module, BlockActivityFilter, BlockSearchBox, Slippymap, StamenSuperClassy, Routes, ContentFetcher) {
    "use strict";
    function View(options) {
        function initMap() {
            mapTabNode = that.utils.get(".map-tab-pane")[0], that.slippyMap = new Slippymap(".slippymap", {
                data: options.parks,
                contextBounds: options.bounds.length ? options.bounds : viewData.parks.bbox
            }, function(err, slippyMap) {
                that.slippyMap = slippyMap, that.fire("map-initialized");
            }), that.slippyMap.once("idle", function() {
                cleanBounds = that.slippyMap.map.getBounds(), mapTabNode.classList.remove("slippy-map-bounds-dirty");
            }), that.slippyMap.on("bounds-changed", function() {
                cleanBounds && !cleanBounds.equals(that.slippyMap.map.getBounds()) && mapTabNode.classList.add("slippy-map-bounds-dirty");
            }), that.utils.get(".search-this-area-action", mapTabNode)[0].addEventListener("click", function() {
                var newSearchState = JSON.parse(JSON.stringify(searchState));
                newSearchState.near && delete newSearchState.near, newSearchState.bbox = that.slippyMap.getBounds().join(","), 
                location.href = "/parks/search" + routes.stringifyUrlSearchParams(newSearchState);
            }, that), that.on("paginate", function(e) {
                that.slippyMap.pinLayer.updateData(e.caller.response);
            });
        }
        function targetIsSearchResult(eventResponse) {
            return that.utils.parentHasClass(eventResponse.target, "search-result");
        }
        function getParkById(id) {
            for (var i = 0; options.parks.features.length > i; i++) if ((0 | options.parks.features[i].properties.superunit_id) === (0 | id)) return options.parks.features[i];
            return !1;
        }
        function selectPark(id) {
            if (!selectedPark || (0 | selectedPark.properties.superunit_id) !== (0 | id)) {
                var park = getParkById(id), listItemNode = that.utils.get(".search-results .result-" + id)[0], isInBounds = that.slippyMap.map.getBounds().contains(new google.maps.LatLng(parseFloat(park.geometry.coordinates[1]), parseFloat(park.geometry.coordinates[0])));
                selectedPark = park, listItemNode.classList.add("selected"), that.slippyMap.pinLayer.setMarkersAsSelected([ id ]), 
                isInBounds || that.slippyMap.setCenter(park.geometry), that.fire("park-selected", {
                    newPark: park
                });
            }
        }
        function initInfoWindow() {
            infowindow = new google.maps.InfoWindow({
                maxWidth: 400,
                minHeight: 400
            }), infoWindowData = new ContentFetcher("#gmap-info-window", "block-park-name");
        }
        function initPark() {
            resultsNode = that.utils.get("#content .search-results")[0], that.slippyMap.on("marker-click", function(e) {
                that.slippyMap.pinLayer.clearMarkerSelections(), selectPark(e.caller.marker.feature.properties.superunit_id, {
                    center: !1
                });
            }), that.slippyMap.on("select-markers", function(e) {
                infowindow.open(that.slippyMap.map, e.caller.selectedMarkers[0].pin), infowindow.setContent(infoWindowData.compileTemplate(e.caller.selectedMarkers[0].feature.properties));
            }), resultsNode.addEventListener("mouseover", that.utils.debounce(function(e) {
                var resultNode = targetIsSearchResult(e);
                resultNode && (that.slippyMap.pinLayer.clearMarkerSelections(), selectPark(resultNode.getAttribute("data-id")));
            }, 200), !0);
        }
        function initParks() {
            var direction, perpage, startat, href, parksData;
            resultsNode.addEventListener("click", function(e) {
                e.target && e.target.getAttribute("data-pagination") && (e.preventDefault(), direction = e.target.getAttribute("data-pagination"), 
                href = e.target.getAttribute("href"), perpage = 0 | (href.match(/perpage=(\d+[0-10000])/) || [])[1], 
                startat = 0 | (href.match(/startat=(\d+[0-10000])/) || [])[1], history && history.pushState && history.pushState({}, null, href), 
                loadParks({
                    perpage: perpage,
                    startat: startat
                }));
            }, !1), parksData = new ContentFetcher("#content .search-results", "parks-results"), 
            that.on("paginate", function(e) {
                resultsNode.innerHTML = parksData.compileTemplate({
                    parks: e.caller.response.features.map(function(feature) {
                        return feature.properties;
                    })
                });
            });
        }
        function loadParks(stateChanges) {
            for (var urlState = routes.getParamStateFromLocationObject(), keys = Object.keys(stateChanges), i = 0; keys.length > i; i++) urlState[keys[i]] = stateChanges[keys[i]];
            that.utils.request("/parks/search.geojson" + routes.stringifyUrlSearchParams(urlState), function(err, r) {
                var responseObject;
                if (err) return that.fire("error", err);
                try {
                    responseObject = JSON.parse(r.responseText);
                } catch (err) {
                    return that.fire("error", err);
                }
                return "ok" === responseObject.status ? that.fire("paginate", responseObject) : that.fire("error", {
                    message: "Response body not okay",
                    response: responseObject
                });
            });
        }
        function initTabControl() {
            var rootNode = that.utils.get(".tab-actions")[0];
            "#tab-map" === location.hash && bodyNode.classList.toggle("tab-map"), rootNode.addEventListener("click", function() {
                bodyNode.classList.toggle("tab-map"), bodyNode.classList.contains("tab-map") ? (that.slippyMap.resize(), 
                location.hash = "#tab-map") : "#tab-map" === location.hash && (location.hash = "");
            }, !1);
        }
        function init() {
            initMap(), initTabControl(), initPark(), initParks(), initInfoWindow(), that.on("error", function(e) {
                console.log("error", e);
            });
        }
        var bodyNode, cleanBounds, mapTabNode, resultsNode, selectedPark, infowindow, infoWindowData, that = this;
        StamenSuperClassy.apply(that, arguments), bodyNode = that.utils.get("body")[0], 
        init();
    }
    var routes = new Routes(), searchState = routes.getParamStateFromLocationObject(), blocks = {};
    blocks.blockSearchBox = new BlockSearchBox(".block-search-box", {}, function() {}), 
    blocks.blockActivityFilter = new BlockActivityFilter(".block-activity-filter", {}, function() {}), 
    module.exports = new View({
        geojsonURI: "/parks/search.geojson" + routes.stringifyUrlSearchParams(searchState),
        bounds: viewData.bounds,
        parks: viewData.parks
    });
});