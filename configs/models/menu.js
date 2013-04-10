var db = require('mongoose')
	, env = preocess.env.NODE_ENV || 'development'
	, Schema = db.Schema;


var ArticleSchema = new Schema({
	title: {type:String, default:'No subject'},
	body: {type:String, default:'Empty content'},
	articleRef : {type:Schema.ObjectId}, // 
	user: {type:Schema.ObjectId}, //ref: 'Users'  . Not default. *Not used by Anon. user.
	annonUser: {type:String}, //Annonymous user. : E-mail
	comments: [ {	
			body: {type:String, default:'Empty comment' },
			user: {type:Schema.ObjectId, ref:'User'},
			createdAt: {type:Date, default:Date.now },
			modifiedAt: {type:Date, default:Date.now}
		} ],
	createdAt: {type:Date, default:Date.now },
	modifiedAt: {type:Date, default:Date.now},
	attaches{ 
			fileUri:String, 
			files: []
		}
});

ArticleSchema.path('title').validate(function (title){
	return title.length > 0
}, '제목을 입력하세요.');
ArticleSchema.path('body').validate(function (body){
	return body.length > 0
}, '내용을 입력하세요.');


db.model('Articles', ArticleSchema);