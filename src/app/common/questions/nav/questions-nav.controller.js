function QuestionsNavController($state) {

    var ctrl=this;

    ctrl.$onInit = function () {

        var currentIndex = this.transitionAlias.params().idx,
            questionsLength = this.questions.length;

        console.log('QuestionsNavController');

        ctrl.isPrevDisabled = (parseInt(currentIndex) === 0);
        ctrl.isNextDisabled = false;

        ctrl.prev = function () {
            console.log('previous btn');
            $state.go('questions', {idx:currentIndex === 0 ? currentIndex : parseInt(currentIndex-1)});
        };

        ctrl.next = function () {
            if (parseInt(currentIndex) === questionsLength-1) {
                $state.go('score');
            } else {
                $state.go('questions', {idx:parseInt(currentIndex)+1});
            }
        }
    }
}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsNavController', QuestionsNavController);