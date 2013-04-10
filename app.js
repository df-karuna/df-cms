
/**
 * Module dependencies.
 */

var express = require('express')
  , stores = require('connect-mongo')(express)
  , routes = require('./routes')
  , user = require('./routes/user')
  , controlTower = require('./routes/controltower')
  , auth = require('./routes/auth')
  , http = require('http')
  , path = require('path')
  , db = require('mongoose');

var app = express();

db.connect('mongodb://localhost/caps');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
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

app.use(express.session({
	secret: 'noobjs',
	store: new store({
		url:'mongodb://localhost/caps',
		collection:'sessions'
	});
});



//setting up controlTower default settings.
app.all('/controlTower(|/*)', auth.checkAuth);
app.get('/controlTower', controlTower.index);
app.get('/controlTower/settings', controlTower.settings);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
