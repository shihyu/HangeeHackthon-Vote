var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('results', {
		title: '投票結果'
	});
});

module.exports = router;
