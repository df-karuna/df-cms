/*
 * GET controltower default route

exports.list = function(req, res){
  res.send("respond with a resource");
};
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
*/

var fs = require('fs')
  , formidable = require('formidable')
	, mongoose = require('mongoose')
	, model = require('../m/model')
	, msg = require('../../utils/message');
var pluginInfo = JSON.parse( fs.readFileSync('./plugins/user/info.json', 'utf8') );


var name = pluginInfo['name']
	//, view = pluginInfo['directory']+"/v";
	, view = pluginInfo['directory']+"/"+ (pluginInfo['view']||"v")
	, verbs = pluginInfo['verbs'];

exports.addUserForm = function(app){
	app.get(verbs.addUserForm.route, function(req, res){
		var data = {};

		data.submitVal = '가입하기';
		data.action = 'userForm';
		data.currNum = new Date().getFullYear()-1988 +1;

		res.render(view+'/userForm', data);
		console.log(view+'/userForm');
	});
}

exports.addUser = function(app){
	app.post(verbs.addUser.route, function(req, res){	 
		console.log('addUser');
		
		params = req.body;

		if(params.password == params.chkPassword){
			model.addUser(req.body,function(err){
					if(err){
						return handleError(err);
					}
					else{
						res.end('<script type="text/javascript">alert("회원가입완료. 로그인 페이지로 이동합니다.");location.href="/login";</script>');
						//msg.showMessage(res, '회원가입완료. 로그인 페이지로 이동합니다.');
					}
				});
		}else
					msg.showMessage(res, '입력한 비밀번호가 일치하지않습니다.');
		res.end();
	});
}
exports.modUserForm = function(app){
	app.get(verbs.index.route, function(req, res){
		var data = {};

		data.submitVal = '수정완료';
		data.action = 'modUser';
		data.currNum = new Date().getFullYear()-1988 +1;
		data.title = 'hello';

		res.render(view+'/userForm');
		console.log(view+'/userForm');
	});
}
exports.modUser = function(app){
	app.post(verbs.index.route, function(req, res){
		console.log('modUser');
	});
}
exports.loginForm = function(app){
	app.get(verbs.loginForm.route, function(req, res){
		res.render(view+'/loginForm');
	});
}
exports.loginAction = function(app){
	app.post(verbs.loginAction.route, function(req, res){
		var params = req.body;
		var cb = function (err, info){
				var output = [];
				var nextPage = '/';
				if(info !== undefined && info != null){
					//output.push('Logged in successfully');
					if(params.next)
						nextPage = params.next;
					//res.end('Logged in successfully');
					res.redirect(nextPage);
				} else{
					//output.push('<script type="text/javascript">alert("올바르지 않은 아이디 혹은 패스워드입니다.");history.back();</script>');
					msg.showMessage(res, '올바르지 않은 아이디 혹은 패스워드입니다.');
					res.end(output.join());
				}
			};

		model.checkUser(params, cb);

		//login check. set session.
	});
}