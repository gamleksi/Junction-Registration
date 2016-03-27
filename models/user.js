var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Use Schema

var UserSchema = mongoose.Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	email: {
		type: String,
		index: true	
	},
	password: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.save(callback)
		});
	});
}

module.exports.getUserByEmail = function(email,callback){
	var query = {email: email};
	User.findOne(query,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword,hash, function(err, isMatch){
		if(err) throw err;
		callback(null,isMatch);
	});
}

module.exports.updateProfile = function(toUpdate,callback){
	for(var value in toUpdate){
		
		
	}

}


module.exports.getUserById = function(id,callback){
	User.findById(id,callback);
}