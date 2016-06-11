var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', ensureIsAuthenticatedAndAdmin, function(req, res) {
  res.render('admin', {layout: 'admin-layout'});     
});

router.get('/login', function(req, res) {
  res.render('admin-login', {layout: 'admin-layout'})
});

passport.use('admin-local', new LocalStrategy(
  function(username, password, done) {


    Admin.getAdminByUsername(username, function(err,user){

      
      if(err) throw err;
      if(!user){
        return done(null,false,{message:"Invalid username or password"});
      }
      Admin.comparePassword(password,user.password,function(err,isMatch){
        if(err) throw err;
        if(isMatch){
          console.log("isMatch")
          console.log(user)
          return done(null, user)
        } else {
          done(null,false,{message:'Invalid username or password'})
        }
      })
    })
  }
));

router.get('/hackers', ensureIsAuthenticatedAndAdmin, function(req, res) {
  req.models.users.getUsers(function(err,users) {
    if(err) throw err;
    res.render('hackers',{hackers:users, layout: 'admin-layout'})
  })
})

router.post('/login',
  passport.authenticate('admin-local', {successRedirect:'/admin', failureRedirect:'/admin/login',failureFlash: true}));


function ensureIsAuthenticatedAndAdmin(req, res, next){
  if(!req.isAuthenticated()) {
    res.render('admin-login', {layout: 'admin-layout'});   
  } else {
    if(!req.user.isAdmin) {
      res.redirect('/'); 
    } else {
      next();
    }
  }
}

module.exports = router; 