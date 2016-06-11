var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Use Schema

var AdminSchema = mongoose.Schema({
	username: {
		type: String,
		index: true	
	},
	password: {
		type: String
	},
	isAdmin: {
		type: Boolean,
		default: true	
	}
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getAdminByUsername = function(username,callback){
	var query = {username: username};
	Admin.findOne(query,callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword,hash, function(err, isMatch){
		if(err) throw err;
		callback(null,isMatch);
	});
};


module.exports.getAdminById = function(id,callback){
	Admin.findById(id,callback);
}