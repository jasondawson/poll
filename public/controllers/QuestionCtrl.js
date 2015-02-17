(function() {

angular
	.module('polls')
	.controller('QuestionCtrl', QuestionCtrl);

function QuestionCtrl () {

	var vm = this;
	vm.test = "Hello Question";
	
}

})();