function QuestionsRibbonController() {

    this.$onInit = function () {

        var questionsLength = this.questions.length,
            currentIndex    = this.transitionAlias.params().idx;

        this.currentQuestionIdx = parseInt(currentIndex, 10) + 1; // array 0 based
        this.totalQuestionIdx   = questionsLength;
    }
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsRibbonController', QuestionsRibbonController);