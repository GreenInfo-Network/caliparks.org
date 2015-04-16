define(["require","exports","module","stamen-super-classy"], function(
  require,
  exports,
  module,
  StamenSuperClassy
) {

  "use strict";

  module.exports = function BlockStoriesFlexy(rootSelector, viewData, callback) {

    var that = this, stories, story, link, timeout, isWaiting;

    StamenSuperClassy.apply(that, arguments);

    stories = that.utils.get(rootSelector)[0];

    stories.addEventListener("click", function(e){

      e.preventDefault();

      story = that.utils.parentHasClass(e.target, "block-story"),
      link  = that.utils.get(".main-link", story)[0];

      if (e.target.classList.contains("attribution-link")) {
        return location.href = e.target.href;
      }

      if (story && link && !isWaiting) {
        e.target.classList.add("wait");
        isWaiting = true;

        //
        // turning this feature off for firefox until this issue is resolved to a point where
        // firefox behaves closer to webkit and internet explorer
        // https://bugzilla.mozilla.org/show_bug.cgi?id=675533
        //
        if (navigator.geolocation && !(STMN.ua && STMN.ua.split(" ")[0] === "Firefox")) {

          //
          // Set a timeout just in case the user does not see the
          // browser request for location, but make it long
          //
          timeout = setTimeout(function() {
            location.href = link.getAttribute("href");
          }, 100000);

          navigator.geolocation.getCurrentPosition(function(position) { //Success!

            //
            //Clear the timeout and go to the location
            //
            clearTimeout(timeout);
            location.href = link.getAttribute("href") + "?near=" + position.coords.latitude.toFixed(4) + ", " + position.coords.longitude.toFixed(4);

          }, function() { //Fail :-(

            //
            // Clear the timeout and go to the default location
            //
            clearTimeout(timeout);
            location.href = link.getAttribute("href");

          });
        } else {
          location.href = link.getAttribute("href");
        }

      }
    });

    if (callback) {
      callback();
    }

  };

});
