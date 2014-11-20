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
                return $ ? (root ? $(root).find(selector) : $(selector)).get() : (root ? root : document).querySelectorAll(selector);
            }
        }, this;
    };
});