var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserScm = mongoose.model('Users', new Schema({
							id:String
							,password:String
							,name:String
							,gisu:Number
							,email:String
							,tel1:String
							,tel2:String
							,tel3:String
							,address:String
							,reception:Boolean
						}));

exports.userScm = UserScm;

exports.find = function(condition, cb){
	UserScm.find(condition)
					.exec(cb);
}
exports.addUser = function(userInfo, cb){
	var user = new UserScm(userInfo);
	user.save(cb);
}
exports.checkUser = function(params, cb){
	UserScm.findOne({id:params.id, password:params.password})
		.exec(cb);
}
exports.getMyInfo = function(cb){
	//UserScm.findOne({_id:params.id})
//		.exec(cb);
}