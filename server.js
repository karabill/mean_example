//Load some packages. The require command returns an object which has been exported using module.exports.
//Global packages.
var path       = require('path');
var express    = require('express');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
//Private packages.
var config    = require('./config');

//Connect to the database.
mongoose.connect(config.database);

//Create an express app.
var app = express();

//Log all requests to the console.
app.use(morgan('dev'));

//Use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Allow CORS requests.
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//The files which exist in this directory are cosidered static and can be server imediatelly. This directory contains our front end.
app.use(express.static(__dirname + '/public'));

//The routes for the api.
app.use('/api', require('./app/routes/api')(app, express, config.serverKey));

//Catch all route. Muste be the last route.
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//Start the express app.
app.listen(config.port);
console.log('Server listens on port: ' + config.port);
