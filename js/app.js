// app.js

angular.module('SPAquiz', ['SPAquiz.directives', 'SPAquiz.controllers', 'SPAquiz.services', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {


        $stateProvider

            .state('login', {
                url         : '/login',
                templateUrl : 'partials/login.html',
                controller  : 'LoginController'
            })

            .state('quiz', {
                url         : '/questions/:idx',
                templateUrl : 'partials/questions.html',
                controller  : "QuestionsController"
            })

            .state('score', {
                url         : '/score',
                templateUrl : 'partials/score.html',
                controller  : "ScoreController"
            })

            .state('404', {
                url         : '/404',
                templateUrl : 'partials/404.html'
            });

        $urlRouterProvider.otherwise('/login');
    })

    .run(function ($state) {
        $state.go('login');
    });