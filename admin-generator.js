var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost/loginapp')
var db = mongoose.connections;

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


createUser = function(newUser, callback) {

	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
				newUser.password = hash;
				newUser.save(callback)
		});
	});
};

createUser(new Admin({username: "admin", password: "admin"}))

