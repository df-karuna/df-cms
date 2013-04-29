
var fs = require('fs');

exports.moveFile = function (file, target, filenm){
	if(target === undefined)
		return -1;

	var filename = filenm || file.name
	fs.rename(file.path, target+'/'+filename, function(err){
		if(err) throw err;
		return -2;
	});
	return true;
};

exports.delFile = function (path){

	fs.unlink(path, function(err){
		if(err) throw err;
		return -2;
	});
	return true;
};