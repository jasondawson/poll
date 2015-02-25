var Mongoose = require('mongoose');
var Q = require('q');

var schema = Mongoose.Schema({
	socialId: {type: Number, required: true, unique: true},
	bio: String
});

module.exports = Mongoose.model('Profile', schema);