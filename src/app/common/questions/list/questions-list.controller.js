function QuestionsListController($log, hlg) {

    var ctrl = this;

    ctrl.$onInit = function () {

        $log.info('QuestionsListController');

        ctrl.entries = ctrl.question.current;

        $log.info('questions list ctrl : ', ctrl.question);
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