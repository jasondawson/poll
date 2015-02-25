var Mongoose = require('mongoose');
var Profile = require('./../models/profileModel');
var Q = require('q');

module.exports = {

	updateProfile: function(req, res) {
		var dfd = Q.defer();
		newProfile = req.body;
		console.log(newProfile);
		Profile.findByIdAndUpdate(req.body._id, req.body, function(err, result) {
			console.log(result);
			res.status(200).json(newProfile);
		})
		
		return dfd.promise;
	}

}