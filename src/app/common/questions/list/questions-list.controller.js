function QuestionsListController($log, hlg) {

    var ctrl = this;

    ctrl.$onInit = function () {

        $log.info('QuestionsListController');
        hlg.l('blue', 0, 'test de hlg : ', ctrl);

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