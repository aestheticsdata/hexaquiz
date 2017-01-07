function QuestionsController($transitions, $state) {

    var ctrl = this;
    var currentIndex,
        questionsLength;

    ctrl.$onInit = function () {

        console.log('QuestionsController');
        console.log($transitions);
        console.log('this.questions : ', ctrl.questions);


        questionsLength = ctrl.questions.length;

        currentIndex = ctrl.transitionAlias.params().idx;

        ctrl.isPrevDisabled = (parseInt(currentIndex) === 0);
    };

    ctrl.navTo = function (e) {
        switch(e.dir){
            case 'prev':
                $state.go('questions', {
                    idx:currentIndex === 0 ? currentIndex : parseInt(currentIndex-1)
                });
                break;
            case 'next':
                if (parseInt(currentIndex) === questionsLength-1) {
                    // $state.go('score');
                } else {
                    $state.go('questions', {
                        idx:parseInt(currentIndex)+1
                    });
                }
                break;
        }
    }


}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsController', QuestionsController);