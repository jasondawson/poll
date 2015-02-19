(function() {

angular
	.module('polls', ['ngRoute'])
	.config(config)
	/*.factory('myHttpInterceptor', myHttpInterceptor)*/;

function config ($routeProvider, $httpProvider) {
	//for unauthenticated redirects
	//$httpProvider.interceptors.push('myHttpInterceptor');

	//routes
	$routeProvider
		.when('/', {
			templateUrl: '/views/main.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.when('/welcome', {
			templateUrl: '/views/welcome.html',
			controller: 'WelcomeCtrl',
			controllerAs: 'vm',
			resolve: {
				questionsRef: function(mainService) {
					return mainService.getQuestions();
				}
			}
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
		.when('/theEnd', {
			templateUrl: '/views/theEnd.html'
		})
		.otherwise('/');
};

/*function myHttpInterceptor($q) {
	return {
		//optional method
		'responseError': function(rejection) {
			if (rejection.status == 401) {
				document.location = '/';
				return;
			}
			return $q.reject(rejection);
		}
	};
};*/

})();