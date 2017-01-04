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
                    currentIndex: function ($transition$) {
                        return $transition$.params().idx;
                    },
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