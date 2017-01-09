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
                    questions: function (QuestionsService) {
                        console.log('resolve questions');
                        return QuestionsService.retrieveQuestions()
                            .then(
                                function onSuccess(res) {
                                    console.log(res);
                                    QuestionsService.setQuestions(res);
                                    return QuestionsService.questions.data;
                                }
                            )
                            .catch(
                                function onError(err) {
                                    console.log('error while retrieving questions : ', err);
                                }
                            )
                    }
                }
            });
    });