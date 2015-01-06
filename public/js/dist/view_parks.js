define([ "require", "exports", "module", "block-activity-filter", "block-search-box", "slippymap", "stamen-super-classy", "routes", "content-fetcher", "../../js/helpers/paginationLast.js", "../../js/helpers/paginationNext.js", "../../js/helpers/formatActivityList.js" ], function(require, exports, module, BlockActivityFilter, BlockSearchBox, Slippymap, StamenSuperClassy, Routes, ContentFetcher) {
    "use strict";
    function View(options) {
        function lock() {
            state.locked = !0, that.utils.get("#content .search-state").innerHTML = "Finding parks...";
        }
        function unLock() {
            state.locked = !1;
        }
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
            }), that.utils.get(".search-this-area-action", mapTabNode)[0].addEventListener("click", function(e) {
                e.target.classList.add("wait"), setTimeout(function() {
                    lock();
                    var newSearchState = JSON.parse(JSON.stringify(searchState));
                    newSearchState.near && delete newSearchState.near, newSearchState.bbox = that.slippyMap.getBounds().join(","), 
                    newSearchState.startat = 0, newSearchState.perpage = 30, that.once("route", function() {
                        e.target.classList.remove("wait");
                    }), loadParks(newSearchState);
                }, 500);
            }, that), that.on("route", function(e) {
                that.slippyMap.pinLayer.updateData(e.caller.parksGeoJSON);
            });
        }
        function targetIsSearchResult(eventResponse) {
            return that.utils.parentHasClass(eventResponse.target, "search-result");
        }
        function getParkById(id) {
            for (var i = 0; options.parks.features.length > i; i++) if ((0 | options.parks.features[i].properties.superunit_id) === (0 | id)) return options.parks.features[i];
            return !1;
        }
        function scrollToParkInList(parkId) {
            for (var listItem, listItems = that.utils.get(".search-result", resultsNode), i = 0; listItems.length > i; i++) if (listItems[i] && listItems[i].getAttribute("data-id") === parkId.toString()) {
                listItem = listItems[i];
                break;
            }
            listItem && (listItem.parentNode.scrollTop = listItem.offsetTop);
        }
        function selectPark(id) {
            if ((!selectedPark || (0 | selectedPark.properties.superunit_id) !== (0 | id)) && id) {
                var park = getParkById(id), listItemNode = that.utils.get(".search-results .result-" + id)[0], isInBounds = park.geometry ? that.slippyMap.map.getBounds().contains(new google.maps.LatLng(parseFloat(park.geometry.coordinates[1]), parseFloat(park.geometry.coordinates[0]))) : null;
                selectedPark = park, listItemNode && listItemNode.classList.add("selected"), that.slippyMap.pinLayer.setMarkersAsSelected([ id ]), 
                !isInBounds && park.geometry && that.slippyMap.setCenter(park.geometry), that.fire("park-selected", {
                    newPark: park
                });
            }
        }
        function initInfoWindow() {
            infowindow = new google.maps.InfoWindow({
                maxWidth: 400,
                minHeight: 400
            }), infoWindowData = new ContentFetcher("#gmap-info-window", "block-park-name"), 
            that.on("tab-toggle", function() {
                infowindow.close();
            });
        }
        function initPark() {
            resultsNode = that.utils.get("#content .search-results")[0], that.slippyMap.on("marker-click", function(e) {
                that.slippyMap.pinLayer.clearMarkerSelections(), scrollToParkInList(e.caller.marker.feature.properties.superunit_id), 
                selectPark(e.caller.marker.feature.properties.superunit_id, {
                    center: !1
                });
            }), that.slippyMap.on("select-markers", function(e) {
                e.caller && e.caller.selectedMarkers[0] && (infowindow.open(that.slippyMap.map, e.caller.selectedMarkers[0].pin), 
                infowindow.setContent(infoWindowData.compileTemplate(e.caller.selectedMarkers[0].feature.properties)), 
                that.utils.get(".gm-style-iw")[0].parentNode.classList.add("park-info-window"));
            }), resultsNode.addEventListener("mouseover", function(e) {
                state.hoverActionPause = setTimeout(that.utils.debounce(function() {
                    if (state.hoverActionPause) {
                        var resultNode = targetIsSearchResult(e);
                        resultNode && (that.slippyMap.pinLayer.clearMarkerSelections(), selectPark(resultNode.getAttribute("data-id"))), 
                        state.hoverActionPause = null;
                    }
                }, 400), 400);
            }, !0), resultsNode.addEventListener("mouseout", function() {
                clearTimeout(state.hoverActionPause), state.hoverActionPause = null;
            }, !0);
        }
        function initParks() {
            var direction, perpage, startat, href, parksData;
            history && history.pushState && resultsNode.addEventListener("click", function(e) {
                e.target && e.target.getAttribute("data-pagination") && (e.preventDefault(), state.locked || (e.target.classList.add("wait"), 
                direction = e.target.getAttribute("data-pagination"), href = e.target.getAttribute("href"), 
                perpage = 0 | (href.match(/perpage=(\d+[0-10000])/) || [])[1], startat = 0 | (href.match(/startat=(\d+[0-10000])/) || [])[1], 
                setTimeout(function() {
                    loadParks({
                        perpage: perpage,
                        startat: startat
                    });
                }, 50)));
                var link, searchResult = that.utils.parentHasClass(e.target, "search-result");
                !e.target.classList.contains("action") && searchResult && (e.preventDefault(), link = that.utils.get(".park-name a", searchResult)[0], 
                link && (location.href = link.href));
            }, !1), parksData = new ContentFetcher("#content .search-results", "parks-results"), 
            that.on("route", function(e) {
                resultsNode.innerHTML = parksData.compileTemplate(e.caller), resultsNode.scrollTop = 0;
                var container = document.getElementById("content"), tabs = document.getElementById("tab-container"), filterDrawer = that.utils.get("ul.filter-drawer", container)[0], filterHandle = that.utils.get(".filter-handle", container)[0], filterButtons = that.utils.get("li button", filterDrawer), nots = "";
                if (e.caller.query) if (e.caller.query.with && e.caller.query.with.length) {
                    container.classList.add("filtered"), filterDrawer.classList.remove("has"), filterHandle.classList.add("has");
                    for (var i = 0; filterButtons.length > i; i++) filterButtons[i].classList.contains("selected") || (nots += " not-" + filterButtons[i].getAttribute("data-filter").split(" ").join("_"));
                    tabs.className = "", nots.length ? tabs.className = nots : container.classList.remove("filtered");
                } else container.classList.remove("filtered"), filterDrawer.classList.add("has"), 
                filterHandle.classList.remove("has");
            });
        }
        function initRoutes() {
            that.on("route", function(e) {
                history && history.pushState && history.pushState({}, null, "/parks/search" + routes.stringifyUrlSearchParams(e.caller.query));
            });
        }
        function initSinlepageFiltering() {
            blocks.blockActivityFilter && blocks.blockActivityFilter.on("filter-select", function(e) {
                history && history.pushState ? (e.caller.element.classList.add("wait"), blocks.blockActivityFilter.lock(), 
                that.once("route", function() {
                    e.caller.element.classList.remove("wait"), blocks.blockActivityFilter.unLock();
                }), setTimeout(function() {
                    loadParks({
                        "with": e.caller.params.with,
                        startat: 0,
                        perpage: 30
                    });
                }, 50)) : location.href = "/parks/search" + routes.stringifyUrlSearchParams(e.caller.params);
            });
        }
        function initSearchStatus() {
            searchStateView = new ContentFetcher("#content .search-state", "search-state"), 
            that.on("route", function(e) {
                history && history.pushState && (that.utils.get("#content .search-state")[0].innerHTML = searchStateView.compileTemplate(e.caller));
            });
        }
        function decode(obj) {
            return "object" == typeof obj ? Object.keys(obj).reduce(function(prev, curr) {
                return prev[curr] = decode(obj[curr]), prev;
            }, {}) : "string" == typeof obj ? decodeURIComponent(obj.replace(/\+/, "%20")) : obj;
        }
        function loadParks(stateChanges, callback) {
            for (var urlState = routes.getParamStateFromLocationObject(), keys = Object.keys(stateChanges), i = 0; keys.length > i; i++) urlState[keys[i]] = stateChanges[keys[i]];
            lock(), that.utils.request("/parks/search.geojson" + routes.stringifyUrlSearchParams(urlState), function(err, r) {
                unLock();
                var responseObject;
                if (err) return that.fire("error", err);
                try {
                    responseObject = JSON.parse(r.responseText);
                } catch (err) {
                    return that.fire("error", err);
                }
                if ("ok" === responseObject.status) {
                    var values = responseObject.response.properties || {};
                    return values.parks = responseObject.response.features.map(function(feature) {
                        return feature.properties;
                    }), values.place = responseObject.response.properties.place, values.total = responseObject.response.features.length, 
                    values.parksGeoJSON = responseObject.response, values.query = decode(urlState), 
                    callback && callback(), that.fire("route", values);
                }
                return that.fire("error", {
                    message: "Response body not okay",
                    response: responseObject
                });
            });
        }
        function initTabControl() {
            var rootNode = that.utils.get(".tab-actions")[0];
            "#tab-map" === location.hash && bodyNode.classList.toggle("tab-map"), rootNode.addEventListener("click", function() {
                bodyNode.classList.toggle("tab-map"), bodyNode.classList.contains("tab-map") ? (that.slippyMap.resize(), 
                location.hash = "#tab-map", that.fire("tab-toggle", {
                    view: "map"
                })) : ("#tab-map" === location.hash && (location.hash = ""), that.fire("tab-toggle", {
                    view: "list"
                }));
            }, !1);
        }
        function init() {
            initMap(), initTabControl(), initPark(), initParks(), initInfoWindow(), initSinlepageFiltering(), 
            initRoutes(), initSearchStatus(), that.on("error", function(e) {
                console.log("error", e);
            });
        }
        var bodyNode, cleanBounds, mapTabNode, resultsNode, selectedPark, infowindow, infoWindowData, searchStateView, that = this, state = {};
        StamenSuperClassy.apply(that, arguments), bodyNode = that.utils.get("body")[0], 
        init();
    }
    var routes = new Routes(), searchState = routes.getParamStateFromLocationObject(), blocks = {};
    blocks.blockSearchBox = new BlockSearchBox(".block-search-box", {}, function() {}), 
    blocks.blockSearchBox.utils.get(".block-activity-filter")[0] && (blocks.blockActivityFilter = new BlockActivityFilter(".block-activity-filter", {}, function() {})), 
    module.exports = new View({
        geojsonURI: "/parks/search.geojson" + routes.stringifyUrlSearchParams(searchState),
        bounds: viewData.bounds,
        parks: viewData.parks
    });
});