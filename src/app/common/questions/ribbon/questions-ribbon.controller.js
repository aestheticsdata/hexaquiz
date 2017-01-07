function QuestionsRibbonController() {

    var ctrl = this;

    this.$onInit = function () {

        ctrl.currentQuestionIdx = ctrl.indexes.current;
        ctrl.totalQuestionIdx   = ctrl.indexes.total;
    }
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsRibbonController', QuestionsRibbonController);