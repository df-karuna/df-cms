/*
 * GET controltower default route

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
	, view = pluginInfo['directory']+"/"+ (pluginInfo['view']||"v");

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
	res.send('<html><body><form method="post" action="addonForm" enctype="multipart/form-data"><input type="file" name="sam"><input type="submit" value="전송"/></form></body></html>');
	console.log(view+'/addonForm');
};
exports.createAddon = function(req, res){
	
	var formidable = require('formidable')
					, util = require('util');
	var form = new formidable.IncomingForm();   
	form.keepExtensions = true;    
	form.uploadDir = '../';     

	req.setEncoding("utf8");

    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
	res.end();
};