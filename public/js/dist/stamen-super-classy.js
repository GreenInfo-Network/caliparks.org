define([ "require", "exports", "module" ], function(require, exports, module) {
    module.exports = function() {
        var listeners = {};
        return this.on = function(type) {
            listeners[type] || (listeners[type] = []), listeners[type].push(arguments);
        }, this.once = function() {
            return this.on.apply(this, [ arguments[0], arguments[1], arguments[2], !0 ]);
        }, this.fire = function(type, data) {
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
        }, this.get = function(selector, root) {
            return $ ? (root ? $(root).find(selector) : $(selector)).get() : (root ? root : document).querySelectorAll(selector);
        }, this;
    };
});