angular
    .module('hexaquiz.common.questions', [
        'ui.router'
    ])
    .config(function ($compileProvider) {
        //$compileProvider.preAssignBindingsEnabled(true);
    })
    .config(function ($stateProvider) {
        $stateProvider
            .state('questions', {
                parent: 'app',
                url: '/questions/:idx',
                component: 'questions',
                resolve: {
                    questions: function (QuestionsService) {

                        console.log('resolve questions');

                        // return 'cool';

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