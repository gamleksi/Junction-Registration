var express = require('express');
var router = express.Router();



router.get('/', function (req, res, next) {
	res.render('closed');
});
router.get('/login', ensureIsNotAuthenticated, function(req, res) {
  res.render('login')
});

module.exports = router;