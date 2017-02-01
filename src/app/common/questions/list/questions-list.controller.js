function QuestionsListController($log, hlg) {

    var ctrl = this;

    ctrl.$onInit = function () {

        $log.debug('QuestionsListController');

        ctrl.entries = ctrl.question.current;

        $log.debug('questions list ctrl : ', ctrl.question);
        ctrl.checkedQuestion = ctrl.question.checkedQuestion();

        ctrl.radioHasChanged = function (idx) {
            $log.debug('radio has changed : ', idx);
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