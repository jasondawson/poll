(function() {

angular
	.module('polls')
	.service('authService', authService);

function authService($http, $q) {

	currentUser = {};

	this.getCurrentUser = function() {
		var dfd = $q.defer();
		$http.get('/auth/currentUser')
			.then(function(res) {
				currentUser = res;
				console.log(currentUser);
				dfd.resolve(currentUser);
			})
		return dfd.promise;
	}

}

})();