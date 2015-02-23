(function() {

angular
	.module('polls')
	.controller('MainCtrl', MainCtrl);

function MainCtrl (authService, $location) {

	var main = this;

	main.logout = function() {
		authService.logout()
			.then(function() {
				$location.path('/')
			});
	}
}

})();