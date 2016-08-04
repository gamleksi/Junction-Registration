var express = require('express');
var router = express.Router();
var UserDB = require('../models/user');




router.get('/:value/:hash', function (req, res, next) {
	console.log('%s %s', req.method, req.url);
		if(req.params.value === "accept"){
			req.models.users.changeStatusWithHash(req.params.value,req.params.hash, function(result){
				console.log(result)
				if(result){
					res.render('accept')
				}else{
					res.render('message',{error:"Something went wrong. Check your link."})
				}
			});
		} else if(req.params.value === "reject"){

			req.models.users.changeStatusWithHash(req.params.value,req.params.hash, function(result){
				console.log(result)
				if(result){
					res.render('message',{message:"Thanks for your interest in Junction."})
				}else{
					res.render('message',{error:"Something went wrong. Check your link."})
				}			
			});
		}
		else{
			next();
		}	
});

router.get('/decide/:hash', function (req, res, next) {
	req.models.users.invitationHashMatches(req.params.hash,function(result){
		if(result){
			res.render('reject',{hash:req.params.hash})
		}else{
			res.render('message',{error:"Invalid link."})
		}
	});
});

module.exports = router;
