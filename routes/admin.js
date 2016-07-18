var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sendgrid = require('../sendgrid/sendgrid.js')


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
  
  sendgrid.sendApprovalMails(selected, function(statusCode) {
    if(statusCode === 202 || statusCode === 200) {
      console.log("Emails sent");
      req.models.users.acceptHackers(selected);
      res.send({statusCode: statusCode}) 
    } else {
      console.log("Sending failed");
      res.send({statusCode: statusCode})
    }
    });

});


router.post('/webhook', isFromSendGrid, function(req, res) {
  console.log("webhook"); 
  console.log(req.body)
  console.log(req.body[0].email + ": " +req.body[0].event);
  req.models.users.addApprovalEmailInformation(req.body[0].email, req.body[0].event)
  res.send();
});


function isFromSendGrid(req, res, next) {
  // TODO
  next();
}
  

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