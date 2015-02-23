var Mongoose = require('mongoose');
var Q = require('q');

var schema = Mongoose.Schema({
	//question schema
	text: {type: String, required: true},
	//may need to separate out these to individual responses?
	choices: [{
			answer: {type: String},
			timeschosen: {type: Number, default: 0}
		}],
	active: {type: Boolean, default: false}
	//categories: [{type: String}]
});


module.exports = Mongoose.model('Question', schema);