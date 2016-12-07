var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csv = require('express-csv')
var json2csv = require('json2csv');
var fs = require('fs');



router.get('/', authPartner, function(req, res) {
    console.log("partner")

  res.render('partner_view', {layout: 'partner-layout'});     
});



router.get('/hackers', authPartner, function(req, res) {
  req.models.users.getUsers(function(users) {
    
    res.render('partner_view',{hackers:users, layout: 'partner-layout'});
  });
});


router.get('/hackers/all', authPartner, function(req, res) {

  req.models.users.getLimitedUserInfo(function(users) {    
    res.send({hackers:users});
  });
});

router.get('/hackers/sample', authPartner, function(req, res) {

  req.models.users.getSampleUsers(function(users) {    
    res.send({hackers:users});
  });
});







router.post('/export',authPartner, function(req, res) {
    console.log('%s %s', req.method, req.url);
      
//==============
//console.log(req.body['exportData'])
var asd = req.body['exportData']
var fields = Object.keys(asd[Object.keys(asd)[0]])
 console.log(asd)

 var vals = Object.keys(req.body.exportData).map(function(key) {
    return req.body.exportData[key];
});
  var csv = json2csv({ data: vals, fields: fields });
  var date = new Date()
  var fileName = "export.csv"
 res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
   fs.writeFile(fileName, csv, function(err) {
    if (err) throw err;
    console.log('file saved');
     res.attachment(fileName);
    res.attachment(fileName);
      res.send(csv);
      res.end();

  });

//==============


});




router.get('/backup',authPartner, function(req, res) {
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
     res.attachment(fileName);
    res.attachment("ionic.app.scss");
      res.send(csv);
      res.end();

  });

//==============

  });
});




router.post('/master-search',authPartner, function(req, res) {
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
  

function authPartner(req, res, next){
  if(!req.isAuthenticated()) {
      res.redirect('/partner'); 
  } else {
    if(!req.user.partner) {
      res.redirect('/partner'); 
    } else {
      next();
    }
  }

}

module.exports = router; 