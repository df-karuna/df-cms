var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PluginScm = mongoose.model('Plugins', new Schema({
							name : String,
							created_at : Date
						}));

exports.findAll = function (cb){
	//return new PluginScm.find();
	//var data = {};

	//return data;
	PluginScm.find()
					.exec(cb);
};

exports.savePlugin = function(pluginPath){
	if (pluginPath !== undefined && pluginPath != null)
	{
		var plugin = new PluginScm({name:pluginPath, created_at:Date()});
		plugin.save(function(err){
			if(err) return handleError(err);
			console.log('Saved');
		});
	}
}

/*exports.loadAllModules = function(app){

	var fs = require('fs');
	
	PluginScm.find({})
						.exec(function(err, docs) {
		if (err)
		{
			return;
		}
		
		pluginBaseDir = './plugins/';
		for(plugin in docs){
			var pluginInfo = JSON.parse( fs.readFileSync(pluginBaseDir+docs[plugin].name+'/info.json', 'utf8') );

			var pluginName = pluginInfo['name'];
			var pluginDir = pluginBaseDir + pluginInfo['directory'];
			console.log(  "Loading plugin ... "+pluginName+" = require('"+pluginDir+"/"+ (pluginInfo['controller']||"c/controller")+"');" );
					eval("var "+pluginName+" = require('../../"+pluginInfo['directory']+"/"+ (pluginInfo['controller']||"c/controller")+"');");
					console.log(" Done");

			var verbs = pluginInfo['verbs'];
			for(m in verbs){
				console.log( "Loading methods ... " +pluginName+'.'+verbs[m].action+'(app);');
				eval(pluginName+'.'+verbs[m].action+'(app);');
				console.log(" Done");
			}
		}
	});
}*/

exports.loadAllModules = function(cb){
	PluginScm.find({})
						.exec(cb);

}