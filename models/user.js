var bcrypt = require('bcryptjs');
var orm = require('orm');
var dateFormat = require('dateformat');



module.exports = {
	createModel: function(db) {
		// Form attributes:
		// - age: Int [CHECK]
		// - firstname: String [CHECK]
		// - lastname: String [CHECK]
		// - country: String (määrämuotoinen) [CHECK]
		// - email: String (määrämuotoinen) [CHECK]
		// - gender [male, female, other] [CHECK]
		// - t-shirt size: [xs, s, m, l, xl, xxl] [CHECK]
		// - dietary restrictions: String (määräpituus, esim 160 merkkiä) 
		/*	Vegetarian:
		 	No Pork:
	 		Gluten-Free:
		   	No special restrictions: */

		// - top track choice (checkbox trackeistä, 1 valinta)
		// - portfolio: String (url)
		// - question 1: String
		// - question 2: String
		// - comments for organizers

		var shirtsizes = ["xs","s","m","l","xl","xxl"]
		var	dietarys = ["no","veg","pork","glut"]
		var tracks = ["junction","other"]
		var sexes =["male", "female","other"]

		var Users = db.define("users", {
				firstname: String,
				lastname: String,
				age: {type: 'integer'},
				email: {type:"text", key: true},
				country: String,
				sex: String,
				shirtsize: String,
				dietary: String,
				track: String,
				portfolio:String,
				question1:String,
				question2:String,
				comment:String,
				password: String,
				admin: {type: "boolean", defaultValue: false},
				accepted: Date,
				acceptedEmail: {type: "text", defaultValue: "not send"}
			}, {

				validations: {
					email: orm.enforce.unique("email taken!"),
				    sex: orm.validators.insideList(sexes, "Invalid sex"),
				    shirtsize: orm.validators.insideList(shirtsizes, "Invalid shirtsize"),
				    track: orm.validators.insideList(tracks, "Invalid track"),
				    dietary: orm.validators.insideList(dietarys, "Invalid dietary"),



				},
				methods:{
					getPassword:function(){
						return this.password;
					}
				}
			}
		);

		Users.createUser = function(user, callback){
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(user.password, salt, function(err, hash) {
					user["password"] = hash;
					Users.create(user, function(err,items){
						if(err){
							// console.log("ERRRRROR")
							console.error(err);
							callback(false)
						} else {
							console.log("User has been created succesfully.")
							callback(true)
						}
					});					
				});
			});
		};

		Users.getUserByEmail = function(addr, callback){
			Users.one({"email":addr}, function(err,user){
				if(err) throw err;
				else callback(user);
			});
		};

		Users.acceptHackers = function(users) {
			var date = dateFormat(new Date(), "isoDate");
			for(var i in users){
				Users.one({"email": users[i]}, function(err, user) {
					if(err) {
						throw err;
					} 
					if(user) {
						user.accepted = date;
						user.save();							
					}
				});
			}
		};

		Users.addApprovalEmailInformation = function(email, event) {

			Users.one({"email":email}, function(err,user){
				if(err) throw err;
				if(user) {
					user.acceptedEmail = event;
					user.save();
				}
			});
		}; 
			

		Users.comparePasswords = function(candidatePassword, hash, callback){
			bcrypt.compare(candidatePassword,hash, function(err, isMatch){
				if(err) console.error("error in compare pass" + err);
				callback(null,isMatch);
			});
		};

		// Users.isAdmin = function(userEmail){
		// 	this.getUserByEmail(userEmail, function(err, user) {
		// 		Users.one({"email":userEmail}, function(err,user){
		// 		if(err) {
		// 			throw err;	
		// 		} 
		// 		if(!user) {
		// 			return false;	
		// 		} else {
		// 			return user.admin;	
		// 		}
		// 	});
		// 	});
		// };
	/*
	Different DB queries?
	-

	*/
		Users.getUsers = function(callback){
			Users.find({admin: false}).omit('admin').omit('password').run(function(err, results) {
				if(err) {
					throw err;
				}
				callback(results);
			});
		};

		Users.getUsersWithParameters = function(params,callback){
			params.admin = false
			Users.find(params).omit('admin').run(function(err, results) {
				if(err) {
					throw err;
				}
				callback(results);
			});
		};


		return Users;
	}

};



