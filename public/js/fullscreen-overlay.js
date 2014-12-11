define(["require","exports","module","handlebars","stamen-super-classy"], function(
  require,
  exports,
  module,
  Handlebars,
  StamenSuperClassy
) {

  "use strict";

 module.exports = function FullscreenOverlay(rootSelector, templatePath, options) {

    var that = this,
        templateCache,
        rootElement, containerElement, drawn;

    options = options || {};

    StamenSuperClassy.apply(this, arguments);

    function draw(data) {
      var content = Handlebars.compile(templateCache)(data);

      that.fire("draw");

      return content;
    }

    function initContainer() {

      containerElement = document.createElement("div");

      if (options.className) {
        containerElement.className = options.className;
      }

      containerElement.classList.add("fullscreen-overlay");
      containerElement.style.display = "none";
      containerElement.style.position = "fixed";
      containerElement.style.top = 0;
      containerElement.style.right = 0;
      containerElement.style.bottom = 0;
      containerElement.style.left = 0;
      containerElement.style.zIndex = 100;
      containerElement.style.width = "100vw";
      containerElement.style.height = "100vh";
      containerElement.style.overflow = "auto";

      containerElement.addEventListener("mousewheel", function(e) {
        e.preventDefault();
      }, false);

      rootElement.appendChild(containerElement);

      return containerElement;

    }

    function initTemplate(callback) {


      that.utils.request(templatePath, function(err, r) {

        if (err) {
          return false;
        }

        templateCache = r.responseText;

      });


    }

    function show() {

      if (!drawn) {
        containerElement.innerHTML = draw({});
        drawn = true;
      }

      containerElement.style.display = "block";

      that.fire("show");
    }

    function hide() {
      containerElement.style.display = "none";

      that.fire("hide");
    }

    function init(callback) {
      rootElement = that.utils.get(rootSelector)[0];

      initContainer();

      initTemplate(function() {
        callback();
      });

    }

    //
    // Interface
    //
    that.draw = draw;
    that.show = show;
    that.hide = hide;
    that.container = containerElement;

    //
    // Go Go Go!
    //
    init(function(err, data) {
      that.fire("ready");
    });

    return that;

 };

});
