(function() {

angular
	.module('polls')
	.controller('MainCtrl', MainCtrl);

function MainCtrl (authService) {

	var main = this;
/*	main.signedIn = false;
	main.message = 'Sign in with Google'

	main.logInOut = function(isSignedIn) {
		if (!isSignedIn) {
			authService.logIn().then(function(res) {
				console.log(res);
				main.signedIn = true;
			})
		}
		else {
			authService.logOut().then(function(res) {
				console.log(res);
				main.signedOut = true;
			})
		}
	}*/

}

})();