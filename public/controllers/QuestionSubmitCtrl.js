(function() {

angular
	.module('polls')
	.controller('QuestionSubmitCtrl', QuestionSubmitCtrl);

function QuestionSubmitCtrl (mainService, $timeout, $location) {

	var vm = this;
	vm.submitMessage = "Question has been submitted. Thank you!";
	vm.showMessage = false;

	vm.formData = {};
	vm.formFields = [{
        "type": "textarea",
        "key": "text",
        "templateOptions": {
		      "placeholder": "Question",
		      "label": "Enter Question:",
		      "rows": 3,
		      "cols": 15,
		      required: true
        }
	},
	{
		"type": "input",
		"key": "choice0",
		"templateOptions": {
			"placeholder": "1st response",
			"required": true
		}
	},
	{
		"type": "input",
		"key": "choice1",
		"templateOptions": {
			"placeholder": "2nd response",
			"required": true
		}
	},
	{
		"type": "input",
		"key": "choice2",
		"templateOptions": {
			"placeholder": "(optional) 3rd response",
		}
	},
	{
		"type": "input",
		"key": "choice3",
		"templateOptions": {
			"placeholder": "(optional) 4th response",
		}
	},
	]
	;


	vm.onSubmit = function() {
		mainService.addQuestion(vm.formData)
			.then(function() {
				vm.formData = {};
				vm.showMessage = true;
				$timeout(function() {
					vm.showMessage = false;
				}, 2500);
			})

	}

}

})();