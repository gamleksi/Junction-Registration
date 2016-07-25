var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csv = require('express-csv')
var json2csv = require('json2csv');
var fs = require('fs');

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

router.post('/hackers/accept-selected', ensureIsAuthenticatedAndAdmin, function(req, res, next) {
  var selected=req.body.selected;
  console.log("SELECTED");
  console.log(selected);
  sendgrid.sendApprovalMails(selected, function(responseObject) {
    if(responseObject.statusCode === 202 || responseObject.statusCode === 200) {
        console.log("Emails sent");
        console.log(responseObject.emails);
        req.models.users.acceptHackers(selected);

    } else {
        console.log("Sending failed");   
    }
    });
        res.send();
});

router.get('/backup', function(req, res) {
    console.log('%s %s', req.method, req.url);
   req.models.users.getUsers(function(users) {
      
//==============

var fields = Object.keys(users[0])

  var csv = json2csv({ data: users, fields: fields });
  var date = new Date()
  var fileName = "test.csv"
 res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  fs.writeFile(fileName, csv, function(err) {
    if (err) throw err;
    console.log('file saved');
    res.download(fileName)
  });
  console.log(fileName)

//==============

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