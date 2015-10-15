var express = require('express');
var router = express.Router();
var models = require('../models');
var multer  = require('multer');


var imgPath = 'public/images/teamPic';
var now = Date.now();
teamPic = multer({ dest: imgPath,
  rename: function (fieldname, filename, req) {
    newTeam = req.body;
    return newTeam.name + now;
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    newTeam.imgURL = file.path.replace('public', '');
    done=true;
  }
})
router.post('/',teamPic , function (req, res, next) {
  newTeam = req.body;
  newTeam.vote = 0;
  newTeam.createDate = now;
  // newTeam.memberCount
  var i = 1;
  newTeam.members = [];
  while(i < newTeam.memberCount){ //newTeam.memberCount = 5
    if(newTeam["name"+i]){
      member = {
        name: newTeam["name"+i],
        phone: newTeam["phone"+i],
      }
      newTeam.members.push(member);
    }
    i++;
  }
    

  var team = new models.Team(newTeam);

  team.save(function (err, result) {
    if (err) {
      console.log('[POST] create group FAIL, err ->', err);
    } else {
      console.log('[POST] create group success, result ->', result);
      // res.json( result );
      res.redirect('/');
    }
  });

});

module.exports = router;