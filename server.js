var http               = require('http'),
    express            = require('express'),
	exphbs             = require('express3-handlebars'),
    app                = express(),
	config             = require(__dirname + '/config.json'),
	override_templates = require(__dirname + '/override-templates.json'),
	app_title          = config.app.name,
	port               = process.env.PORT || 5000;

var flickr_photos = require(__dirname + '/data/park_flickr_photos.json');
	
//
// Setup Express
//
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//
// Setup Routes
//

app.use('/style', express.static(__dirname + '/style'));


app.get('/', function(req,res) {

	var parks = {},
	    parks_array = [];

	flickr_photos.features.forEach(function(park, i, all) {
		if (!parks[park.properties.containing_park_id]) {
			parks[park.properties.containing_park_id] = park.properties;
		}
	});

	Object.keys(parks).forEach(function(park, i, all) {
		parks_array.push(parks[park]);
	});

	res.render('home', {
	 	app_title : app_title,
	 	park_data : parks_array
	});
});

app.get('/park', function(req,res) {

	res.redirect('/');

});

app.get('/park/:id', function(req,res) {
	//console.log('req',req.params.id);

	var park_data     = {title:null, photos:[]},
	    template      = 'park',
	    title;

	flickr_photos.features.forEach(function(photo, i, photos) {
		if (parseInt(photo.properties.containing_park_id, 10) === parseInt(req.params.id, 10)) {
			if (!park_data.title) {
				park_data.title = photo.properties.containing_park_name;
			}
			park_data.photos.push(photo.properties);
		}
	});

	if (override_templates[req.params.id]) {
		template = override_templates[req.params.id].template;
	    title    = override_templates[req.params.id].title;
	}

	if (park_data.title) {
		res.render(template, {
	 		app_title    : title,
	 		park_data    : park_data,
	 		total_photos : park_data.photos.length
		});
	} else {
		res.send('Well, there is a park we haven\'t learned about yet. Typo perhaps?', 404);
	}

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