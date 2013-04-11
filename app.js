/**
 * Environment
 */

/**
 * Module dependencies.
 */
var express = require('express')
  , stores = require('connect-mongo')(express)
  , http = require('http')
  , path = require('path')
  , db = require('mongoose');

// Configurations

 var env = process.env.NODE_ENV || 'development'
  , auth = require('./routes/auth')
  , routes = require('./routes')
  , user = require('./routes/user')
  , controlTower = require('./routes/controltower')
  , config = require('./configs/config')[env];

var app = express();

db.connect(config.db);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/mvc/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/', routes.index);
  app.get('/users', user.list);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
/*
app.use(express.session({
		//secret: 'noobjs',
		store: new stores({
			url:config.db,
			collection:'sessions'
		})
	})
);*/

//setting up controlTower default setting
app.get('/controlTower', controlTower.index);
app.get('/controlTower/settings', controlTower.settings);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
