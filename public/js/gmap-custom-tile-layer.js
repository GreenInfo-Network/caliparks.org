//
// Custom map tile layer for Google Maps V3
//
// Created by Stamen Design in 2014
//
define(["require","exports","module","stamen-super-classy"], function(require,exports, module) {

  'use strict';

  var StamenSuperClassy = require("stamen-super-classy");

  var state             = {},
      data              = {};

  module.exports=function(config) {

    var that = this;

    StamenSuperClassy.apply(that, arguments);

    function getTile(coord, zoom, ownerDocument) {
        var div = ownerDocument.createElement('DIV');
        var baseURL = that.processTemplate(config.tilePath, {
          s : 'a',
          z : zoom,
          x : coord.x,
          y : coord.y
        });
        div.style.width           = config.size + 'px';
        div.style.height          = config.size + 'px';
        div.style.backgroundColor = 'white';
        div.style.backgroundImage = 'url(' + baseURL + ')';
        return div;
    }

    config.name     = "Stamen Parks Map";
    config.tileSize = new google.maps.Size(config.size,config.size);
    config.getTile  = getTile;
    config.maxZoom  = config.maxZoom || 18;

    return config;

  };

});
