//
// Custom map tile layer for Google Maps V3
//
// Created by Stamen Design in 2014
//
define(["require","exports","module","stamen-super-classy"], function(
  require,
  exports,
  module,
  StamenSuperClassy
) {

  "use strict";

  module.exports=function(config) {

    var that       = this,
        subdomains = ["a","b","c","d"],
        tileConf;

    StamenSuperClassy.apply(that, arguments);

    //
    // Chooses a subdomain based off of x/y coords
    // Lifted from https://github.com/Leaflet/Leaflet
    //
    function getSubdomain (tilePoint) {
      var index = Math.abs(tilePoint.x + tilePoint.y) % subdomains.length;
      return subdomains[index];
    }

    function getTile(coord, zoom, ownerDocument) {

      tileConf = {
        s : getSubdomain(coord),
        z : zoom,
        x : coord.x,
        y : coord.y
      };

      for (var i in config) {
        if (config.hasOwnProperty(i)) {
          tileConf[i] = config[i];
        }
      }

      var div = ownerDocument.createElement("DIV");
      var baseURL = that.processTemplate(config.tilePath, tileConf);
      div.style.width           = config.size + "px";
      div.style.height          = config.size + "px";
      div.style.backgroundColor = "white";
      div.style.backgroundImage = "url(" + baseURL + ")";
      div.style.backgroundSize  = "cover";
      return div;
    }

    config.name     = "Stamen Parks Map";
    config.tileSize = new google.maps.Size(config.size,config.size);
    config.getTile  = getTile;
    config.maxZoom  = config.maxZoom || 18;

    return config;

  };

});
