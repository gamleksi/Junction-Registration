var bcrypt = require('bcryptjs');
var orm = require('orm');
var dateFormat = require('dateformat');

module.exports = {
	createModel: function(db) {

		var Users = db.define("users", {
				firstname: String,
				lastname: String,
				age: {type: 'integer'},
				email: {type:"text", key: true},
				country: String,
				gender: ["male", "female"],
				password: String,
				motivation: String,
				skillDescription: String,
				admin: {type: "boolean", defaultValue: false},
				accepted: Date,
				acceptedEmail: {type: "text", defaultValue: "not send"}
			}, {

				validations: {
					email: orm.enforce.unique("email taken!")

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
							console.error(err);
						} else {
							console.log("User has been created succesfully.")
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

		Users.acceptHackers = function(users, callback) {
			var date = dateFormat(new Date(), "isoDate");
			var arr = [];
			var errorOccured = [];
			var innerFunction = function(index) {
					Users.one({"email": users[i]}, function(err, user) {
						if(err) {
							errorOccured.push(users[i]);
							throw err;
						} 
						if(user) {
							user.accepted = date;
							user.save(function(err) {								
								if(!err) {
									//console.log("user");
									arr.push(user.email);
								} else {
									throw err;
									errorOccured.push(users[i]);		
								}
								if(index == (users.length-1)) {
									callback(arr);
								}
							});							
						}	
							
					});
			}

			for(var i in users){
				innerFunction(i);
			}
		};

		Users.addApprovalEmailInformation = function(email, event) {
			Users.getUserByEmail(email, function(user){
			
			});

			Users.one({"email":email}, function(err,user){
				if(err) throw err;
				else {
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

		Users.getUsers = function(callback){
			Users.find({admin: false}, function(err, results) {
				if(err) {
					throw err;
				}
				callback(results);
			});
		};

		return Users;
	}

};



