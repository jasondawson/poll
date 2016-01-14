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
    
    this.getEnv = function () {
        var dfd = $q.defer();
        $http.get('/api/env')
            .then(function (env) {
                dfd.resolve(env.data)
            })
            .catch(function (err) {
                dfd.reject(err);
            })
        return dfd.promise;
    }

}

})();
