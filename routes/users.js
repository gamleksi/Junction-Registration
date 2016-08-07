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
  var postBody = ["firstname","lastname","email","phone","age","countryFrom","city","countryHome","sex","shirtsize","dietary","track","team","portfolio","occupation","skills","experience","school","role","team","motivation","secret","comment","tc","operating","sublime"]

  var bodyObj = {}
  console.log("POSTBODY")
  //console.log(req.body.skills)
  for(i in postBody) {
    bodyObj[postBody[i]] = req.body[postBody[i]]
  }

 
  //Validator 
  req.checkBody({'firstname': {
    notEmpty: true,
    isLength: {
      options: [{max: 50}],
      errorMessage: 'Too long string' 
    },
    errorMessage: 'Firstname is required'
  }});

  req.checkBody({'lastname': {
    notEmpty: true,
    isLength: {
      options: [{max: 50}],
      errorMessage: 'Too long string' 
    },
    errorMessage: 'Lastname is required'
  }});

  req.checkBody({'school': {
    isLength: {
      options: [{max: 100}],
      errorMessage: 'Too long string' 
    },
    errorMessage: 'School is required'
  }});  

  req.checkBody({'email': {
    isEmail: {
      errorMessage: 'Invalid Email'
    },
    notEmpty: true,
    isLength: {
      options: [{max: 60}],
      errorMessage: 'Too long email' 
    },
    errorMessage: 'Email is required.'
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

  req.checkBody({'secret': {
    isLength: {
      options: [{max: 100}],
      errorMessage: 'Too long secret code' 
    }
  }});

  req.checkBody({'comment': {
    isLength: {
      options: [{max: 5000}],
      errorMessage: 'Char limit 5000' 
    }
  }});

  req.checkBody({'portfolio': {
    isLength: {
      options: [{max: 5000}],
      errorMessage: 'Char limit 5000' 
    }
  }});

  req.checkBody({'motivation': {
    notEmpty: true,
    isLength: {
      options: [{max: 5000}],
      errorMessage: 'Max char 5000' 
    },
    errorMessage: 'Fill this text area'
  }});

  req.checkBody({'skills': {
    notEmpty: true,
    isLength: {
      options: [{max: 1000}],
      errorMessage: 'Max char 1000' 
    },
    errorMessage: 'At least one skill is required.'
  }});  

  // req.checkBody('password', 'password is required').notEmpty();
  // req.checkBody('password2', 'Passwords have to match').equals(password);
  req.checkBody('dietary', 'Dietary choice is required.').notEmpty();
  req.checkBody('sex', 'Gender is required').notEmpty();  
  req.checkBody('shirtsize', 'Shirtsize is required.').notEmpty();
  req.checkBody('track', 'Track choice is required').notEmpty();
  req.checkBody('countryFrom', 'Country is required').notEmpty();
  req.checkBody('countryHome', 'Country is required').notEmpty();
  req.checkBody('occupation', 'Please answer the question.').notEmpty();
  req.checkBody('experience', 'Please answer the question.').notEmpty();
  req.checkBody('role', 'Choose a role please.').notEmpty();
  req.checkBody('sex', 'Gender is required').notEmpty();
  req.checkBody('tc', 'Please agree with the terms.').notEmpty();

  var errors = req.validationErrors();

  var failedPost = JSON.parse(JSON.stringify(bodyObj));
  
  var copied_init_values = JSON.parse(JSON.stringify(form_values));

  var form_values_with_errors = JSON.parse(JSON.stringify(copied_init_values));
  for(i in copied_init_values){
      form_values_with_errors[i] = copied_init_values[i]
  }
    for(i in form_values_with_errors  ){
      if(failedPost[i]){
        
        if(i === "skills" &&  failedPost[i] !== ""){
          for(e in failedPost[i]){

                  form_values_with_errors[i].forEach(function(obj){ 
                    if(failedPost[i][e] === obj.value){
                      obj.checked = "checked"
                    }
                });
                }
              }
               // console.log(failureRedirectdPost[i])
          form_values_with_errors[i].forEach(function(obj){
            
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
    //console.log(errors)
	  res.render("register", {errors: errors,
                            error_messages:error_messages,
                            failedPost:failedPost,
                            form_values: form_values_with_errors,
                            country_from_values:country_from_with_errors,
                             country_home_values:country_home_with_errors})
  } else {
  	 
      var time =  new Date().getTime();
      var refuseHash = time + Math.random().toString(36).substring(7).toUpperCase();
      var invitationHash = Math.random().toString(36).substring(7).toUpperCase() + time;
      var newUser = bodyObj;

      newUser["refuseHash"] = refuseHash;
      newUser["invitationHash"] = invitationHash;
      req.models.users.createUser(newUser, function(cb) {

          if(cb.error){
            if(cb.error.code === "23505"){

               res.redirect('register',{
                  errors:{'error': 'Something went wrong.'},
                  failedPost:failedPost,
                  form_values: form_values_with_errors,country_home_values:country_home_with_errors,country_from_values:country_from_with_errors,
                  error_messages: {"email":"Email already in use." }
                });
             }
             else{
                  res.render('register',{
                  errors:{'error': 'Already registered with the given email.'},
                  failedPost:failedPost,
                  form_values: form_values_with_errors,country_home_values:country_home_with_errors,country_from_values:country_from_with_errors,
                  error_messages: {"common":"Something went wrong." }
                });
             }
          }

          else {
              sendgrid.sendRegisterConfirmation(newUser.email, newUser.firstname, refuseHash);
              req.flash('success_msg', "Thanks for your application! We have sent you an email to your email address " +newUser.email+". Please check your inbox, spam and other folders. In case you don’t receive a confirmation in a short period of time, please get in contact with participants@hackjunction.com.")
              res.redirect('thanks');
      
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
  passport.authenticate('user-local', {successRedirect: '/admin', failureRedirect:'/login',failureFlash: true}));

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
