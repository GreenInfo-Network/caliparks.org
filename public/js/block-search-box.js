define(["require","exports","module","vendor/typeahead","vendor/bloodhound","vendor/jquery/jquery-1.10.2","stamen-super-classy"], function(require,exports, module) {

  'use strict';

  var StamenSuperClassy = require("stamen-super-classy");

  var state      = {},
      activities = ["cpadparkname","hipcampparkname","cpadSunma","activityCount","backpacking","biking","boating","caving","fishing","foraging","hiking","horsebackRiding","kayakingCanoeing","kiteboardingWindsurfing","ohv","climbing","snowSports","sup","stargazing","surfing","swimming","whitewaterRaftingKayaking","wildlifeWatching","wineBeerTasting","camping","other"],
      rootNode, locateMeNode, that;

  module.exports=function(rootSelector, config, callback) {

    that = this;

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
      that.fire('loading', {show:show});
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

    //
    // Methods for working with the Typeahead module
    //
    function initTypeahead() {

      var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
          var matches, substrRegex;

          // an array that will be populated with substring matches
          matches = [];

          // regex used to determine if a string contains the substring `q`
          substrRegex = new RegExp(q, 'i');

          // iterate through the pool of strings and for any string that
          // contains the substring `q`, add it to the `matches` array
          $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
              // the typeahead jQuery plugin expects suggestions to a
              // JavaScript object, refer to typeahead docs for more info
              matches.push({ value: str });
            }
          });

          cb(matches);
        };
      };

      rootNode.find('input[type=search]').typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
        width: '100%'
      },
      {
        name: 'states',
        displayKey: 'value',
        source: substringMatcher(activities)
      });

      rootNode.find('input[type=search]').css('width','100%');
    }

    that.on('ready', function() {
      callback(null, that);
    });

    initLocateMe();
    initTypeahead();
    that.fire('ready');

    return that;

  };

});
