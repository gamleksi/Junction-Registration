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
router.get('/hackers/accepted', ensureIsAuthenticatedAndAdmin, function(req, res) {

  req.models.users.getAcceptedUsers(function(users) {    
    console.log('%s %s', req.method, req.url);
    res.send({hackers:users});
  });
});

var sendgrid = require('../sendgrid/sendgrid.js')


router.post('/hackers/accept-selected', ensureIsAuthenticatedAndAdmin, sendEmails, function(req, res, statusCode) {
  console.log("statuscode")
  if(req.body.statusCode === 202 || req.body.statusCode === 200) {
    
    req.models.users.acceptHackers(req.body.selected, function(accepted) {
      console.log("accepted[i]")
      for(var i in accepted) {
        accepted[i].index = req.body.selected[accepted[i].email].index;
      }
      res.send({"accepted": accepted, "statusCode": req.body.statusCode});  
    });    
  } else {
    var result = {"statusCode": req.body.statusCode};
    res.send(result);
  }
});

function sendEmails(req, res, next) {
  var selected = req.body.selected;
  console.log(selected)
  sendgrid.sendApprovalMails(selected, function(statusCode) {
    if(statusCode === 202 || statusCode === 200) {
      console.log("Emails sent");
    } else {
      console.log("Sending failed"); 
    }
      req.body.statusCode = statusCode;
      next();
    });
}


router.post('/webhook', isFromSendGrid, function(req, res) {
  console.log("webhook"); 
  console.log(req.body);
  console.log(req.body[0].email + ": " +req.body[0].event);
  req.models.users.addApprovalEmailInformation(req.body[0].email, req.body[0].event)
  res.send();
});

function isFromSendGrid(req, res, next) {
  // TODO
  next();
}


router.post('/hackers/reload-previous', function(req, res) {
  console.log('/hackers/reload-previous')
  var updated = [];
  var previous = req.body.previous;
  console.log(previous)
  if(previous) {
  var previousLength = Object.keys(previous).length;
    for(email in previous) {
      req.models.users.getUsersWithParameters({"email": email}, function(result) {
        var user = result[0];
        user["index"] = previous[user.email]["index"];
        updated.push(user);
        if(previousLength === updated.length) {
          res.send({"updated": updated})
        } 
      });  
    }
  } else {
    res.sendStatus(404)
  }

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