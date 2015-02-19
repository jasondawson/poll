(function() {

angular
	.module('polls')
	.service('mainService', mainService);

function mainService ($http, $q) {

	var apiUrl = 'http://127.0.0.1:8080';
	var questionsArr = [];

	this.getQuestion = function() {
		var dfd = $q.defer();
		arrIndex = Math.floor(Math.random() * (questionsArr.length - 0)) + 0;
		console.log(arrIndex);
		console.log(questionsArr[arrIndex]);
		//questionsArr[arrIndex].selected = arrIndex;
		//console.log(questionsArr[arrIndex].selected);
		dfd.resolve(questionsArr[arrIndex])
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

}

})();