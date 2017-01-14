function QuestionsListController(AuthService, $log) {

    var ctrl = this;

    ctrl.$onInit = function () {

        $log.info('QuestionsListController');
        $log.info('get auth : ');
        $log.info(AuthService);
        $log.info(AuthService.getAuth());

        ctrl.entries = ctrl.question.current;

        ctrl.checkedQuestion = ctrl.question.checkedQuestion();

        ctrl.radioHasChanged = function (idx) {
            console.log('radio has changed : ', idx);
            ctrl.onRadioChanged({
                $event: {
                    idx: idx
                }
            })
        };
    };
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsListController', QuestionsListController);