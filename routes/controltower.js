
/*
 * GET controltower default route

exports.list = function(req, res){
  res.send("respond with a resource");
};
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
*/
exports.index = function(req, res){
	res.render('controltower/index');
};
exports.modules = function(req, res){
	res.send("modules page");
};
exports.settings = function(req, res){
	res.render('controltower/settings/index');
};