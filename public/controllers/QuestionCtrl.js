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

	vm.answerQuestion = function(answerIndex) {
		console.log(answerIndex);
		console.log(vm.question.selected);
		var toRemove = vm.question.selected;
		var questionId = vm.question._id;
		mainService.answerQuestion(questionId, answerIndex, toRemove)
			.then(function(res) {
				console.log(res);
			});
	} 
	
}

})();