define(["require","exports","module","vendor/typeahead","vendor/jquery/jquery-1.10.2","stamen-super-classy"], function(require,exports, module) {

  'use strict';

  var StamenSuperClassy = require("stamen-super-classy");

  var state = {},
      rootNode, locateMeNode;

  module.exports=function(rootSelector, config, callback) {

    StamenSuperClassy.apply(this, arguments);

    rootNode     = $(rootSelector);
    locateMeNode = rootNode.find('.locate-me');

    //
    // Methods for the locate me button. This will use the browsers
    // location API to get the users lat/long when pressed
    //

    function setLocateMeLoadingState(show) {
      if (show) {
        locateMeNode.addClass('pulse');
        locateMeNode.find('path').css({'fill':'blue'});
      } else {
        locateMeNode.removeClass('pulse');
        locateMeNode.find('path').css({'fill':'inherit'});
      }
    }

    function initLocateMe() {

      locateMeNode.click(function(e) {

        e.preventDefault();

        if (navigator.geolocation) {
          setLocateMeLoadingState(true);
          navigator.geolocation.getCurrentPosition(function(r) {
            if (r.coords) {
              setLocateMeLoadingState(false);
              location.href = '/parks/near/' + parseFloat(r.coords.latitude).toFixed(4) + ',' + parseFloat(r.coords.longitude).toFixed(4);
            }
          }, function() {setLocateMeLoadingState(false);});
        } else {
          location.href = '/parks/near';
        }

      });
    }

    initLocateMe();

    this.on('ready', function() {
      callback(null, this);
    });

    return this;

  };

});
