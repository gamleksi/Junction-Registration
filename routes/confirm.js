var express = require('express');
var router = express.Router();
var UserDB = require('../models/user');

router.param('hash', function (req, res, next, hash) {
  console.log(hash)
  req.models.users.hash
  next();
});

router.get('/:value/:hash', function (req, res, next) {
	console.log(req.params.param + req.params.hash)

		if(req.params.value === "accept" || req.params.value === "reject"){
			req.models.users.changeStatusWithHash(req.params.value,req.params.hash, function(result){
				console.log(result)
			});
		}
  	next();
});


module.exports = router;
