define([ "require", "exports", "module", "views", "stamen-super-classy" ], function(require, exports, module, Views, StamenSuperClassy) {
    "use strict";
    module.exports = function(rootSelector, templatePath, options) {
        function draw(data) {
            var content = Handlebars.compile(templateCache)(data);
            return that.fire("draw"), content;
        }
        function initContainer() {
            return containerElement = document.createElement("div"), options.className && (containerElement.className = options.className), 
            containerElement.classList.add("fullscreen-overlay"), containerElement.style.display = "none", 
            containerElement.style.position = "fixed", containerElement.style.top = 0, containerElement.style.right = 0, 
            containerElement.style.bottom = 0, containerElement.style.left = 0, containerElement.style.zIndex = 100, 
            containerElement.style.width = "100vw", containerElement.style.height = "100vh", 
            containerElement.style.overflow = "auto", containerElement.addEventListener("mousewheel", function(e) {
                e.preventDefault();
            }, !1), rootElement.appendChild(containerElement), containerElement;
        }
        function initTemplate() {
            that.utils.request(templatePath, function(err, r) {
                return err ? !1 : void (templateCache = r.responseText);
            });
        }
        function show() {
            drawn || (containerElement.innerHTML = draw({}), drawn = !0), containerElement.style.display = "block", 
            that.fire("show");
        }
        function hide() {
            containerElement.style.display = "none", that.fire("hide");
        }
        function init(callback) {
            rootElement = that.utils.get(rootSelector)[0], initContainer(), initTemplate(function() {
                callback();
            });
        }
        var templateCache, rootElement, containerElement, drawn, that = this, Handlebars = new Views().Handlebars;
        return options = options || {}, StamenSuperClassy.apply(this, arguments), that.draw = draw, 
        that.show = show, that.hide = hide, that.container = containerElement, init(function() {
            that.fire("ready");
        }), that;
    };
});