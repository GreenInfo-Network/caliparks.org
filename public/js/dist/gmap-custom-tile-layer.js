define([ "require", "exports", "module", "stamen-super-classy" ], function(require, exports, module, StamenSuperClassy) {
    "use strict";
    module.exports = function(config) {
        function getSubdomain(tilePoint) {
            var index = Math.abs(tilePoint.x + tilePoint.y) % subdomains.length;
            return subdomains[index];
        }
        function getTile(coord, zoom, ownerDocument) {
            var div = ownerDocument.createElement("DIV"), baseURL = that.processTemplate(config.tilePath, {
                s: getSubdomain(coord),
                z: zoom,
                x: coord.x,
                y: coord.y
            });
            return div.style.width = config.size + "px", div.style.height = config.size + "px", 
            div.style.backgroundColor = "white", div.style.backgroundImage = "url(" + baseURL + ")", 
            div;
        }
        var that = this, subdomains = [ "a", "b", "c", "d" ];
        return StamenSuperClassy.apply(that, arguments), config.name = "Stamen Parks Map", 
        config.tileSize = new google.maps.Size(config.size, config.size), config.getTile = getTile, 
        config.maxZoom = config.maxZoom || 18, config;
    };
});