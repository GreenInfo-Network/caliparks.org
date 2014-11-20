define([ "require", "exports", "module", "jquery", "stamen-super-classy" ], function(require, exports, module, jquery, StamenSuperClassy) {
    "use strict";
    return function() {
        var that = this;
        return StamenSuperClassy.apply(that, arguments), require([ "attrchange" ], function() {
            $(".fb-like iframe").attrchange({
                callback: function(e) {
                    "style" === e.attributeName && (e.target.offsetHeight > 25 ? that.fire("facebook-frame-change", {
                        state: "open"
                    }) : that.fire("facebook-frame-change", {
                        state: "closed"
                    }));
                }
            });
        }), that;
    };
});