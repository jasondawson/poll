(function() {

angular
	.module('polls')
	.controller('WelcomeCtrl', WelcomeCtrl);

function WelcomeCtrl () {

	var vm = this;
	vm.test = "Hello, Welcome";
}

})();