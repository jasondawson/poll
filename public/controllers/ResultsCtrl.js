(function() {

angular
	.module('polls')
	.controller('ResultsCtrl', ResultsCtrl);

function ResultsCtrl () {

	var vm = this;
	vm.test = "Hello Results";
}

})();