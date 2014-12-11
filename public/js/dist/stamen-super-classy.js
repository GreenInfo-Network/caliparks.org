define([ "require", "exports", "module" ], function(require, exports, module) {
    "use strict";
    module.exports = function() {
        var that = this, listeners = {};
        return that.on = function(type) {
            listeners[type] || (listeners[type] = []), listeners[type].push(arguments);
        }, that.once = function() {
            return this.on.apply(that, [ arguments[0], arguments[1], arguments[2], !0 ]);
        }, that.fire = function(type, data) {
            listeners[type] && (listeners[type].forEach(function(listener) {
                listener[1]({
                    listener: listener[2],
                    caller: data
                });
            }), listeners[type] = listeners[type].filter(function(p) {
                return !p[3];
            }));
        }, this.processTemplate = function(template, data) {
            return Object.keys(data).forEach(function(key) {
                template = template.split("{" + key + "}").join(data[key]);
            }), template;
        }, that.utils = {
            get: function(selector, root) {
                return window.$ ? (root ? $(root).find(selector) : $(selector)).get() : (root ? root : document).querySelectorAll(selector);
            },
            debounce: function(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this, args = arguments, later = function() {
                        timeout = null, immediate || func.apply(context, args);
                    }, callNow = immediate && !timeout;
                    clearTimeout(timeout), timeout = setTimeout(later, wait), callNow && func.apply(context, args);
                };
            },
            request: function(uri, callback) {
                if (window && window.XMLHttpRequest) {
                    var xmlHttp = null;
                    return xmlHttp = new window.XMLHttpRequest(), xmlHttp.onreadystatechange = function() {
                        4 === (0 | xmlHttp.readyState) && (200 === (0 | xmlHttp.status) ? callback(null, xmlHttp) : callback(xmlHttp));
                    }, xmlHttp.open("GET", uri, !1), xmlHttp.send(null);
                }
                return !1;
            }
        }, this;
    };
});