(function() {

angular
	.module('polls')
	.service('mainService', mainService);

function mainService ($http, $q, $location) {

	var mS = this;

	var apiUrl = 'http://127.0.0.1:8080';
	var questionsArr = [];
	var currentResults = {};

	var removeCachedQuestion = function(index) {
		questionsArr.splice(index, 1);
	}

	this.getCurrentResults = function() {
		return currentResults;
	}



	this.getQuestion = function() {
			var dfd = $q.defer();
		if (!questionsArr.length) {
			console.log('refresh questions')
			mS.getQuestions().then(function() {
				var arrIndex = Math.floor(Math.random() * (questionsArr.length - 0)) + 0;
				var currentQuestion = questionsArr[arrIndex];
				currentQuestion.selected = arrIndex;
				dfd.resolve(currentQuestion)
			});
		} 
		else {

		var arrIndex = Math.floor(Math.random() * (questionsArr.length - 0)) + 0;
		var currentQuestion = questionsArr[arrIndex];
		currentQuestion.selected = arrIndex;
		dfd.resolve(currentQuestion)
	}
		return dfd.promise;		
		}


	this.getQuestions = function() {
		var dfd = $q.defer();
		if (!questionsArr.length) {
		$http.get(apiUrl + '/api/questions')
			.success(function(res) {
				//console.log(res);
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
		//increment count to appropriate response 
		var dfd = $q.defer();
		$http.put(apiUrl + '/api/questions/' + questionId + '/' + answerIndex)
			.success(function(res) {
				//TODO remove question from cache questionArr
				removeCachedQuestion(toRemove);
				//add total times answered as a property on currentResults
				var total = 0;
				for (var i = 0; i < res.choices.length; i++) {
					total += res.choices[i].timeschosen;
				}
				currentResults = res;
				currentResults.total = total;
				dfd.resolve();
			})
			.error(function(err) {
				console.log(err);
			})
		return dfd.promise;
	}

	this.addQuestion = function(questionObj) {
		var dfd = $q.defer();
		var newQuestion = {};
			newQuestion.text = questionObj.text;
			delete questionObj.text;
			newQuestion.choices = [];
			for (var key in questionObj) {
				if (questionObj[key]) {
					newQuestion.choices.push({"answer": questionObj[key]});
				}
			}
			
			$http.post(apiUrl + '/api/questions', newQuestion)
				.success(function(res) {
					console.log(res);
					dfd.resolve();
				})
		return dfd.promise;
	}

}

})();