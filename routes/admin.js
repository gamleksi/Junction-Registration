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


router.post('/hackers/accept-selected', ensureIsAuthenticatedAndAdmin, function(req, res) {
  var selected=req.body.selected;
  console.log("selected");
  console.log(selected);    
  req.models.users.acceptHackers(selected, function(users){
    console.log(users);
    res.send({accepted: users});
  });
});

function ensureIsAuthenticatedAndAdmin(req, res, next){
  
  //Outcommented for testing purpose
  // if(!req.isAuthenticated()) {
  //   res.redirect('/');   
  // } else {
  //   if(!req.user.admin) {
  //     res.redirect('/'); 
  //   } else {
      next();
  //   }
  // }
}

module.exports = router; 