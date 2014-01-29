'use strict';

var http              = require('http'),
    express           = require('express'),
	  exphbs            = require('express3-handlebars'),
	  config            = require('./config.json'),
	  overrideTemplates = require('./override-templates.json'),
	  pg                = require('pg');

var app      = express();

var appTitle = config.app.name;
	
//
// Setup Express
//
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//
// Setup Routes
//

app.use('/style', express.static('./public/style'));
app.use('/js',    express.static('./public/js'));
app.use('/data',  express.static('./public/data'));


app.get('/', function(req,res) {

	require('./controllers/home.js')(req, res, {}, function(err, templateData) {

		res.render('home', templateData);

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

	var dbCon    = process.env.DATABASE_URL,
        pgClient = new pg.Client(dbCon);

	pgClient.connect(function(err) {

		if(err) {
			return console.error('could not connect to postgres', err);
		}

		pgClient.query('SELECT su_id FROM site_park ORDER BY RANDOM() LIMIT 1', function(err, result) {
			if(err) {
				return console.error('error running query', err); //TODO: Throw a 503
			}
			
			res.redirect('/park/' + result.rows[0].su_id);

			result = null;

			pgClient.end();
		});

	});

});

app.get('/park/:id', function(req,res) {

	require('./controllers/park.js')(req, res, {
		overrideTemplates : overrideTemplates
	}, function(err, templateData) {

		res.render('park', templateData);

	});

});

//app.use('/js', express.static(__dirname + '/client/js'));

app.get('*', function(req,res) {

	res.send('Very sorry, but I can\'t find that page. Would you like to see a <a href="/">list of parks</a>?', 404);

});

//
// Go Go Go
//
app.listen(process.env.PORT || 8080, function() {
  console.log("Listening at http://%s:%d/", this.address().address, this.address().port);
});