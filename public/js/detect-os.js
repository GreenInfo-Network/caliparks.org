//
// Tools for detecting the client OS
//
define(["require","exports","module"], function(require,exports,module) {

  'use strict';

  module.exports=function() {

    var that = this;

    //
    // Determine the mobile operating system.
    // This function either returns 'iOS', 'Android' or 'unknown'
    //
    // @returns {String}
    //
    // Lifted from http://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
    //
    this.getMobileOperatingSystem = function getMobileOperatingSystem() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if ( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) {
        return 'iOS';
      } else if( userAgent.match( /Android/i ) ) {
        return 'Android';
      } else {
        return 'unknown';
      }
    };

    return this;

  };

});
