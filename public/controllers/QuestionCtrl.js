(function() {

angular
	.module('polls')
	.controller('QuestionCtrl', QuestionCtrl);

function QuestionCtrl (questionsRef, mainService) {

	var vm = this;
	vm.test = "Hello Question";

	console.log(questionsRef);
	
	vm.getQuestion = function() {
		mainService.getQuestion().then(function(res) {
			vm.question = res;
		})
	}

	vm.getQuestion();

	vm.answerQuestion = function(id) {
		console.log(id);
		console.log(vm.question.selected)
	} 
	
}

})();