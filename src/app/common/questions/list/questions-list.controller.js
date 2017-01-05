function QuestionsListController(QuestionsService) {

    var ctrl = this;

    ctrl.$onInit = function () {

        var currentIndex = ctrl.transitionAlias.params().idx;
        // questionsLength = QuestionsService.getQuestions().length;

        console.log('QuestionsListController');

        ctrl.entries = this.questions[currentIndex];

        console.log(QuestionsService.currentAnswers);

        ctrl.checkedQuestion = function () {
            return QuestionsService.currentAnswers[currentIndex] === -1 ? 0 : QuestionsService.currentAnswers[currentIndex];
        };

        ctrl.onRadioChanged = function (idx) {
            QuestionsService.currentAnswers[currentIndex] = idx;
        };
    };
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsListController', QuestionsListController);