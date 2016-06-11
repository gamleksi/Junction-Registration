var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserDB = require('../models/user');


/* GET users listing. */
router.get('/register', ensureIsNotAuthenticated, function(req, res) {
  res.render('register')
});

router.get('/login', ensureIsNotAuthenticated, function(req, res) {
  res.render('login')
});



router.get('/account', function(req, res){
	res.render('account');
});


router.get('/edit_profile', function(req, res){
	res.render('edit_profile');
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
  	

    var newUser = {
  		firstname: firstname,
  		lastname: lastname,
  		email: email,
  		password: password
  	};

  	req.models.users.createUser(newUser, function(err, user) {
      if(err) console.error(err);   
  		console.log(user);
  	});
  	req.flash('success_msg', 'You are registered and can now login')
  	res.redirect('login')
  }
});


var UserDB = require('../models/user.js')

passport.use('user-local', new LocalStrategy(
  {passReqToCallback : true},
  function(req,username, password, done) {
    req.models.users.getUserByEmail(username, function(value){
      console.log("value from callback:" + value)
    	if(value === null){
    		return done(null,false,{message:"Invalid username"});
    	}
    	 req.models.users.comparePasswords(password, function(err,isMatch){
    		if(err) throw err;
    		if(isMatch){
    			console.log('isMatch true');
    			return done(null, user);
    		} 
        else {
    			done(null,false,{message:'Invalid passwrong'});
    		}

    	});
    
    });
  
  }

));

router.post('/login',
  passport.authenticate('user-local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}));

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logget out.');
	res.redirect('/')
})






passport.serializeUser(function(user, done) {
  console.log("serializeUser")

  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  Admin.findById(id, function(err, user){
    if(err) done(err);
      if(user){
        done(null, user);
      } else {
         User.findById(id, function(err, user){
         if(err) done(err);
         done(null, user);
      })
    }
  });
});

function ensureIsNotAuthenticated(req, res, next){
	if(!req.isAuthenticated()) {
		return next();
	} else {
		//req.flash('error_msg', "You are already logged in")
		res.redirect('/')
	}
}

module.exports = router;
