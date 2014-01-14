var http           = require('http'),
    express        = require('express'),
	colors         = require('colors'),
    app            = express(),
	config         = require(__dirname + '/config.json'),
	app_title      = config.app.name,
	port           = process.env.PORT || 5000;
	
//
// Setup Express
//
app.set('views', __dirname + '/client');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

//
// Setup Routes
//
app.get('/', function(req,res) {
	res.render('index.html', {
	 	app_title : app_title
	});
});

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/style', express.static(__dirname + '/client/style'));

//
// Go Go Go
//
app.listen = function(port){
  var server = http.createServer(this);
  console.log(('On ' + new Date()));
  console.log('the '+ app_title +' was started on port ' + port);
  return server.listen.apply(server, arguments);
};

app.listen(port);