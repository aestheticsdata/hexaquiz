function QuestionsController($transitions) {

    var ctrl = this;

    ctrl.$onInit = function () {

        console.log('QuestionsController');
        console.log($transitions);
        console.log('this.questions : ', ctrl.questions);
    };
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsController', QuestionsController);