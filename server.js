var http               = require('http'),
    express            = require('express'),
	exphbs             = require('express3-handlebars'),
    app                = express(),
	config             = require(__dirname + '/config.json'),
	override_templates = require(__dirname + '/override-templates.json'),
	app_title          = config.app.name,
	port               = process.env.PORT || 5000;

var flickr_photos     = require(__dirname + '/data/park_flickr_photos.json'),
	tweets            = require(__dirname + '/data/park_tweets.json'),
    park_metadata     = require(__dirname + '/data/cpad_units_metadata.json'),
    flickr_data       = {},
    parent_entities   = {},
    park_metadata_map = {},
    twitter_data      = {};

//
// Put Flickr data into a map for quick retrieval
//
flickr_photos.features.forEach(function(photo, i, photos) {
	if (!flickr_data[photo.properties.containing_park_id]) {
		flickr_data[photo.properties.containing_park_id] = [];
	}

	flickr_data[photo.properties.containing_park_id].push(photo.properties);
});

//
// Get a map of parent entities from the metadata list
//
park_metadata.features.forEach(function(park, i, parks) {
	var id = park.properties.agncy_id;

	if (!parent_entities[id]) {
		parent_entities[id] = {
			id       : id,
			name     : park.properties.agncy_name,
			children : []
		}
	}

	parent_entities[id].children.push(park.properties);

	park_metadata_map[park.properties.unit_id] = park.properties;
});

//
// Get twitter data into a map
//
tweets.features.forEach(function(tweet) {

	if (!twitter_data[tweet.properties.park_id]) {
		twitter_data[tweet.properties.park_id] = [];
	}

	twitter_data[tweet.properties.park_id].push(tweet.properties);

});

	
//
// Setup Express
//
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//
// Setup Routes
//

app.use('/style', express.static(__dirname + '/style'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/data', express.static(__dirname + '/data'));


app.get('/', function(req,res) {

	require(__dirname + '/controllers/home.js')(req, res, {

		parent_entities : parent_entities,
		park_metadata   : park_metadata,
		flickr_data     : flickr_data

	}, function(err, template_data) {

		res.render('home', template_data);

	});
});

app.get('/agency/:id', function(req,res) {

	require(__dirname + '/controllers/agency.js')(req, res, {

		parent_entities : parent_entities,
		flickr_data     : flickr_data,
		twitter_data    : twitter_data

	}, function(err, template_data) {

		res.render('agency', template_data);

	});

});

app.get('/park', function(req,res) {

	res.redirect('/');

});

app.get('/park/:id', function(req,res) {

	require(__dirname + '/controllers/park.js')(req, res, {
		park_metadata_map  : park_metadata_map,
		override_templates : override_templates,
		flickr_data        : flickr_data,
		twitter_data       : twitter_data,
		
	}, function(err, template_data) {

		res.render('park', template_data);

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