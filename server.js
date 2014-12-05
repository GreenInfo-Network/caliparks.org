'use strict';

var express  = require('express'),
    exphbs   = require('express-handlebars'),
    memwatch = require('memwatch'),
    morgan   = require('morgan'),
    raven    = require('raven'),
    i18n     = require("i18n"),
    cpad     = require("./lib/cpad.js"),
    routes   = require("./lib/routes.js"),
    fs       = require("fs");

var app      = express();
module.exports = app;

var languageFriendlyNames = {
    "english" : "en",
    "espanol" : "es",
    "ingles"  : "en",
    "spanish" : "es"
};

//
// Handle memory leaks
//
memwatch.on('leak', function(info) {
  console.log('Memory Leak detected:', info);
});

//
// Set up Sentry logging
//

if (process.env.SENTRY_DSN) {
  raven.patchGlobal(function(logged, err) {
    console.log('Uncaught error. Reporting to Sentry and exiting.');
    console.error(err.stack);
    process.exit(1);
  });

  app.use(raven.middleware.express());
}

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// you'll need cookies
app.use(express.cookieParser());

//
// Internationalization time (i18n)
//
i18n.configure({
    locales:['en', 'es'],
    directory: './locales',
    cookie: 'localeparks'
});

// init i18n module for this loop
app.use(i18n.init);

//
// Setup Express
//
function constructPaginationArgs(pageData, forward) {
  var paramsObject = {};

  for (var i in pageData) {
    if (pageData.hasOwnProperty(i) && pageData[i] && pageData[i].toString().length) {
      if (['startat','perpage','not'].indexOf(i) > -1) {
        paramsObject[i] = pageData[i];
      }
    }
  }

  for (var i in pageData.query) {
    if (pageData.query.hasOwnProperty(i)) {
      if (['q','near','with'].indexOf(i) > -1 && pageData.query[i] && pageData.query[i].toString().length) {
        paramsObject[i] = pageData.query[i];
      }
    }
  }

  //
  // Make sure special search routes are not duplicated in search params
  //
  if (pageData.context && paramsObject[pageData.context]) {
    delete paramsObject[pageData.context];
  }

  return paramsObject;
}

function stringifyPaginationArgs(paramsObject) {

  return Object.keys(paramsObject).map(function(key) {
    return key + '=' + encodeURI(paramsObject[key]);
  }).join('&');

}

app.engine('handlebars', exphbs({
  defaultLayout : 'main',
  helpers       : {
    "agencyNameDisplay" : function(options) {

      var name_parts = options.fn(this).split(',');

      return (name_parts.length > 1) ? name_parts[1] + ' ' + name_parts[0] : name_parts[0];
    },
    "pluralize" : function() {

      var options, number;

      options = (typeof arguments[0] !== 'object') ? arguments[1] : arguments[0];
      number  = (typeof arguments[0] !== 'object') ? arguments[0] : null; //If not, the number is already in the string

      var o = (number) ? [number,options.fn(this)] : options.fn(this).split(' '),
          l = o[o.length-1].split('|');

      if ((o[0] | 0) === 1 && o.length === 2) {
        return options.fn(this).split(l[0])[0] + ' ' +  l[0];
      } else {
        return options.fn(this).split(l[0])[0] + ' ' +  l[1];
      }
    },
    "paginationNext" : function(options) {
      var paginationArgs;
      if ((options.data.root.total|0) === (options.data.root.perpage|0)) {
        paginationArgs = constructPaginationArgs(options.data.root);
        paginationArgs.startat = parseInt((paginationArgs.startat||0), 10) + parseInt((paginationArgs.perpage||0), 10);
        return options.fn(this).replace(/href="#"/,'href="?' + stringifyPaginationArgs(paginationArgs) + '"');
      }
    },
    "paginationLast" : function(options) {
      var paginationArgs;
      if ((options.data.root.startat|0) >= (options.data.root.perpage|0)) {
        paginationArgs = constructPaginationArgs(options.data.root);
        paginationArgs.startat = parseInt((paginationArgs.startat||0),10) - parseInt((paginationArgs.perpage||0), 10);
        return options.fn(this).replace(/href="#"/,'href="?' + stringifyPaginationArgs(paginationArgs) + '"');
      }
    },
    "removeSpaces" : function(options) {
      return options.fn(this).replace(/ /g, '_').toLowerCase();
    },
    "replace" : function(options) {
      return options.fn(this).split(options.hash.item).join(options.hash.with);
    },
    "json" : function(options) {
      return JSON.stringify(options.fn(this));
    },
    "__" : function () {
      return i18n.__.apply(this, [arguments[0].fn(this)]);
    },
    "__n" : function () {
      return i18n.__n.apply(this, [arguments[0].fn(this)]);
    }
  }
}));
app.set('view engine', 'handlebars');

//
// Setup Routes
//

app.use('/style', express.static('./public/style', { maxAge: 3600e3 }));
app.use('/js',    express.static('./public/js', { maxAge: 3600e3 }));
app.use('/data',  express.static('./public/data', { maxAge: 3600e3 }));
app.use('/js/partials',  express.static('./views/partials', { maxAge: 3600e3 }));

app.get('/', function(req, res, next) {

  require('./controllers/home.js')(req, res, {}, function(err, templateData) {
    if (err) {
      return next(err);
    }

    templateData.layout = 'responsive2';
    templateData.view = 'home';

    res.render('home', templateData);

  });
});

app.get('/speak/:language', function(req, res, next) {

  res.cookie('localeparks', languageFriendlyNames[req.params.language] || req.params.language, { maxAge: 900000, httpOnly: true });

  res.redirect('/');
});

app.get('/hablas/:language', function(req, res, next) {

  res.cookie('localeparks', languageFriendlyNames[req.params.language] || req.params.language, { maxAge: 900000, httpOnly: true });

  res.redirect('/');
});

app.get('/about', function(req,res) {

  res.render('about', {
    appTitle : 'California Open Spaces: About',
    layout   : 'photo-back'
  });

});

app.get('/svg/:name-:color.svg', function(req,res) {

  var color = req.params.color;

  fs.readFile('./public/style/' + req.params.name + '.svg', {"encoding":"utf8"}, function(err, image) {

    if (err) {
      console.error(err);
    }

    if (image) {
      res.contentType('image/svg+xml');
      res.send(image.replace(/\{color\}/g, color));
    } else {
      res.status(404);
      res.send('Sorry, but I have no idea what you are talking about.');
    }
  });

});

app.get('/agencies', function(req,res) {

  require('./controllers/agencies.js')(req, res, {}, function(err, templateData) {

    if (err) {
      return next(err);
    }

    res.render('agencies', templateData);

  });
});

app.get('/agency/:id', function(req,res) {

  require('./controllers/agency.js')(req, res, {}, function(err, templateData) {

    if (err) {
      return next(err);
    }

    res.render('agency', templateData);

  });

});

app.get('/park', function(req,res) {

  res.redirect('/');

});

app.get('/wander', function(req,res, next) {
  cpad.getRandomBest(function(err, parkId) {

    if (err) {
      return next(err);
    } else {
      res.redirect('/park/' + parkId.superunit_id);
    }

  });
});

app.get('/park/:id(\\d+)', function(req,res, next) {

  require('./controllers/park.js')(req, res, {
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    if (templateData) {
      templateData.hasAPI = true;
      templateData.layout = 'responsive2';
      templateData.view = 'park';
      res.render('park', templateData);
    } else {
      return next();
    }

  });

});

app.get('/park/:id(\\d+)/:dataFilter:format(\.\\D+$)', function(req,res, next) {

  require('./controllers/park.js')(req, res, {
    "dataFilter" : req.params.dataFilter,
    "limit"      : req.query.limit,
    "startat"    : req.query.startat
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    if (templateData) {
      routes.dataRouteResponse(res, templateData, req.params.format);
    } else {
      return next();
    }

  });

});

app.get('/park/:id(\\d+):format(\.\\D+$)', function(req,res, next) {

  require('./controllers/park.js')(req, res, {}, function(err, templateData) {

    if (err) {
      return next(err);
    }

    if (templateData) {
      routes.dataRouteResponse(res, templateData, req.params.format);
    } else {
      return next();
    }

  });

});

app.get('/parks/', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : 'biggest-to-smallest'
  }, function(err, templateData) {

    if (err) {
      return next();
    }

    templateData.layout = 'responsive2';
    templateData.view   = 'parks';
    templateData.tabletViewport = true;

    res.render('parks', templateData);

  });

});

app.get('/parks/:context/:query:format(\.\\D+$)', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : req.params.context,
    query   : req.params.query,
    options : req.query
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    routes.dataRouteResponse(res, templateData, req.params.format, [
      'parks',
      'total'
    ]);

  });

});

app.get('/parks/:context(\\D+):format(\.\\D+$)', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : req.params.context,
    options : req.query
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    routes.dataRouteResponse(res, templateData, req.params.format, [
      'parks',
      'total'
    ]);

  });

});

app.get('/parks/:context', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : req.params.context
  }, function(err, templateData) {

    if (err || !templateData) {
      return next(err);
    }

    templateData.hasAPI = true;
    templateData.layout = 'responsive2';
    templateData.view   = 'parks';
    templateData.tabletViewport = true;
    templateData.context = req.params.context;

    res.render('parks', templateData);

  });

});

app.get('/parks/:context/:query', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : req.params.context,
    query   : req.params.query
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    if (templateData) {
      templateData.hasAPI = true;
      templateData.layout = 'responsive2';
      templateData.view   = 'parks';
      templateData.tabletViewport = true;
      templateData.context = req.params.context;

      res.render('parks', templateData);
    } else {
      return next();
    }

  });

});

app.get('/agency/:query', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : 'agency',
    query   : req.params.query
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    templateData.layout = 'responsive';
    templateData.tabletViewport = true;

    res.render('parks', templateData);

  });

});

//app.use('/js', express.static(__dirname + '/client/js'));

app.use(function(req, res, next) {
  res.status(404);

  return res.render('404', {
    coverPhoto : {
      farm:9,
      server:8429,
      photoid:7492144602,
      secret:'1706ca60db',
      ownername:'Grand Canyon NPS',
      owner:'grand_canyon_nps'
    },
    appTitle : 'California Open Spaces: #BZZT'
  });
});


//
// Go Go Go
//
app.listen(process.env.PORT || 8080, function() {
  console.log("Listening at http://%s:%d/", this.address().address, this.address().port);
});
