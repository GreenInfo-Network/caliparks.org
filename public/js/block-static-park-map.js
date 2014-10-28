define(["require","exports","module","stamen-super-classy","gmaps","gmap-custom-tile-layer"], function(require,exports, module) {

  'use strict';

  var StamenSuperClassy = require("stamen-super-classy");

  var state             = {},
      data              = {};

  module.exports=function(rootSelector, options, callback) {

    var that = this;

    StamenSuperClassy.apply(that, arguments);

    function initBigMap() {
      
    }

    //
    // Init function
    //
    function initialize() {
      that.on('ready', function() {
        callback(null, that);
      });
    }

    //
    // GO GO GO!
    //
    initialize();

    return that;

  };

});
