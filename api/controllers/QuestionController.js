var Mongoose = require('mongoose');
var Question = require('./../models/questionModel');
var User = require('./../models/userModel');
var Q = require('q');


module.exports = {

	addQuestion: function(req, res) {
		newQuestion = req.body;
		if (newQuestion.choices.length <= 4) {
			Question.create(req.body, function(err, results) {
				if (err) {
					res.status(500).json(err);
				} else {
					res.status(200).json(results);
				}
			});
		} else {
			res.status(400).json('Too many answer choices');
		}
	},

	getQuestions: function(req, res) {
		Question
			.find()
			.where('active').equals(true)
			.select('_id text choices')
			.exec()
			.then(function(questions) {
				res.status(200).json(questions);
			})
	},

	answerQuestion: function(req, res) {
		Question
			.findById(req.params.questionId)
			.exec()
			.then(function(response) {
				response.choices[req.params.answerIndex].timeschosen++;
				response.save();
				//increment number of user responses
				User
					.findOne({'googleId': req.user.id})
					.exec()
					.then(function(currentUser) {
						currentUser.num_answered++;
						currentUser.save();
						res.status(200).json(response);
					})
			})

	/*	Question
			.findByIdandUpdate(req.params.questionId, req.body)*/
	}

}