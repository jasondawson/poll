var User = require('./../models/userModel');
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
						deferred.resolve(results);
					}
				})
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
				})
			}
		})
		return deferred.promise;
	},
	getUser: function(id){
		//console.log(id);
		var deferred = Q.defer();
		User.findOne({ 'socialId': id }, function(err, results){
			if(err){
				deferred.reject(err);
			} else {
				//console.log(results);
				deferred.resolve(results);
			}
		})
		return deferred.promise;
	},
/*	put: function(req, res){
		delete req.body._id;
		console.log(req.body)
		User.update({ '_id': req.params.id }, req.body, function(err, results){
			console.log(err, results);
			if(err){
				res.status(500).json(err);
			} else {
				res.status(200).json(results);
			}
		})
	}*/
}