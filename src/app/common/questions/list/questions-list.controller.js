function QuestionsListController($scope) {
    this.$onInit = function () {
        console.log('QuestionsListController');
        this.entries = this.questions[0];
    };
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsListController', QuestionsListController);