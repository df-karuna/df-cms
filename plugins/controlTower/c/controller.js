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
var moduleInfo = JSON.parse( fs.readFileSync('./plugins/controlTower/info.json', 'utf8') );

var name = moduleInfo['name']
	, view = moduleInfo['view'];

exports.index = function(req, res){
	res.render(view+'/index');
	console.log(name+'/v/index');
};
exports.settings = function(req, res){
	res.render(view+'/settings');
	console.log(view+'/settings');
};