var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csv = require('express-csv')
var json2csv = require('json2csv');
var fs = require('fs');

router.all('/', ensureIsAuthenticatedAndAdmin, function(req, res) {
  console.log("IN ADMIN")
  res.render('admin', {layout: 'admin-layout'});     
});

router.get('/login', function(req, res) {
    console.log("IN ADMIN login")

  res.render('login');
});

router.get('/hackers', ensureIsAuthenticatedAndAdmin, function(req, res) {
  req.models.users.getUsers(function(users) {
    
    res.render('hackers',{hackers:users, layout: 'admin-layout'});
  });
});


router.get('/hackers/all', ensureIsAuthenticatedAndAdmin, function(req, res) {

  req.models.users.getUsers(function(users) {    
    res.send({hackers:users});
  });
});

router.get('/hackers/accepted', ensureIsAuthenticatedAndAdmin, function(req, res) {

  req.models.users.getAcceptedUsers(function(users) {
    res.send({hackers:users});
  });
});

var sendgrid = require('../sendgrid/sendgrid.js')


router.post('/hackers/accept-selected', ensureIsAuthenticatedAndAdmin, sendEmails, function(req, res, statusCode) {
  if(req.body.statusCode === 202 || req.body.statusCode === 200) {
    
    req.models.users.acceptHackers(req.body.selected, function(accepted) {
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
        console.log("Sending failed. StatusCode: " + statusCode); 
      }
      console.log(selected);
      req.body.statusCode = statusCode;
      next();
    });
};

router.get('/backup',ensureIsAuthenticatedAndAdmin, function(req, res) {
    console.log('%s %s', req.method, req.url);
   req.models.users.getUsers(function(users) {
      
//==============

var fields = Object.keys(users[0]);

  var csv = json2csv({ data: users, fields: fields });
  var date = new Date()
  var fileName = "test.csv"
 res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  fs.writeFile(fileName, csv, function(err) {
    if (err) throw err;
    console.log('file saved');
    res.download(fileName)
  });

//==============

  });
});
router.post('/webhook/:key', function(req, res) {

  if(process.env.WEBHOOK_KEY === req.params.key) {
    console.log("webhook from Sendgrid")
    console.log(req.body);  
    for(i in req.body){
        req.models.users.addWebhookInformation(req.body[i].email, req.body[i].event)
    }
    res.send();
  } else {
    console.log("wrong key")
  }
});

router.post('/hackers/save-modification', function(req, res){

  var hacker = req.body.hacker;
  console.log(hacker)
  req.models.users.modifyUserInformation(hacker, function(result) {
    var status = 200;
    if(!result) {
      status = 400;
    }

    res.sendStatus(status); 
  })
});


router.post('/hackers/reload-previous',ensureIsAuthenticatedAndAdmin, function(req, res) {
  console.log('/hackers/reload-previous')
  var updated = [];
  var previous = req.body.previous;
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
    res.sendStatus(404);
  }
});

router.post('/master-search',ensureIsAuthenticatedAndAdmin, function(req, res) {
   var query = req.body.query;
   for(key in query.filterShow) {
    if(query.filterShow[key] === undefined) {
      delete query.filterShow[key];
    }
   }
   if(query.sortBy) {
      query.sortBy = query.sortBy.filter(function(value) {
        console.log(value);
        return value !== undefined && value !== 'Select';
      });
      console.log(query.sortBy);
   }  
  req.models.users.masterSearch(req.body.query, function(hackers) {

    res.send({"hackers": hackers});  
  });    
});
  

function ensureIsAuthenticatedAndAdmin(req, res, next){
  if(!req.isAuthenticated()) {
    res.redirect('/');   
  } else {
    if(!req.user.admin) {
      res.redirect('/'); 
    } else {
      next();
    }
  }
}

module.exports = router; 
