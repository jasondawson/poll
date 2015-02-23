(function() {

angular
	.module('polls')
	.controller('WelcomeCtrl', WelcomeCtrl);

function WelcomeCtrl (currentUserRef) {

	var vm = this;
	vm.test = "Hello, Welcome";
	console.log(vm.test)
}

})();