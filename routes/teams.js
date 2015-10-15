var express = require('express');
var router = express.Router();
var models = require('../models');

/* ====================================
 *  TEST api
 *
 *
 * [GET] test create team
 */
router.get('/create/us', function (req, res, next) {

  //new entity
  var team = new models.Team({
    name: 'WashWashSeelp',
    imgURL: 'https://hackathon.tw/img/study.jpg',
		projectName: 'hackthon vote',
		createDate : Date.now(),
		vote: 12,
		members :[
			{ id : 'A001', name : 'Webber', phone : '0901000000' },
			{ id : 'A002', name : 'Bejamin', phone : '0902000000' },
			{ id : 'A003', name : 'Simon', phone : '0903000000' },
			{ id : 'A004', name : 'Dca', phone : '0904000000' },
			{ id : 'A005', name : 'Vincent', phone : '0905000000' },
			{ id : 'A006', name : 'Andrew', phone : '0906000000' }
		]
  });

  //save it
  team.save(function (err, result) {
    if (err) {
      console.log('[TEST] create group FAIL, err ->', err);
			//res.json( err );

    } else {
      console.log('[TEST] create group success, result ->', result);
			res.json( result );
    }
  });

});

var dirtyTestData = {
  teamCount : 0
}

router.get('/create/test', function (req, res, next) {

  var testIndex = dirtyTestData.teamCount++;

  //new entity
  var team = new models.Team({
    name: 'TeamName' + testIndex,
    imgURL: 'https://hackathon.tw/img/study.jpg',
    projectName: 'projectName' + testIndex,
    projectDetail : 'ForWhat XXXXXX' + testIndex,
    createDate : Date.now(),
    github: 'https://github.com/hey-hackthon/HangeeHackthon-Vote',
    vote: Math.floor((Math.random() * 15) + 1),
    members :[
      { id : 'A001', name : 'Webber', phone : '0901000000' },
      { id : 'A002', name : 'Bejamin', phone : '0902000000' },
      { id : 'A003', name : 'Simon', phone : '0903000000' },
      { id : 'A004', name : 'Dca', phone : '0904000000' },
      { id : 'A005', name : 'Vincent', phone : '0905000000' },
      { id : 'A006', name : 'Andrew', phone : '0906000000' }
    ]
  });

  //save it
  team.save(function (err, result) {
    if (err) {
      console.log('[TEST] create group FAIL, err ->', err);
      //res.json( err );

    } else {
      console.log('[TEST] create group success, result ->', result);
      res.json( result );
    }
  });

});


/* ====================================
 * NEW
 *
 *
 * [POST] create a team
 */
// router.post('/team', function (req, res, next) {

// 	var newTeam = req.body.team;

// 	//console.log('team', team);

// 	team.createDate = Date.now();
// 	team.vote = 0;

// 	//add this info to DB
//   var team = new models.Team(newTeam);

//   team.save(function (err, result) {
//     if (err) {
//       console.log('[POST] create group FAIL, err ->', err);

//     } else {
// 			res.json( result );
//       console.log('[POST] create group success, result ->', result);
//     }
//   });

// });



/* ====================================
 * SEARCH
 *
 *
 * [GET] get all teams & team's project info
 */
router.get('/teams', function (req, res, next) {

  //new entity
  models.Team.find( {}, function (err, result) {

    if (err) {
      console.log('[GET] the teams info FAIL, err ->', err);

    } else {
      res.json(result);
      console.log('[GET] the teams info success', result);
    }
  });
});



/*
 * [GET] get the teams & team's project info, with id
 */
router.get('/team:id', function (req, res, next) {

  var query = { _id: req.params.id };

  //new entity
  models.Team.findOne(query, function (err, result) {

    if (err) {
      console.log('[GET] all teams info FIAL, err ->', err);

    } else {
      res.json(result);
      console.log('[GET] all teams info success, result ->', result);
    }
  });
});



/* ====================================
 * MODIFY
 *
 *
 * [PUT] modify group & porject info, with id
 */
router.put('/teams:id', function (req, res, next) {

  var query = { _id: req.params.id };
	var newInfo = req.body.newInfo;

  models.Team.update(query, newInfo, function(err, result){

    if (err) {
      console.log('[PUT] modyfi team info FAIL, err->', result);
      res.json({ err: err });

    } else {
      console.log('[PUT] modyfi team info success, result->', result);
      //res.json({ data: result });
    }
  });
});



/*
 * [PUT] vote, with id
 */
// router.put('/vote:id', function (req, res, next) {

//   var query = { _id: req.params.id };

//   models.Team.update(query, { $inc: { vote: 1 } }, function(err, result){

//     if (err) {
//       console.log('[PUT] vote, FAIL, err ->', err);
//       res.json({ err: err });

//     } else {
//       console.log('[PUT] vote, success, result ->', result);
//       res.json({ data: result });
//     }
//   });
// });



/*
 * [PUT] vote teamSSSS, with id[]
 */
router.put('/vote/s', function (req, res, next) {
  console.log(req.body)
  var query = req.body['id[]'] ;

	query.forEach(function(id){
		models.Team.update({_id : id}, { $inc: { vote: 1 } }, function(err, result){

			if (err) {
				console.log('[PUT] voteS, FAIL, err ->', err);
				//res.json({ err: err });

			} else {
				//console.log('[PUT] voteS, success, result ->',id , result);
				//res.json({ data: result });
			}
		});
	});
  res.end();
});




/*
 * [PUT] unVote, with id
 */
router.put('/unVote:id', function (req, res, next) {

  var query = { _id: req.params.id };

  models.Team.update(query, { $inc: { vote: -1 } }, function(err, result){

    if (err) {
      console.log('[PUT] unVote, FAIL, err ->', err);
      res.json({ err: err });

    } else {
      console.log('[PUT] unVote, success, result ->', result);
      res.json({ data: result });
    }
  });
});


/* ====================================
 * DELETE
 *
 *
 * [DELETE] remove a team
 */
router.delete('/teams:id', function (req, res, next) {

	var query = { _id: req.params.id };

	models.Team.remove(query, function (err) {
		if(err){
			console.log('[DELETE] delete team FAIL, err ->', err);
		}else{
			console.log('[DELETE] delete team success ');
		}
		res.end();
	});
});








module.exports = router;