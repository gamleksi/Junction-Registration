var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserDB = require('../models/user');
 form_values = require('../FORM_VALUES.js')
 country_values = require('../COUNTRIES_DATA.js')
var sendgrid = require('../sendgrid/sendgrid.js')

/* GET users listing. */
router.get('/register', ensureIsNotAuthenticated, function(req, res) {
  res.render('register',{form_values: form_values,country_values:country_values})
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
  var sex = req.body.sex
  var shirtsize = req.body.shirtsize
  var dietary = req.body.dietary
  var track = req.body.track
  var portfolio = req.body.portfolio
  var q1 = req.body.q1
  var q2 = req.body.q2
  var comment = req.body.comment


  //Validator 
  req.checkBody('firstname', 'Firstname is required.').notEmpty();
  req.checkBody('lastname', 'Lastname is required.').notEmpty();
  req.checkBody('email', 'Email is required.').notEmpty();
  req.checkBody('email', 'Email is not valid.').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'Passwords have to match').equals(password);
  req.checkBody('age', 'age is required').notEmpty();
  req.checkBody('dietary', 'dietary is required').notEmpty();
  req.checkBody('shirtsize', 'shirtsize is required').notEmpty();
  req.checkBody('track', 'track choice is required').notEmpty();
  req.checkBody('country', 'Country is required').notEmpty();
    req.checkBody('q1', 'Please answer the question.').notEmpty();
  req.checkBody('q2', 'Please answer the question.').notEmpty();

  req.checkBody('sex', 'Gender is required').notEmpty();

  var errors = req.validationErrors();
 


  var failedPost = {
        firstname: firstname,
        lastname: lastname,
        age: age,
        email: email,
        country: country,
        sex: sex,
        shirtsize: shirtsize,
        dietary: dietary,
        track:track,
        portfolio:portfolio,
        q1:q1,
        q2:q2,
        comment:comment
      };
      console.log("FORM VALUES ")
      console.log(failedPost)
      
    var form_values_with_errors = JSON.parse(JSON.stringify(form_values));
    // for(i in form_values){
    //   form_values_with_errors[i] = form_values[i]
    // }
    for(i in form_values_with_errors  ){
      console.log(i)
      if(failedPost[i]){
               // console.log(failedPost[i])
            form_values_with_errors[i].forEach(function(obj){
              // console.log("OBJECT")
              // console.log(obj)
              if(failedPost[i] === obj.value){
                obj.checked = "checked"
              }
            });
          }
        }

    var country_values_with_errors = JSON.parse(JSON.stringify(country_values));
  
      console.log(i)
      if(failedPost["country"]){
            country_values_with_errors.forEach(function(obj){
          
              if(failedPost["country"] === obj.code){
                obj.selected = "selected"
              }
            });
          }
        
        console.log(country_values_with_errors)


  if(errors) {
     var error_messages = {}
    errors.forEach(function(v) {
      error_messages[v.param] = v.msg
    });
    console.log("ERRORS IN FORM")
    //console.log(errors)
    console.log(form_values_with_errors)

	  res.render("register", {errors: errors,
                            error_messages:error_messages,
                            failedPost:failedPost,
                            form_values: form_values_with_errors,
                            country_values:country_values_with_errors})
  } else {
  	 
      var time =  new Date().getTime() 
      var hash = Math.random().toString(36).substring(7).toUpperCase() + time
      var newUser = {
        firstname: firstname,
        lastname: lastname,
        age: age,
        email: email,
        country: country,
        track:track,
        sex: sex,
        shirtsize: shirtsize,
        dietary: dietary,
        portfolio:portfolio,
        question1:q1,
        question2:q2,
        comment:comment,
        password: password,
        hash: hash
    };
  	req.models.users.createUser(newUser, function(success) {
      if(success){ 
        sendgrid.sendRegisterConfirmation(email);
        req.flash('success_msg', "You are registered succesfully, we sent you a email to your email address '"+email+"'. Please check your inbox and trash/spam folder. In case you didn't get it, please get in contact or register again.")
        res.redirect('login');
      }
      else {
         //req.flash('error', 'Already registered with the given email.');
          res.render('register',{
              errors:{'error': 'Already registered with the given email.'},
              failedPost:failedPost,
              form_values: form_values_with_errors,country_values:country_values_with_errors,
              error_messages: {"email":"Email already in use." }
            });
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
