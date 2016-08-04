var express = require('express');
var router = express.Router();
var UserDB = require('../models/user');



router.get('/:hash', function (req, res, next) {
	req.models.users.refuseHashMatches(req.params.hash,function(email){
		if(email){
			req.models.users.refuseHacker(email);
			res.render('message', {message:"Thanks for your interest in Junction. Maybe next year :(("});
		}else{
			res.render('message',{error:"Invalid link. <3"})
		}
	});
});

module.exports = router;