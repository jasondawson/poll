(function() {

angular
	.module('polls')
	.controller('ResultsCtrl', ResultsCtrl);

function ResultsCtrl ($location, mainService) {

	var vm = this;

	vm.getResults = function() {
		vm.results = mainService.getCurrentResults();
		console.log(vm.results)
	}

	vm.nextQuestion = function() {
		$location.path('/question');
	}

	vm.getResults();
}

})();