(function() {

angular
	.module('polls', ['ngRoute'])
	.config(config)

function config ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/views/main.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/welcome', {
			templateUrl: '/views/welcome.html',
			controller: 'WelcomeCtrl',
			controllerAs: 'vm'
		})
		.when('/question', {
			templateUrl: '/views/question.html',
			controller: 'QuestionCtrl',
			controllerAs: 'vm'
		})
		.when('/results', {
			templateUrl: '/views/results.html',
			controller: 'ResultsCtrl',
			controllerAs: 'vm'
		})
		.otherwise('/');
}

})();