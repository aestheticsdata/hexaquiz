function QuestionsListController() {
    this.$onInit = function () {
        console.log('QuestionsListController');
        this.entries = this.questions[this.currentIndex];
        console.log('current index : ', this.currentIndex);
    };
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsListController', QuestionsListController);