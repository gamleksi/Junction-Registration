var bcrypt = require('bcryptjs');

var password = ""
process.argv.forEach(function (val, index, array) {
  console.log(val);
  password = val;
});

bcrypt.genSalt(10, function(err, salt) {

	bcrypt.hash(password, salt, function(err, hash) { 
		console.log(hash);
	})
});

