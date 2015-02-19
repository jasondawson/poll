(function() {

angular
	.module('polls')
	.service('mainService', mainService);

function mainService ($http, $q) {

	var apiUrl = 'http://127.0.0.1:8080';
	var questionsArr = [];

	this.getQuestion = function(num) {
		if(num) {
			questionsArr.splice(num, 1);
		}
		var dfd = $q.defer();
		var arrIndex = Math.floor(Math.random() * (questionsArr.length - 0)) + 0;
		var currentQuestion = questionsArr[arrIndex];
		currentQuestion.selected = arrIndex;
		//questionsArr[arrIndex].selected = arrIndex;
		//console.log(questionsArr[arrIndex].selected);
		dfd.resolve(currentQuestion)
		return dfd.promise;
	}

	this.getQuestions = function() {
		var dfd = $q.defer();
		if (!questionsArr.length) {
		$http.get(apiUrl + '/api/questions')
			.success(function(res) {
				console.log(res);
				questionsArr = res;
				dfd.resolve();
			})
			.error(function(err) {
				dfd.reject(err);	
			})
		return dfd.promise;
		}
	}

	this.answerQuestion = function(questionId, answerIndex, toRemove) {
		//increment count to appropriate response and remove question from cached questionArr
		var dfd = $q.defer();
		$http.put(apiUrl + '/api/questions/' + questionId + '/' + answerIndex)
			.success(function(res) {
				dfd.resolve(res);
			})
			.error(function(err) {
				console.log(err);
			})
		return dfd.promise;
	}

}

})();