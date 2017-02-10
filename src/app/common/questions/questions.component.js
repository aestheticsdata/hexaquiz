var questions = {
    bindings: {
        transitionAlias:'<',
        questions:'<'
    },
    templateUrl: './questions.html',
    controller: 'QuestionsController'
};

angular
    .module('hexaquiz.common.questions')
    .component('questions', questions)
    .config(function ($stateProvider) {
        $stateProvider
            .state('questions', {
                parent: 'app',
                url: '/questions/:idx',
                component: 'questions',
                resolve: {
                    transitionAlias: '$transition$', // see https://github.com/angular-ui/ui-router/issues/3110
                }
            });
    });