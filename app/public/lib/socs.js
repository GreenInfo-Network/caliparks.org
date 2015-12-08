/**
 *
 * No frills social sharing plugin
 * https://github.com/stamen/socs
 *
 */


export const socs = {};

socs.sharing = function(){
    var __ = {},
        options = {};
    var items, first;

    // set options from config
    utils.extend(options, config);

    __.version = '0.0.3';


    // query DOM for anything matching options.selector
    // set up sharing service for each match
    var getItems = function() {
        var mp = (options.metaElement) ? document.querySelector(options.metaElement) : null;

            [].forEach.call(document.querySelectorAll(options.selector), function(item){
                var type = item.getAttribute('data-social-service');

                if (config.services.hasOwnProperty(type)) {

                    var o = {};
                    o.elm = item;
                    o.type = type;
                    o.metaElement = mp;
                    o.defaults = options.defaults;

                    utils.extend(o, config.services[type]);
                    utils.extend(o, service);
                    items.push( o );

                    (function(o){
                        o.elm.addEventListener('click', function(evt){
                            if (evt.preventDefault) {
                                evt.preventDefault();
                            } else {
                                evt.returnFalse = true;
                            };

                            o.click_();
                            return false;
                        });

                    })(o);
                }

            });
    };


    // Gathers sharing default properties from meta tags
    var getMetaDefaults = function() {

        if (utils.empty(options.defaults.url)) {
            options.defaults.url = window.location.href.replace(/#.*/, "" );
        }

        if (utils.empty(options.defaults.image)) {
            options.defaults.image = document.querySelector('meta[property="og:image"]') ? document.querySelector('meta[property="og:image"]').getAttribute("content") : "";
        }

        if (utils.empty(options.defaults.title)) {
            options.defaults.title = document.querySelector('meta[property="og:title"]') ? document.querySelector('meta[property="og:title"]').getAttribute("content") : document.title;
        }

        if (utils.empty(options.defaults.desc)) {
            options.defaults.desc = document.querySelector('meta[property="og:description"]') ? document.querySelector('meta[property="og:description"]').getAttribute("content") : "";
        }

    };
    __.destroy = function() {
        first = false;

        items.forEach(function(item) {
            item.elm.removeEventListener('click');
        });

        items = [];
    };

    __.refresh = function() {
        if(!first) getMetaDefaults();

        if (items) {
            items.forEach(function(item) {
                item.elm.removeEventListener('click');
            });
        }

        items = [];
        getItems();
        if (!items) return;
        first = true;
    };

    // ...
    __.refresh();

    return __;
};


var config = socs.sharing.config = {
    selector: '.social-item',
    metaElement: null,
    defaults: {
        url: "",
        image: "",
        title: "",
        caption: "",
        desc: "",
        hashtags: ""
    },
    services: {}

};

// defaults
config.services.facebook = {
    label: 'Facebook',
    url: 'http://www.facebook.com/sharer.php',
    method: 'popup',
    metaProps: {
        url: 'u',
        title: 't'
    },
    miscProps: {
        locale: 'en_US'
    },
    dims: {
        w: 600,
        h: 450
    },
    submit: null
};

config.services.twitter = {
    label: 'Twitter',
    url: 'https://twitter.com/share',
    method: 'popup',
    metaProps: {
        url: 'url',
        title: 'text',
        hashtags: 'hashtags'
    },
    miscProps: {
        lang: 'en'
    },
    dims: {
        w: 600,
        h: 450
    },
    submit: null
};

config.services.google = {
    label: 'Google+',
    url: 'https://plus.google.com/share',
    method: 'popup',
    metaProps: {
        url: 'url'
    },
    miscProps: {
        hl: 'en_US'
    },
    dims: {
        w: 600,
        h: 450
    },
    submit: null
};

config.services.pinterest = {
    label: 'Pinterest',
    url: 'http://www.pinterest.com/pin/create/button/',
    method: 'popup',
    metaProps: {
        url: 'url',
        image: 'media',
        desc: 'description'
    },
    miscProps: {
    },
    dims: {
        w: 600,
        h: 450
    },
    submit: null
};

config.services.linkedin = {
    label: 'LinkedIn',
    url: 'http://www.linkedin.com/shareArticle?mini=true',
    method: 'popup',
    metaProps: {
        url: 'url',
        title: 'title',
        desc: 'summary'
    },
    miscProps: {},
    dims: {
        w: 600,
        h: 450
    },
    submit: null
};




var utils = socs.sharing.utils = {
    __slice: [].slice,
    extend: function() {
        var consumer = arguments[0],
            providers = utils.__slice.call(arguments, 1),
            key,
            i,
            provider,
            except;

        for (i = 0; i < providers.length; ++i) {
            provider = providers[i];
            except = provider['except'] || [];
            except.push('except');
            for (key in provider) {
                if (except.indexOf(key) < 0 && provider.hasOwnProperty(key)) {
                    consumer[key] = provider[key];
                };
            };
        };
        return consumer;
    },
    // string & arrays only
    empty: function(p) {
        if (typeof p === "string" || p instanceof Array) {
            if (!p || !p.length) return true;
        }

        return false;
    }
};

var service = {
    popup: function(url, title, dims) {
        if (!url) return;

        var w = dims.w || 600,
            h = dims.h || 450;

        // Fixes dual-screen position
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 3) - (h / 3)) + dualScreenTop;

        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    },

    popupWithShortner: function(urlToShorten, shareUrl, title, dims) {
        if (!shareUrl) return;

        var w = dims.w || 600,
            h = dims.h || 450;

        // Fixes dual-screen position
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 3) - (h / 3)) + dualScreenTop;



        var windowContent = [
            '<!DOCTYPE HTML>',
            '<html><head>',

            '<script type="text/javascript">',
                'function loadShortUrl() {',
                    'var request = new XMLHttpRequest();',
                    'request.open("GET", "http://is.gd/create.php?format=json&url=',encodeURIComponent(urlToShorten),'", true);',
                    'request.onload = function() {',
                        'if (request.status >= 200 && request.status < 400) {',
                            'var rsp = JSON.parse(request.responseText);',
                            'shortenCB(rsp.shorturl);',
                        '} else {',
                            'shortenCB("',urlToShorten,'");',
                        '}',
                    '};',
                    'request.onerror = function() {',
                        'shortenCB("',urlToShorten,'");',
                    '};',
                    'request.send();',

                '}',
                'function shortenCB(u){',
                    'var shareUrl="',shareUrl,'";',
                    'shareUrl = shareUrl.replace("{url}",encodeURIComponent(u));',
                    'window.location.href = shareUrl;',
                '}',
            '</scri','pt>',
            '</head>',
            '<body onload="loadShortUrl();">',
        '</body></html>'
        ].join('');

        var newWindow = window.open('', title, 'toolbar=0,status=0,height=' + h + ',width=' + w + ',scrollbars=yes,resizable=yes');
        newWindow.document.write(windowContent);
        newWindow.document.close(); // needed for chrome and safari

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    },

    getShareProps: function() {
        if (!this.elm || !this.defaults) return null;

        var p = {};
        for (var opt in this.defaults) {
            var dataKey = 'data-social-' + opt;
            var elm = (this.metaElement) ? this.metaElement : this.elm;
            p[opt] = (elm.getAttribute(dataKey)) ? elm.getAttribute(dataKey) : this.defaults[opt];
        }

        return p;
    },

    makeURL: function() {
        var data = this.getShareProps(),
            url = this.url,
            params = [],
            p;

        if (this.metaProps) {
            for (p in this.metaProps) {
                if (data[p]) params.push(this.metaProps[p] + '=' + encodeURIComponent(data[p]));
            }
        }

        if (this.miscProps) {
            for (p in this.miscProps) {
                params.push( p + '=' + encodeURIComponent(this.miscProps[p]));
            }
        }

        params = params.join("&");

        url += (url.indexOf('?') !== -1) ? '&' : '?';
        url += params;

        return url;
    },

    makeURLWithPlaceholder: function() {
        var data = this.getShareProps(),
            url = this.url,
            params = [],
            p;

        if (this.metaProps) {
            for (p in this.metaProps) {
                if (data[p]) {
                    if (p == 'url') {
                        params.push(this.metaProps[p] + '={url}');
                    } else {
                        params.push(this.metaProps[p] + '=' + encodeURIComponent(data[p]));
                    }

                }
            }
        }

        if (this.miscProps) {
            for (p in this.miscProps) {
                params.push( p + '=' + encodeURIComponent(this.miscProps[p]));
            }
        }

        params = params.join("&");

        url += (url.indexOf('?') !== -1) ? '&' : '?';
        url += params;

        return url;
    },

    click_: function() {
        var url,
            that = this;
        switch (this.method) {
            case 'popup':
            case 'popupWithShortner':
                var data = this.getShareProps();

                if (this.method === 'popup') {
                    url = this.makeURL();
                    this.popup(url, this.label, this.dims);
                } else {
                    url = this.makeURLWithPlaceholder();
                    this.popupWithShortner(data.url, url, this.label, this.dims);
                }

            break;

            case 'sdk':
                if (this.hasOwnProperty('submit') && typeof this.submit === 'function') {
                    this.submit();
                }
            break;
        }


    }
};
