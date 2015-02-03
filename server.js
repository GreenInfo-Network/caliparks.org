'use strict';

var cors       = require('cors'),
    express    = require('express'),
    exphbs     = require('express-handlebars'),
    memwatch   = require('memwatch'),
    morgan     = require('morgan'),
    raven      = require('raven'),
    i18n       = require("i18n"),
    cpad       = require("./lib/cpad.js"),
    routes     = require("./lib/routes.js"),
    responseTime = require("response-time"),
    activities = require("./config/activities.json"),
    fs         = require("fs");

var app            = express();
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

// Track response times
app.use(responseTime());

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

app.use(cors());

//
// Internationalization time (i18n)
//
i18n.configure({
  locales: ['en', 'es'],
  directory: './locales'
});

// Cache-friendly localization rules
app.use(function(req, res, next) {
  // extract preferred language from cookies and prepend it to the
  // Accept-Language header
  if (req.cookies.localeparks) {
    req.headers["accept-language"] = [req.cookies.localeparks, req.get("accept-language")].join("; ");
  }

  // strip req.cookies (they will be from the first request that passes through
  // the cache and _only_ relevant to that request)
  req.cookies = {};

  return next();
});

// init i18n module for this loop
app.use(i18n.init);

// override language preferences
app.use(function(req, res, next) {
  if (req.query.language) {
    req.setLocale(req.query.language);
  }

  return next();
});

// set a cookie to persist language preferences
app.use(function(req, res, next) {
  res.cookie("localeparks", req.getLocale(), {
    maxAge: 10 * 365 * 24 * 60 * 60
  });

  return next();
});

app.use(function (req, res, next) {
  res.header("Vary", "Accept-Language");
  res.header("Content-Language", req.getLocale());

  return next();
});

//
// Setup Express
//
var helpers = {};
fs.readdirSync("./helpers").forEach(function(fileName) {
  helpers[fileName.split(".")[0]] = require("./helpers/" + fileName);
});

app.engine('handlebars', exphbs({
  defaultLayout : 'main',
  helpers       : helpers
}));
app.set("view engine", "handlebars");

//
// This is where the app name is set for display throughout the site.
//
app.set("appName", "CaliParks.org");

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

    templateData.appTitle = app.get('appName');

    res.render('home', templateData);

  });
});

app.get('/speak/:language', function(req, res, next) {

  res.cookie('localeparks', languageFriendlyNames[req.params.language] || req.params.language, { maxAge: (10 * 365 * 24 * 60 * 60), httpOnly: true });

  res.redirect('/');
});

app.get('/hablas/:language', function(req, res, next) {

  res.cookie('localeparks', languageFriendlyNames[req.params.language] || req.params.language, { maxAge: (10 * 365 * 24 * 60 * 60), httpOnly: true });

  res.redirect('/');
});

app.get('/about', function(req,res) {

  res.render('about', {
    appTitle: req.__("Go outside and find parks"),
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

app.get('/js/partials.json', function(req,res) {

  var out = {};

  fs.readdirSync("./views/partials").forEach(function(partialName) {
    out[partialName.split(".")[0]] = fs.readFileSync("./views/partials/" + partialName, {"encoding":"utf8"});
  });

  res.json(out);

});

app.get('/js/helpers/:name.js', function(req,res) {

  res.contentType('text/javascript');
  //AMD-ify helpers
  res.send([
    "define([\"require\",\"exports\",\"module\",\"handlebars\"], function(require,exports,module,Handlebars) {\"use strict\";",
    fs.readFileSync("./helpers/" + req.params.name + ".js", {"encoding":"utf8"}),
    "Handlebars.registerHelper(\""+req.params.name+"\",module.exports)",
    "});"
  ].join(""));

});

app.get('/js/lib/:name.js', function(req,res) {

  res.contentType('text/javascript');
  //AMD-ify helpers
  res.send([
    "define([\"require\",\"exports\",\"module\"], function(require,exports,module,Handlebars) {\"use strict\";",
    fs.readFileSync("./lib/" + req.params.name + ".js", {"encoding":"utf8"}),
    "});"
    ].join(""));

  });

app.get('/embed/:id(\\d{3,6})', function(req,res, next) {

  require('./controllers/park.js')(req, res, {
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    if (templateData) {

      templateData.layout = 'responsive2';
      templateData.view   = 'embed';

      templateData.appTitle = req.__("Go outside and visit ") + templateData.cpadPark.unit_name;

      res.render("embed", templateData);
    } else {
      return next();
    }

  });
});

app.get('/embed/park', function(req,res, next) {

  require('./controllers/park.js')(req, res, {
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    if (templateData) {

      if (!req.query.directions) {
        templateData.hideDirections = true;
      }

      if (!req.query.locatorMap) {
        templateData.hideLocatorMap = true;
      }

      templateData.layout = 'embed-viewport';
      templateData.view   = 'embed-park';

      templateData.appTitle = app.get('appName');

      res.render("embed-park", templateData);
    } else {
      return next();
    }

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

app.get('/park/:id(\\d{3,6})', function(req,res, next) {

  require('./controllers/park.js')(req, res, {
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    if (templateData) {
      templateData.hasAPI = true;
      templateData.layout = 'responsive2';
      templateData.view = 'park';
      templateData.ogTypePark = "true";

      templateData.appTitle = req.__("Go outside and visit ") + templateData.cpadPark.unit_name;

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

app.get('/parks', function(req,res, next) {

  res.redirect("/parks/search");

});

app.get('/parks/:context(search|with|near|story)/:query:format(\.\\D+$)', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : req.params.context,
    query   : req.params.query,
    options : req.query
  }, function(err, templateData) {

    if (err) {
      return next();
    }

    routes.dataRouteResponse(res, templateData, req.params.format, [
      'parks',
      'total'
    ]);

  });

});

app.get('/parks/:context(search|with|near|story):format(\.\\D+$)', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : req.params.context,
    options : req.query
  }, function(err, templateData) {

    if (err) {
      return next();
    }

    routes.dataRouteResponse(res, templateData, req.params.format, [
      'parks',
      'total'
    ]);

  });

});

app.get('/parks/:context(search|with|near|story)', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : req.params.context
  }, function(err, templateData) {

    if (err || !templateData) {
      return next();
    }

    templateData.hasAPI = true;
    templateData.layout = 'responsive2';
    templateData.view   = 'parks';
    templateData.tabletViewport = true;
    templateData.context = req.params.context;

    templateData.appTitle = req.__("Go outside and find parks");

    res.render('parks', templateData);

  });

});

app.get('/parks/:context(search|with|near|story)/:query', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : req.params.context,
    query   : req.params.query
  }, function(err, templateData) {

    if (err) {
      return next();
    }

    if (templateData) {
      templateData.hasAPI = true;
      templateData.layout = 'responsive2';
      templateData.view   = 'parks';
      templateData.tabletViewport = true;
      templateData.context = req.params.context;
      templateData.appTitle = req.__("Go outside and find parks");

      if (req.params.context === 'story') {
        templateData.ogTypeStory = "true";
      } else {
        templateData.ogTypeSearch = "true";
      }

      res.render('parks', templateData);

    } else {
      return next();
    }

  });

});

//app.use('/js', express.static(__dirname + '/client/js'));

app.use(function(req, res, next) {
  res.status(404);

  return res.render('404', {
    layout : "responsive2",
    coverPhoto : {
      farm:9,
      server:8429,
      photoid:7492144602,
      secret:'1706ca60db',
      ownername:'Grand Canyon NPS',
      owner:'grand_canyon_nps',
    },
    appTitle: req.__("Go outside and find parks")
  });
});


//
// Go Go Go
//
app.listen(process.env.PORT || 8080, function() {
  console.log("Listening at http://%s:%d/", this.address().address, this.address().port);
});
