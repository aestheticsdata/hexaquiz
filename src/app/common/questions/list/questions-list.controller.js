function QuestionsListController() {
    this.$onInit = function () {
        var currentIndex = this.transitionAlias.params().idx;
        console.log('QuestionsListController');
        this.entries = this.questions[currentIndex];
    };
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsListController', QuestionsListController);