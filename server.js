'use strict';

var http              = require('http'),
    express           = require('express'),
	  exphbs            = require('express3-handlebars'),
	  config            = require('./config.json'),
	  overrideTemplates = require('./override-templates.json');

var app = express();

var flickrPhotos     = require('./public/data/park_flickr_photos.json'),
	  tweets           = require('./public/data/park_tweets.json'),
    parkMetadata     = require('./public/data/cpad_units_metadata.json'),
    flickrData       = {},
    parentEntities   = {},
    parkMetadataMap  = {},
    twitterData      = {},
    appTitle         = config.app.name;

//
// Put Flickr data into a map for quick retrieval
//
flickrPhotos.features.forEach(function(photo, i, photos) {
	if (!flickrData[photo.properties.containing_park_id]) {
		flickrData[photo.properties.containing_park_id] = [];
	}

	flickrData[photo.properties.containing_park_id].push(photo.properties);
});

//
// Get a map of parent entities from the metadata list
//
parkMetadata.features.forEach(function(park, i, parks) {
	var id = park.properties.agncy_id;

	if (!parentEntities[id]) {
		parentEntities[id] = {
			id       : id,
			name     : park.properties.agncy_name,
			children : []
		}
	}

	parentEntities[id].children.push(park.properties);

	parkMetadataMap[park.properties.unit_id] = park.properties;
});

//
// Get twitter data into a map
//
tweets.features.forEach(function(tweet) {

	if (!twitterData[tweet.properties.park_id]) {
		twitterData[tweet.properties.park_id] = [];
	}

	twitterData[tweet.properties.park_id].push(tweet.properties);

});

	
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

	require('./controllers/home.js')(req, res, {

		parentEntities : parentEntities,
		parkMetadata   : parkMetadata,
		flickrData     : flickrData

	}, function(err, templateData) {

		res.render('home', templateData);

	});
});

app.get('/agency/:id', function(req,res) {

	require('./controllers/agency.js')(req, res, {

		parentEntities : parentEntities,
		flickrData     : flickrData,
		twitterData    : twitterData

	}, function(err, templateData) {

		res.render('agency', templateData);

	});

});

app.get('/park', function(req,res) {

	res.redirect('/');

});

app.get('/park/:id', function(req,res) {

	require('./controllers/park.js')(req, res, {
		parkMetadataMap   : parkMetadataMap,
		overrideTemplates : overrideTemplates,
		flickrData        : flickrData,
		twitterData       : twitterData,
		
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