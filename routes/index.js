var express = require('express');
var router = express.Router();
 form_values = require('../FORM_VALUES.js')
 country_values = require('../COUNTRIES_DATA.js')
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user && req.user.admin){
			res.redirect('/admin/')
	} else {
  		res.render('register',{form_values: form_values,
  					country_values:country_values})
	}
  	
});

module.exports = router;
