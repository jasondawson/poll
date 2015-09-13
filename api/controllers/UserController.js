var User = require('./../models/userModel');
var Profile = require('./../models/profileModel');
var Q = require('q');

module.exports = {
	updateOrCreate: function(user){
		var deferred = Q.defer();
		User.findOne({ 'socialId': user.id }, function(err, results){
			if(err) return deferred.reject(err);
			if(results){
				User.update({ _id: results._id }, {
					name: user._json.name,
					link: user._json.link,
					picture: user._json.picture || 'http://graph.facebook.com/v2.2/' + user.id + '/picture',
					gender: user._json.gender
				}, function(err, results){
					if(err){
						return deferred.reject(err);
					} else {
						User.findOne({ 'socialId': user.id}, function(profile) {
								deferred.resolve(profile);
							})

					}
				});
			} else {
				//if ()
				User.create({
					accountType: user.provider,
					socialId: user.id,
					name: user._json.name,
					link: user._json.link,
					picture: user._json.picture,
					gender: user._json.gender
				}, function(err, results){
					if(err){
						return deferred.reject(err);
					} else {
						deferred.resolve(results);
					}
				});

				Profile.create({
					socialId: user.id
				});
			}
		})
		return deferred.promise;
	},
	getUser: function(id){
		var deferred = Q.defer();
		User.findOne({ 'socialId': id }, function(err, results){
			if(err){
				deferred.reject(err);
			} else {
				deferred.resolve(results);
			}
		})
		return deferred.promise;
	},
	getUserProfile: function(id) {
		var dfd = Q.defer();
		Profile.findOne({ 'socialId': id}, function(err, results) {
			if (err) {
				dfd.reject(err);
			} else {
				dfd.resolve(results);
			}
		})
		return dfd.promise;
	}
}
