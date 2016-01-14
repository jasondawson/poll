(function () {

    angular
        .module('polls', ['ngRoute',
            'ngSanitize',
            'ngAnimate',
            'formly',
            'formlyBootstrap'])
        .config(config)
        .factory('myHttpInterceptor', myHttpInterceptor)
        .run(run);

    function config($routeProvider, $httpProvider) {
        //for unauthenticated redirects
        $httpProvider.interceptors.push('myHttpInterceptor');

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
                css: '',
                resolve: {
                    questionsRef: function (mainService) {
                        return mainService.getQuestions();
                    },
                    currentUserRef: function (authService) {
                        return authService.getCurrentUser();
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
            .when('/question/submit', {
                templateUrl: '/views/questionSubmit.html',
                controller: 'QuestionSubmitCtrl',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: '/views/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'vm',
                resolve: {
                    userProfileRef: function (mainService) {
                        return mainService.getUserProfile();
                    }
                }
            })
            .otherwise('/');
    };

    function myHttpInterceptor($q) {
        return {
            //optional method
            'responseError': function (rejection) {
                if (rejection.status == 401) {
                    console.log('Redirected');
                    document.location = '/';
                    return;
                }
                return $q.reject(rejection);
            }
        };
    };


    function run($rootScope, $location, authService) {
        authService.getEnv().then(function (env) {
            if (env === 'production') {
                console.log('Welcome!')
            } else {
                console.log('Welcome Developer!');
            }
        })
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            authService.getCurrentUser().then(function (res) {
                if (res.length) {
                    $rootScope.currentUser = res;
                }
                if (!$rootScope.currentUser) {

                    $location.path('/');
                }
            });

        })

    }

})();
