(function() {

angular
	.module('polls')
	.service('authService', authService);

function authService($http, $q) {

/*	this.logIn = function() {
		var dfd = $q.defer();
		$http.get('/auth/google')
			.success(function(res) {
				console.log(res);
			})
			.error(function(err) {
				console.log(err);
			})
		return dfd.promise;
	}*/

}

})();