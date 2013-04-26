
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

/*For find views from WebRoot/plugins/somePlugin/v  */
app.set('views', __dirname + '/plugins');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
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
app.get('/users', user.list);


/* Loading default plugin named "controltower" */
var file = fs.readFileSync('./plugins/controlTower/info.json', 'utf8');
var moduleInfo = JSON.parse(file);

moduleName = moduleInfo['name'];
console.log(  "loading module .. var "+moduleName+" = require('./plugins/"+moduleName+"/c/controller');" );
eval("var "+moduleName+" = require('./plugins/controlTower/c/controller');");

var verbs = moduleInfo['verbs'];
for(m in verbs){
	console.log( "Loading verbs ... app."+verbs[m].method+"('"+verbs[m].route+"', "+moduleName+"."+verbs[m].action+");" );
	eval("app."+verbs[m].method+"('"+verbs[m].route+"', "+moduleName+"."+verbs[m].action+");");
}

/* Loading custom plugins 
 * 1. Load custom plugin information from DB 
 * 2. Get plugin information ( /plugins/somePlugin/info.json )
 * 3. Load using app.verbs('/sp/foo', sp.action);
 * 4. Again 1 to 3 until all plugins loaded.
 */

/* Loading custom plugins is done */

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
