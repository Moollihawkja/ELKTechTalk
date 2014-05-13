"use strict"

// --- Dependencies
var
	http = require('http'),
	express =  require('express'),
	request = require('request'),
	logger = require("pc-monitor-client")
;


// --- Private Variables
var app = express(),
   path = __dirname
 //   _global,
 //   port
;
var bodyParser = require('body-parser');

process.env.APP_NAME = "my-awesome-app";

var
	initialize = function() {


		app.set('views', path + '/views');
  		app.set('view engine', 'ejs');
  		app.use(bodyParser());
  		app.use(express.static(path + '/public'));


		app.get('/', function (req, res) {
			logger.log({
				title: '404 Not Found',
				level: 'Error',
				description: 'Page Not Found',
				content: {
					error: 'Page not found'
				}
			})
			res.send("Page Not Found");
		})

		app.post('/api', function (req, res) {
				console.log(req.body);
				logger.send({
				  title: 'My Title',
				  level: 'foo',
				  description: 'some description',
				  content: req.body,
				  db_persist: false //default
				});
				res.send("");
		});

		app.get('/home', function(req, res) {
			res.render('index.ejs');
		});

		app.listen(3000);

	}
;

// --- Public Functions


// --- Initialization

// --- Module Interface
initialize();
logger.processInfo.start('Server', 60000);