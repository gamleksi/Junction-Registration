var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csv = require('express-csv')
var json2csv = require('json2csv');
var fs = require('fs');

router.get('/', authPartner, function(req, res) {
  res.render('partner_view', {layout: 'partner-layout'});     
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/hackers', authPartner, function(req, res) {
  req.models.users.getUsers(function(users) {
    
    res.render('partner_view',{hackers:users, layout: 'partner-layout'});
  });
});


router.get('/hackers/all', authPartner, function(req, res) {

  req.models.users.getUsers(function(users) {    
    res.send({hackers:users});
  });
});




router.get('/export',authPartner, function(req, res) {
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
  // if(!req.isAuthenticated()) {
  //   res.redirect('/');   
  // } else {
  //   if(!req.user.admin) {
  //     res.redirect('/'); 
  //   } else {
  //     next();
  //   }
  // }
  next();
}

module.exports = router; 