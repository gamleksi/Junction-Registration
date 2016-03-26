var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/register', function(req, res) {
  res.render('register')
});

router.get('/login', function(req, res) {
  res.render('login')
});

//Register User
router.post('/register', function(req, res) {
  console.log(req.body)
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password =  req.body.password;
  var password2 = req.body.password2;

  //Validator 
  req.checkBody('firstname', 'firstname is required').notEmpty();
  req.checkBody('lastname', 'lastname is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'Passwords have to match').equals(password);

  var errors = req.validationErrors();
  if(errors) {
	  res.render('register', {errors: errors})
  } else {
  	var newUser = new User({
  		firstname: firstname,
  		lastname: lastname,
  		email: email,
  		password: password
  	});
  	User.createUser(newUser, function(err, user) {
  		if(err) throw err;
  		console.log(user);
  	});

  	req.flash('success_msg', 'You are registered and can now login')

  	res.redirect('login')
  }

});

module.exports = router;
