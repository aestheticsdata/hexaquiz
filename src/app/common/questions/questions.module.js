angular
    .module('hexaquiz.common.questions', [
        'ui.router'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('questions', {
                parent: 'app',
                url: '/questions/:idx',
                component: 'questions',
                resolve: {
                    qs: function (QuestionsService) {

                        console.log('resolve questions');

                        return QuestionsService.retrieveQuestions()
                            .then(
                                function onSuccess(res) {

                                    console.log(res);

                                    QuestionsService.setQuestions(res);
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