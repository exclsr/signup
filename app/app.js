
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 26822);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var signupListFilename = 'signup-list.txt';

app.get('/', routes.index);
app.get('/yes', routes.ok);

app.post('/yes', function (req, res) {
	var fromClient = req.body;

	var data = {};
	data.name = fromClient.name;
	data.address = fromClient.address;

	var line = JSON.stringify(data) + "\r\n";

	fs.appendFile(signupListFilename, line, function (err) {
		if (err) {
			res.send(500, "THE COMPUTER IS BROKEN.");
		}
		else {
			routes.ok(req, res);		
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
