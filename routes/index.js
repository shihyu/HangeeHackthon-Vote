var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function (req, res, next) {
	//console.log(req.route);
	models.Team.find( {}, function (err, result) {
    if (err) {
      console.log('[GET] the teams info FAIL, err ->', err);
    } else {
	    res.render('index', {
				title: 'Hackathon 6th Vote',
				data: result,
		    path: req.route.path
			});
    	// console.log('[GET] the teams info success', result);
    }

  });

});

module.exports = router;