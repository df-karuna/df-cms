
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , configure = require('./config/config.js')['development'];


var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

/*For find views from WebRoot/plugins/somePlugin/v  */
app.set('views', __dirname + '/plugins');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
    uploadDir:  __dirname+'/tmp'
  }));
app.use( require('connect').bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

/*app.get('/tempUserForm', function(req, res){
		var currNum = new Date().getFullYear()-1988 +1;
		var data = {};

		data.submitVal = '가입하기';
		data.title= 'title';
		data.currNum = currNum;
		data.action = '/';

		res.render(__dirname+'/plugins/user/v/userForm', data);
	});*/

app.get('/resTester', function(req, res){
	var msg = require('./plugins/utils/message');

	msg.showMessage(res, 'test', '/');
	res.end();
	});

//db connect
mongoose.connect(configure.db);


/* Loading default plugin named "controlTower" */
pluginBaseDir = './plugins/';
var pluginInfo = JSON.parse( fs.readFileSync(pluginBaseDir+'controlTower/info.json', 'utf8') );

var pluginName = pluginInfo['name'];
var pluginDir = pluginBaseDir + pluginInfo['directory'];
console.log(  "Loading plugin ... "+pluginName+" = require('"+pluginDir+"/"+ (pluginInfo['controller']||"c/controller")+"');" );
eval("var "+pluginName+" = require('"+pluginDir+"/"+ (pluginInfo['controller']||"c/controller")+"');");
console.log(" Done");

var verbs = pluginInfo['verbs'];
for(m in verbs){
	console.log( "Loading methods ... " +pluginName+'.'+verbs[m].action+'(app);');
	eval(pluginName+'.'+verbs[m].action+'(app);');
	console.log(" Done");
}

/*
var verbs = pluginInfo['verbs'];
for(m in verbs){
	console.log( "\tLoading verbs ... app."+verbs[m].method+"('"+verbs[m].route+"', "+pluginName+"."+verbs[m].action+");" );
	eval("app."+verbs[m].method+"('"+verbs[m].route+"', "+pluginName+"."+verbs[m].action+");");
}
*/

/* Loading custom plugins 
 * 1. Load custom plugin information from DB 
 * 2. Get plugin information ( /plugins/somePlugin/info.json )
 * 3. Load methods, ex) somePlugin.method(app);
 * 4. Again 1 to 3 until all plugins loaded.
 */
require('./plugins/controlTower/c/controller').loadAllModules(app);
//console.log(allPlugins);

/* Loading custom plugins is Done */

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});