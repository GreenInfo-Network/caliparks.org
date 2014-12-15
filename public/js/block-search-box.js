define(["require","exports","module","stamen-super-classy"], function(
  require,
  exports,
  module,
  StamenSuperClassy
) {

  "use strict";

  var state             = {},
      data              = {},
      rootNode, locateMeNode, that, old, formNode, searchFieldNode;

  module.exports=function(rootSelector, config, callback) {

    that = this;

    StamenSuperClassy.apply(this, arguments);

    rootNode            = that.utils.get(rootSelector)[0];
    locateMeNode        = that.utils.get(".locate-me", rootNode)[0];
    formNode            = that.utils.get("form", rootNode)[0];
    searchFieldNode     = that.utils.get("input[type=search]", rootNode)[0];

    //
    // Methods for the locate me button. This will use the browsers
    // location API to get the users lat/long when pressed
    //

    function setLocateMeLoadingState(show) {
      var pathNode = that.utils.get("path", locateMeNode)[0];
      if (show) {
        locateMeNode.classList.add("pulse");
        pathNode.style.fill="blue";
      } else {
        locateMeNode.classList.remove("pulse");
        pathNode.style.fill="inherit";
      }
      that.fire("loading", {show:show});
    }

    function initLocateMe() {

      locateMeNode.addEventListener("click", function() {
        if (navigator.geolocation) {
          setLocateMeLoadingState(true);
          navigator.geolocation.getCurrentPosition(function(r) {
            if (r.coords) {
              setLocateMeLoadingState(false);
              location.href = "/parks/near/" + parseFloat(r.coords.latitude).toFixed(4) + "," + parseFloat(r.coords.longitude).toFixed(4);
            }
          }, function() {setLocateMeLoadingState(false);});
        } else {
          location.href = "/parks/near";
        }
      });
    }

    //
    // Methods for managing the form element
    //

    function paramaterizeObject(obj) {
      return JSON.stringify(obj).split("{").join("").split("}").join("").split(":").join("=").split(",").join("&").split("\"").join("").split(" ").join("+");
    }

    function initForm() {
      formNode.addEventListener("submit", function(e) {
        e.preventDefault();

        if (!searchFieldNode.value.length) { //Nothing was typed in?
          searchFieldNode.val("San Francisco");
        }

        location.href="/parks/near/" + searchFieldNode.value.replace(/\s/g,"+");

      });

    }

    //
    // Init function
    //
    function initialize() {
      that.on("ready", function() {
        callback(null, that);
      });

      //
      // Initialize thie whole thing
      //
      initLocateMe();
      initForm();
    }

    //
    // GO GO GO!
    //
    initialize();

    return that;

  };

});
