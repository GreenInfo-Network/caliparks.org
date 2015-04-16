define(["require","exports","module","jquery","stamen-super-classy"], function(
  require,
  exports,
  module,
  jquery,
  StamenSuperClassy
) {

  "use strict";

  return function FacebookFixer() {
    var that = this;

    StamenSuperClassy.apply(that, arguments);

    require(["attrchange"],function() {
      $(".fb-like iframe").attrchange({
        callback : function(e) {

          if (e.attributeName === "style") {
            if (e.target.offsetHeight > 25) { //Window
              that.fire("facebook-frame-change", {
                state : "open"
              });
            } else { //button
              that.fire("facebook-frame-change", {
                state : "closed"
              });
            }
          }
        }
      });
    });

    return that;
  };

});
