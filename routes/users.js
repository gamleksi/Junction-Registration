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
  console.log(req.body);
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password =  req.body.password;
  var password2 = req.body.password2;
  var age = req.body.age
  var country = req.body.country
  var gender = req.body.gender
  var shirt = req.body.shirt
  var dietary = req.body.dietary
  var track = req.body.track
  var portfolio = req.body.portfolio
  var q1 = req.body.q1
  var q2 = req.body.q2
  var comment = req.body.comment


  //Validator 
  req.checkBody('firstname', 'firstname is required').notEmpty();
  req.checkBody('lastname', 'lastname is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'Passwords have to match').equals(password);
  req.checkBody('age', 'age is required').notEmpty();
  req.checkBody('dietary', 'dietary is required').notEmpty();
  req.checkBody('shirt', 'shirtsize is required').notEmpty();
  req.checkBody('track', 'track choice is required').notEmpty();
  req.checkBody('country', 'Country is required').notEmpty();
  req.checkBody('gender', 'Gender is required').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
	  res.render('register', {errors: errors})
  } else {
  	
      var newUser = {
        firstname: firstname,
        lastname: lastname,
        age: age,
        email: email,
        country: country,
        gender: gender,
        shirtsize: shirt,
        dietary: dietary,
        portfolio:portfolio,
        question1:q1,
        question2:q2,
        comment:comment,
        password: password
    };
  	req.models.users.createUser(newUser, function(success) {
      if(success){ 
        req.flash('success_msg', 'You are registered and can now login')
        res.redirect('login');
      }
      else {
         req.flash('error', 'Already registered with the given email.');
          res.redirect('register');
      }
  	});
  	
  }
});


passport.use('user-local', new LocalStrategy(
  {passReqToCallback : true},
  function(req, username, password, done) {
    req.models.users.getUserByEmail(username, function(user){
      console.log("value from callback:");
      console.log(user);
    	if(user === null){
    		return done(null,false,{message:"Invalid username"});
    	}
    	 req.models.users.comparePasswords(password, user.password, function(err,isMatch){
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
  passport.authenticate('user-local', {successRedirect: '/', failureRedirect:'/users/login',failureFlash: true}));

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logget out.');
	res.redirect('/');
});


passport.serializeUser(function(user, done) {
  console.log("serializeUser");
  done(null, user);
});

passport.deserializeUser(function(user, done){
 done(null, user);   
});

function ensureIsNotAuthenticated(req, res, next){
	if(!req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/');
	}
}

module.exports = router;
