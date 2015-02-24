(function() {

angular
	.module('polls')
	.service('authService', authService);

function authService($http, $q, $rootScope) {

	var currentUser = {};

	this.getCurrentUser = function() {
		var dfd = $q.defer();
		$http.get('/auth/currentUser')
			.then(function(res) {
				currentUser = res.data;
				/*console.log(currentUser);*/
				$rootScope.currentUser = currentUser;
				dfd.resolve(currentUser);
			})
		return dfd.promise;
	}

	this.logout = function() {
		var dfd = $q.defer();
		$http.get('/auth/logout')
			.then(function() {
				currentUser = {};
				dfd.resolve();
			});
		return dfd.promise;
	}

}

})();