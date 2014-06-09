'use strict';

var env               = require('require-env'),
    express           = require('express'),
    exphbs            = require('express3-handlebars'),
    overrideTemplates = require('./override-templates.json'),
    pg                = require('pg'),
    memwatch          = require('memwatch');

var FEATURED_PARKS = require("./public/data/featured_parks.json"),
    SUPER_UNIT_IDS_BY_HASHTAG = require('./public/data/suIdsByHashtag.json');


var app      = express();
module.exports = app;

var dataFormatResponders = {};

//
// Handle memory leaks
//
memwatch.on('leak', function(info) {
  console.log('Memory Leak detected:', info);
});
  
//
// Setup Express
//
app.engine('handlebars', exphbs({
  defaultLayout : 'main',
  helpers       : {
    agencyNameDisplay : function(options) {

      var name_parts = options.fn(this).split(',');

      return (name_parts.length > 1) ? name_parts[1] + ' ' + name_parts[0] : name_parts[0];
    },
    pluralize : function() {

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
    }
  }
}));
app.set('view engine', 'handlebars');

//TODO:Make a geojson format https://www.npmjs.org/package/geojson
dataFormatResponders['.json'] = function dataFormatResponderJSON(res, data, format, whitelist) {

  var dataOut = {};

  whitelist.forEach(function(item) {
    dataOut[item] = data[item];
  });


  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    status   : 'ok',
    response : dataOut
  });
};

dataFormatResponders['*'] = function dataFormatResponder404(res, data, format, whitelist) {
  res.status(404);
  res.render('404', {
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
};

function dataRouteResponse(res, data, format, whitelist) {
  data.methodDescription = data.appTitle;
  delete data.appTitle;
  return dataFormatResponders[format] ? dataFormatResponders[format].apply(this, arguments) : dataFormatResponders['*'].apply(this, arguments);
}

function go404(req, res, next) {

  function go(suggestion) {
    res.status(404);
    res.render('404', {
      coverPhoto : {
        farm:9,
        server:8429,
        photoid:7492144602,
        secret:'1706ca60db',
        ownername:'Grand Canyon NPS',
        owner:'grand_canyon_nps'
      },
      appTitle : 'California Open Spaces: #BZZT',
      suggestion : suggestion
    });
  }

  var possibleHashtag;

  if (req.params[0] && req.params[0].substring(1,6)) {
    possibleHashtag = [req.params[0].substring(1,6),SUPER_UNIT_IDS_BY_HASHTAG[req.params[0].substring(1,6).toUpperCase()]];

    if (possibleHashtag[1]) {
      pg.connect(env.require('DATABASE_URL'), function(err, client, done) {
        if (err) {
          done();
          return next(err);
        }

        client.query('select * from site_park where su_id = ' + possibleHashtag[1], function(err, result) {
          if (err) {
            done();
            return next(err);
          }

          go(result.rows.length ? {
            name : result.rows[0].unit_name,
            url  : '/#' + possibleHashtag[0].toUpperCase()
          } : null);

          done();
        });
      });
    } else {
      go();
    }
    
  } else {
    go();
  }

}

//
// Setup Routes
//

app.use('/style', express.static('./public/style', { maxAge: 3600e3 }));
app.use('/js',    express.static('./public/js', { maxAge: 3600e3 }));
app.use('/data',  express.static('./public/data', { maxAge: 3600e3 }));


app.get('/', function(req, res, next) {

  require('./controllers/home.js')(req, res, {}, function(err, templateData) {
    if (err) {
      return next(err);
    }

    templateData.layout = 'photo-back';

    res.render('home', templateData);

  });
});

app.get('/about', function(req,res) {

  res.render('about', {
    appTitle : 'California Open Spaces: About',
    layout   : 'photo-back'
  });

});

app.get('/agencies', function(req,res) {

  require('./controllers/agencies.js')(req, res, {}, function(err, templateData) {

    res.render('agencies', templateData);

  });
});

app.get('/agency/:id', function(req,res) {

  require('./controllers/agency.js')(req, res, {}, function(err, templateData) {

    res.render('agency', templateData);

  });

});

app.get('/park', function(req,res) {

  res.redirect('/');

});

app.get('/wander', function(req,res) {

  var id = FEATURED_PARKS[Math.floor(Math.random() * FEATURED_PARKS.length)].id;

  res.redirect('/park/' + id);

});

app.get('/park/:id(\\d+)', function(req,res, next) {

  if (!Number.isNaN(parseInt(req.params.id))) {
    require('./controllers/park.js')(req, res, {
      overrideTemplates : overrideTemplates
    }, function(err, templateData) {

      if (err) {
        return next(err);
      }

      if (templateData) {
        templateData.hasAPI = true;
        res.render('park', templateData);
      } else {
        go404.apply(null,arguments);
      }

    });
  } else {
    go404.apply(null,arguments);
  }

});

app.get('/park/:id(\\d+):format(\.\\D+$)', function(req,res, next) {

  if (!Number.isNaN(parseInt(req.params.id))) {
    require('./controllers/park.js')(req, res, {
      overrideTemplates : overrideTemplates
    }, function(err, templateData) {

      if (err) {
        return next(err);
      }

      if (templateData) {
        dataRouteResponse(res, templateData, req.params.format, [
          'park_id',
          'name',
          'hashtag',
          'coverPhoto',
          'flickrPhotos',
          'tweets',
          'venues_activity',
          'venues_checkins',
          'venues_tips',
          'centroid',
          'cpadPark'
        ]);
      } else {
        go404.apply(null,arguments);
      }

    });
  } else {
    go404.apply(null,arguments);
  }

});

app.get('/parks/', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : 'biggest-to-smallest'
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    templateData.layout = 'photo-back';

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

    dataRouteResponse(res, templateData, req.params.format, [
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

    dataRouteResponse(res, templateData, req.params.format, [
      'parks',
      'total'
    ]);

  });

});

app.get('/parks/:context', function(req,res, next) {

  require('./controllers/parks.js')(req, res, {
    context : req.params.context
  }, function(err, templateData) {

    if (err) {
      return next(err);
    }

    templateData.hasAPI = true;
    templateData.layout = 'photo-back';

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

    templateData.hasAPI = true;
    templateData.layout = 'photo-back';

    res.render('parks', templateData);

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

    templateData.layout = 'photo-back';

    res.render('parks', templateData);

  });

});

//app.use('/js', express.static(__dirname + '/client/js'));

app.get('*', go404);

//
// Go Go Go
//
app.listen(process.env.PORT || 8080, function() {
  console.log("Listening at http://%s:%d/", this.address().address, this.address().port);
});
