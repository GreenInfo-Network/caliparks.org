define(["require","exports","module","stamen-super-classy"], function(
  require,
  exports,
  module,
  StamenSuperClassy
) {

  "use strict";

  module.exports = function BlockStoriesFlexy(rootSelector, viewData, callback) {

    var that = this, stories, story, link;

    StamenSuperClassy.apply(that, arguments);

    stories = that.utils.get(rootSelector)[0];

    stories.addEventListener("click", function(e){

      e.preventDefault();

      story = that.utils.parentHasClass(e.target, "block-story"),
      link  = that.utils.get(".main-link", story)[0];

      if (story && link) {
        e.target.classList.add("wait");

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            location.href = link.getAttribute("href") + "?near=" + position.coords.latitude + "," + position.coords.longitude;
          }, function() {
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
