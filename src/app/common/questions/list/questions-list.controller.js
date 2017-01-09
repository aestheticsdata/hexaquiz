function QuestionsListController() {

    var ctrl = this;

    ctrl.$onInit = function () {

        console.log('QuestionsListController');

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