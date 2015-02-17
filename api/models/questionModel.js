var Mongoose = require('mongoose');
var Q = require('q');

var schema = Mongoose.Schema({
	//question schema
	text: {type: String, required: true},
	//may need to separate out these to individual responses?
	responses: [{type: String}],
	answered: [{type: Number}]
	//categories: [{type: String}]
});


module.exports = Mongoose.model('Question', schema);