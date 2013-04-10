

exports.checkAuth = function(req, res, next){
	console.log('checking authority...');
	console.log('done!');
	next();
}