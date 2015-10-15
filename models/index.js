
var mongoose = require('mongoose').connect('mongodb://127.0.0.1:27017/hackthonVote'),
  db = mongoose.connection;


/*
 *  Schema of Group
 */
var Team = new mongoose.Schema({
	name : { type: String },
	imgURL : { type: String },
	projectName: { type: String },
	createDate : { type: Date },
	vote: { type: Number },
	members : []
});


/*
 *  Schema of VoteLog
 */
var Vote = new mongoose.Schema({
	userID : { type: String },
	projectID : { type: String },
	voteTime : { type: Date }
});


//exports model
module.exports = {
  Team : db.model('team', Team),
	Vote : db.model('voteLog', Vote)
};