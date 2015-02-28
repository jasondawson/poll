(function() {

angular
	.module('polls')
	.controller('QuestionCtrl', QuestionCtrl);

function QuestionCtrl (mainService, $location) {

	var vm = this;
	vm.test = "Hello Question";
	
	vm.getQuestion = function() {
		mainService.getQuestion().then(function(res) {
			vm.question = res;
		})
	}



	vm.getQuestion();

	vm.answerQuestion = function(answerIndex) {
		var toRemove = vm.question.selected;
		var questionId = vm.question._id;
		mainService.answerQuestion(questionId, answerIndex, toRemove)
			.then(function(res) {
				vm.results = res;
				$location.path('/results');
			});
	}

	vm.nextQuestion = function() {

	}


	
}

})();