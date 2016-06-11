// var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');

// // Use Schema

// var UserSchema = mongoose.Schema({
// 	firstname: {
// 		type: String
// 	},
// 	lastname: {
// 		type: String
// 	},
// 	email: {
// 		type: String,
// 		index: true	
// 	},
// 	password: {
// 		type: String
// 	},
// 	isAdmin: {
// 		type: Boolean,
// 		default: false
// 	}
// });

// var User = module.exports = mongoose.model('User', UserSchema);

// module.exports.createUser = function(newUser, callback) {
// 	bcrypt.genSalt(10, function(err, salt) {
// 		bcrypt.hash(newUser.password, salt, function(err, hash) {
// 			newUser.password = hash;
// 			newUser.save(callback)
// 		});
// 	});
// };

// module.exports.getUserByEmail = function(email,callback){
// 	var query = {email: email};
// 	User.findOne(query,callback);
// };

// module.exports.comparePassword = function(candidatePassword, hash, callback){
// 	bcrypt.compare(candidatePassword,hash, function(err, isMatch){
// 		if(err) throw err;
// 		callback(null,isMatch);
// 	});
// }

// module.exports.updateProfile = function(toUpdate,callback){
// 	for(var value in toUpdate){
		
		
// 	}

// }


// module.exports.getUserById = function(id,callback){
// 	User.findById(id,callback);
// }

// module.exports.getUsers = function(callback){
// 	User.find({}, callback);
// }





// module.exports.createUser = function(newUser, callback) {
// 	bcrypt.genSalt(10, function(err, salt) {
// 		bcrypt.hash(newUser.password, salt, function(err, hash) {
// 			newUser.password = hash;
// 			newUser.save(callback)
// 		});
// 	});
// };

var bcrypt = require('bcryptjs');

module.exports = {
	createModel: function(db) {

		var Users = db.define("users", {
				firstname: String,
				lastname: String,
				email: String,
				password: String,
				admin: Boolean
			}, {
				methods: {

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
			User.find({email: addr}, function(err, item) {
				if(err) callback(err);
				else callback(item);
			});
		};

		Users.comparePasswords = function(suggestedPass, hash, callback){
			bcrypt.compare(suggestedPass, hash, function(err, isMatch){
				if(err) throw err;
				callback(null,isMatch);
			});
		};

//{ col1: orm.eq(123) }

		return Users;
	}

};



