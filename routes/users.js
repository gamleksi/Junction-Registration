var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserDB = require('../models/user');
 form_values = require('../FORM_VALUES.js')
 country_values = require('../COUNTRIES_DATA.js')
var sendgrid = require('../sendgrid/sendgrid.js')


/* GET users listing. */
router.get('/', ensureIsNotAuthenticated, function(req, res) {
  res.render('register',{form_values: form_values,
                        country_home_values:country_values,
                        country_from_values:country_values})
});


router.get('/thanks', ensureIsNotAuthenticated, function(req, res) {
  res.render('thanks')
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
  var postBody = ["firstname","lastname","email","phone","age","countryFrom","city","countryHome","sex","shirtsize","dietary","track","team","portfolio","occupation","skill","experience","role","secret","team","motivation","secretCode","comment","tc","operating","sublime"]

  var bodyObj = {}
  console.log("POSTBODY")
  for(i in postBody) {
    console.log(postBody[i])
    bodyObj[postBody[i]] = req.body[postBody[i]]
  }

  console.log("LANGUAGES")
  console.log(postBody.languages)
  //Validator 
  req.checkBody({'firstname': {
    notEmpty: true,
    isLength: {
      options: [{min: 1, max: 25}],
      errorMessage: 'Must be between 1 and 15 chars long' 
    },
    errorMessage: 'Firstname is required'
  }});

  req.checkBody({'lastname': {
    notEmpty: true,
    isLength: {
      options: [{max: 30}],
      errorMessage: 'Too long string' 
    },
    errorMessage: 'Lastname is required'
  }});

  req.checkBody({'email': {
    isEmail: {
      errorMessage: 'Invalid Email'
    },
    notEmpty: true,
    isLength: {
      options: [{max: 30}],
      errorMessage: 'Too long email' 
    },
    errorMessage: 'Lastname is required'
  }});

  req.checkBody({'age': {
    isInt: {
      errorMessage: 'Invalid value'
    },
    notEmpty: true,
    isLength: {
      options: [{max: 3}],
      errorMessage: 'Too long email' 
    },
    errorMessage: 'Age is required'
  }});
  
  req.checkBody({'city': {
    isInt: {
      errorMessage: 'Invalid value'
    },
    notEmpty: true,
    isLength: {
      options: [{max: 50}],
      errorMessage: 'Too long city' 
    },
    errorMessage: 'City is required'
  }});  

  req.checkBody({'city': {
    isInt: {
      errorMessage: 'Invalid value'
    },
    notEmpty: true,
    isLength: {
      options: [{max: 50}],
      errorMessage: 'Too long city' 
    },
    errorMessage: 'City is required'
  }});  

  req.checkBody({'phone': {
    isLength: {
      options: [{max: 50}],
      errorMessage: 'Too long phone number' 
    }
  }});  

  req.checkBody({'secretCode': {
    isLength: {
      options: [{max: 50}],
      errorMessage: 'Too long city' 
    }
  }});

  req.checkBody({'comment': {
    isLength: {
      options: [{max: 400}],
      errorMessage: 'Too long comment' 
    }
  }});

  req.checkBody({'motivation': {
    notEmpty: true,
    isLength: {
      options: [{max: 400}],
      errorMessage: 'Max char 400' 
    },
    errorMessage: 'Fill this text area'
  }});


  // req.checkBody('password', 'password is required').notEmpty();
  // req.checkBody('password2', 'Passwords have to match').equals(password);
  req.checkBody('dietary', 'Dietary is required').notEmpty();
  req.checkBody('sex', 'Gender is required').notEmpty();  
  req.checkBody('shirtsize', 'shirtsize is required').notEmpty();
  req.checkBody('track', 'track choice is required').notEmpty();
  req.checkBody('countryFrom', 'Country is required').notEmpty();
  req.checkBody('countryHome', 'Country is required').notEmpty();
  req.checkBody('occupation', 'Please answer the question.').notEmpty();
  req.checkBody('experience', 'Please answer the question.').notEmpty();
  req.checkBody('skill', 'Please answer the question.').notEmpty();
  req.checkBody('role', 'Choose a role please.').notEmpty();
  req.checkBody('sex', 'Gender is required').notEmpty();
  req.checkBody('tc', 'Please agree terms.').notEmpty();
  var errors = req.validationErrors();

  var failedPost = bodyObj;
  console.log("FORM VALUES ")
  console.log(failedPost)
      
    var form_values_with_errors = JSON.parse(JSON.stringify(form_values));
    for(i in form_values){
      form_values_with_errors[i] = form_values[i]
    }
    for(i in form_values_with_errors  ){
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

    var country_home_with_errors = JSON.parse(JSON.stringify(country_values));
    var country_from_with_errors = JSON.parse(JSON.stringify(country_values));
  
      if(failedPost["countryHome"]){
            country_home_with_errors.forEach(function(obj){
          
              if(failedPost["countryHome"] === obj.code){
                obj.selected = "selected"
              }
            });
        }
          if(failedPost["countryFrom"]){
            country_from_with_errors.forEach(function(obj){
          
              if(failedPost["countryFrom"] === obj.code){
                obj.selected = "selected"
              }
            });
          }

        


  if(errors) {
     var error_messages = {}
    errors.forEach(function(v) {
      error_messages[v.param] = v.msg
    });
    console.log(errors)

	  res.render("register", {errors: errors,
                            error_messages:error_messages,
                            failedPost:failedPost,
                            form_values: form_values_with_errors,
                            country_from_values:country_from_with_errors,
                             country_home_values:country_home_with_errors})
  } else {
  	 
      var time =  new Date().getTime() 
      var refuseHash = time + Math.random().toString(36).substring(7).toUpperCase();
      var invitationHash = Math.random().toString(36).substring(7).toUpperCase() + time;
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
        role:role,
        team:team,
        secret:secret,
        skills:skills,
        invitationHash: invitationHash,
        refuseHash: refuseHash,
        password:"junction2016"
    };
  	req.models.users.createUser(newUser, function(success) {
      if(success){ 
        sendgrid.sendRegisterConfirmation(email, firstname, refuseHash);
        req.flash('success_msg', "You are registered succesfully, we sent you a email to your email address '"+email+"'. Please check your inbox and trash/spam folder. In case you didn't get it, please get in contact or register again.")
        res.redirect('thanks');
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
    	if(user === null){
    		return done(null,false,{message:"Invalid username"});
    	}
    	 req.models.users.comparePasswords(password, user.password, function(err,isMatch){
    		if(err) throw err;
    		if(isMatch){
    			return done(null, user);
    		} 
        else {
    			done(null,false,{message:'Invalid password'});
    		}

    	});
    
    });
  
  }

));

router.post('/login',
  passport.authenticate('user-local', {successRedirect: '/', failureRedirect:'/login',failureFlash: true}));

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
