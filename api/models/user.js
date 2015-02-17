var Mongoose = require('mongoose');
var Q = require('q');

var schema = Mongoose.Schema({
	//user schema
});




schema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(12, function(err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			return next();
		});
	});
});

schema.methods.comparePassword = function (pass) {
	var dfd = q.defer();
	bcrypt.compare(pass, this.password, function(err, isMatch) {
		if (err) {
			dfd.reject(err);
		}
		else {
			dfd.resolve(isMatch);
		}
	});
	return dfd.promise;
};

module.exports = Mongoose.model('User', schema);