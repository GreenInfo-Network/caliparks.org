define(["require","exports","module","block-static-park-map","block-instagram-strip"], function(
  require,
  exports,
  module,
  BlockStaticParkMap,
  BlockInstagramStrip
) {

  "use strict";

  console.log("load");

  var rootElement     = document.querySelector("body"),
      parkNameElement = rootElement.querySelector(".park-name"),
      withArray       = viewData.withList ? viewData.withList.split(",") : null,
      thisIdIndex;

  function replaceParkIdInQueryString(urlString, newId) {
    return urlString.replace(/([?|\&]id=)(\d*)([&|$])/, "$1" + newId + "$3");
  }

  if (withArray) {

    parkNameElement.addEventListener("click", function(e) {

      e.preventDefault();

      if (e.target.tagName === "BUTTON") {

        thisIdIndex = withArray.indexOf(viewData.park_id);

        console.log(viewData.park_id, thisIdIndex, withArray.length);

        if (e.target.className === "embed-back-button") {

          if (thisIdIndex === 0) {
            thisIdIndex = withArray.length-1;
          } else {
            thisIdIndex--;
          }

          location.href = replaceParkIdInQueryString(location.href, withArray[thisIdIndex]);

        } else {

          if (thisIdIndex+1 > withArray.length-1) {
            thisIdIndex = 0;
          } else {
            thisIdIndex++;
          }

          location.href = replaceParkIdInQueryString(location.href, withArray[thisIdIndex]);

        }

      }

    });

  }

  setTimeout(function() {
    new BlockStaticParkMap(".block-static-park-map", viewData, function(err, blockStaticParkMap) {

      blockStaticParkMap.utils.get(".block-static-park-map .big-park-map")[0].style.height="100%";
      google.maps.event.trigger(blockStaticParkMap.bigMap.getCenter(), "resize");
      blockStaticParkMap.bigMap.setCenter(blockStaticParkMap.bigMap.getCenter());

    });

    new BlockInstagramStrip(".block-instagram-strip", viewData, function(err, blockInstagramStrip) {});
  },100);

});
