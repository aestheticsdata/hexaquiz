function QuestionsListController() {
    this.$onInit = function () {
        console.log('QuestionsListController');
    };
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsListController', QuestionsListController);