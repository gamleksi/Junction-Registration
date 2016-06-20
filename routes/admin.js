var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', ensureIsAuthenticatedAndAdmin, function(req, res) {
  res.render('admin', {layout: 'admin-layout'});     
});

router.get('/hackers', ensureIsAuthenticatedAndAdmin, function(req, res) {
  req.models.users.getUsers(function(users) {
    
    res.render('hackers',{hackers:users, layout: 'admin-layout'});
  });
});

router.get('/hackers/all', ensureIsAuthenticatedAndAdmin, function(req, res) {
  req.models.users.getUsers(function(users) {    
    console.log('%s %s', req.method, req.url);
    res.send({hackers:users});
  });
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are logget out.');
  res.redirect('/');
});
function ensureIsAuthenticatedAndAdmin(req, res, next){
  next();
  // if(!req.isAuthenticated()) {
  //   res.redirect('/');   
  // } else {
  //   if(!req.user.admin) {
  //     res.redirect('/'); 
  //   } else {
  //     next();
  //   }
  // }
}

module.exports = router; 