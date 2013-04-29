/*
 * GET controlTower default route

exports.list = function(req, res){
  res.send("respond with a resource");
};
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
*/
var fs = require('fs');
var pluginInfo = JSON.parse( fs.readFileSync('./plugins/controlTower/info.json', 'utf8') );


var name = pluginInfo['name']
	//, view = pluginInfo['directory']+"/v";
	, view = pluginInfo['directory']+"/"+ (pluginInfo['view']||"v")
	, verbs = pluginInfo['verbs'];

exports.index = function(app){
	app.get( verbs.index.route , function(req, res){
			res.render(view+'/index');
			console.log(view+'/index');
		}
	);
}
exports.settings = function(app){
	app.get(verbs.settings.route, function(req, res){
			res.render(view+'/settings');
			console.log(view+'/settings');
		}
	);
}
exports.addons = function(app){
	app.get(verbs.addons.route, function(req, res){
		res.render(view+'/addons');
		console.log(view+'/addons');
	});
}
exports.addonForm = function(app){
	app.get(verbs.addonForm.route, function(req, res){
		res.send('<html><body><form method="post" action="./addonForm" enctype="multipart/form-data"><input type="file" name="file"><input type="submit" value="전송"/></form></body></html>');
		console.log(view+'/addonForm');
	});
}
exports.createAddon = function(app){
	app.post(verbs.createAddon.route, function(req, res){

		var files = req.files,
			 fileUtil = require('../../utils/file'),
			 AdmZip = require('adm-zip');
		
		var res;

		for(file in files){
			console.log(files[file]);
			if( fileUtil.moveFile(files[file], 'e:\\node\\df_cms\\plugins') != true)
				res.end('Faild while moving file : ' + files[file]);
			else{
				zip = new AdmZip('e:\\node\\df_cms\\plugins\\' + files[file].name);
				zip.extractAllTo('e:\\node\\df_cms\\plugins\\'+files[file].name.replace('.zip', ''));
				fileUtil.delFile('e:\\node\\df_cms\\plugins\\' + files[file].name);
			}

		}
		res.end('Done!');
	});
}

/*V.0.0.1*/
/*
exports.index = function(req, res){
	res.render(view+'/index');
	console.log(view+'/index');
};
exports.settings = function(req, res){
	res.render(view+'/settings');
	console.log(view+'/settings');
};
exports.addons = function(req, res){
	res.render(view+'/addons');
	console.log(view+'/addons');
};
exports.addonForm = function(req, res){
	//res.render(view+'/addonForm');
	res.send('<html><body><form method="post" action="./addonForm" enctype="multipart/form-data"><input type="file" name="sam"><input type="submit" value="전송"/></form></body></html>');
	console.log(view+'/addonForm');
};
exports.createAddon = function(req, res){
	
	var formidable = require('formidable')
					, util = require('util');
	var form = new formidable.IncomingForm();   
	form.keepExtensions = true;    
	form.uploadDir = 'tmp';     

	req.setEncoding("utf8");

    var form = new formidable.IncomingForm();

	console.log(util.inspect(req.files) );

   form.parse(req, function(err, fields, files){
      if (err) return res.end('You found error');
      // do something with files.image etc
      console.log(files.sam);
    });
};*/
