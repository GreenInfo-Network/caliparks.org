var http               = require('http'),
    express            = require('express'),
	exphbs             = require('express3-handlebars'),
    app                = express(),
	config             = require(__dirname + '/config.json'),
	override_templates = require(__dirname + '/override-templates.json'),
	app_title          = config.app.name,
	port               = process.env.PORT || 5000;

var flickr_photos   = require(__dirname + '/data/park_flickr_photos.json'),
    park_metadata   = require(__dirname + '/data/cpad_units_metadata.json'),
    flickr_data     = {},
    parent_entities = {},
    park_metadata_map = {};

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
	var id = park.properties.agncy_name.split(' ').join('_').split(',')[0];

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
// Setup Express
//
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//
// Setup Routes
//

app.use('/style', express.static(__dirname + '/style'));


app.get('/', function(req,res) {

	var map = Object.keys(parent_entities).sort().map(function(id) {
		return {
			id    : id,
			name  : parent_entities[id].name,
			count : parent_entities[id].children.length
		};
	});

	res.render('home', {
	 	app_title       : app_title,
	 	park_data       : park_metadata.features,
	 	flickr_data     : flickr_data,
	 	parent_names    : map
	});
});

app.get('/agency/:id', function(req,res) {

	var map = parent_entities[req.params.id].children.map(function(child) {

		return {
			photo_count : (flickr_data[child.unit_id]) ? flickr_data[child.unit_id].length : 0,
			properties  : child
		}
	});

	res.render('agency', {
	 	app_title : app_title,
	 	name      : parent_entities[req.params.id].name.split(',')[0],
	 	parks     : map
	 });

});

app.get('/park', function(req,res) {

	res.redirect('/');

});

app.get('/park/:id', function(req,res) {

	var park_data     = {title:null, photos:[]},
	    template      = 'park',
	    title;

	if (override_templates[req.params.id]) {
		template = override_templates[req.params.id].template;
	    title    = override_templates[req.params.id].title;
	}

	if (park_metadata_map[req.params.id].unit_name) {
		res.render(template, {
	 		app_title    : title,
	 		park_data    : park_metadata_map[req.params.id],
	 		photos       : flickr_data[req.params.id],
	 		total_photos : flickr_data[req.params.id].length,
	 		agency_id    : park_metadata_map[req.params.id].agncy_name.split(' ').join('_').split(',')[0]
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