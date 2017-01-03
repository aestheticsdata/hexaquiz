function QuestionsNavController() {
    this.$onInit = function () {
        console.log('QuestionsNavController');
    }
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsNavController', QuestionsNavController);