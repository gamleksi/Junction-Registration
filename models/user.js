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