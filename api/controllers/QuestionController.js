var Question = require('./../models/questionModel');
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
			.select('_id text choices')
			.exec()
			.then(function(questions) {
				res.status(200).json(questions);
			})
	}

}