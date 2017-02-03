var app = {
    templateUrl: './app.html',
    controller: 'AppController',
};

angular
    .module('hexaquiz.common')
    .component('app', app)
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                redirectTo: 'questions',
                url: '/app',
                resolve : {
                    // questions: function (QuestionsService, $log, hlg) {
                    //     hlg.l('red',10,'resolve questions');
                    //     hlg.l('green',2,'resolve questions', QuestionsService.questions);
                    //     if (QuestionsService.questions.length === 0) {
                    //         return QuestionsService.retrieveQuestions()
                    //             .then(
                    //                 function onSuccess(res) {
                    //                     $log.debug(res);
                    //                     QuestionsService.setQuestions(res);
                    //                     return QuestionsService.questions;
                    //                 }
                    //             )
                    //             .catch(
                    //                 function onError(err) {
                    //                     $log.debug('error while retrieving questions : ', err);
                    //                 }
                    //             )
                    //     } else {
                    //         return QuestionsService.questions;
                    //     }
                    // }
                },
                data: {
                    requiredAuth: true
                },
                component: 'app',
                params : {idx:0} // this params is used in 'questions' state because 'app' state redirectTo 'questions' state
            });
    });