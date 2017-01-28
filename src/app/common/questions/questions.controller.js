function QuestionsController($state, QuestionsService, hlg) {

    var ctrl = this,
        currentIndex = -1,
        questionsLength = -1;

    ctrl.$onInit = function () {

        console.log('QuestionsController');
        console.log('this.questions : ', ctrl.questions);


        questionsLength = ctrl.questions.length;

        currentIndex = ctrl.transitionAlias.params().idx;

        /// nav ///
        ctrl.isPrevDisabled = (parseInt(currentIndex) === 0);

        ctrl.navTo = function (e) {
            var answered = true;
            switch(e.dir){
                case 'prev':
                    $state.go('questions', {
                        idx:currentIndex === 0 ? currentIndex : parseInt(currentIndex-1)
                    });
                    break;
                case 'next':
                    if (parseInt(currentIndex) === questionsLength-1) {
                        for (var i=0, l=QuestionsService.currentAnswers.length; i<l;i++){
                            if (QuestionsService.currentAnswers[i] === -1) {
                                answered = false;
                            }
                        }
                        if (!answered) {
                            window.alert('you did not anwser to some questions');
                        } else {
                            // $state.go('score');
                        }
                    } else {
                        $state.go('questions', {
                            idx:parseInt(currentIndex)+1
                        });
                    }
                    break;
            }
        };
        ///////////

        /// questions list ///
        ctrl.questionsListQuestion = {
            current: ctrl.questions[currentIndex],
            checkedQuestion: function () {
                return QuestionsService.currentAnswers[currentIndex] === -1 ? -1 : QuestionsService.currentAnswers[currentIndex];
            }
        };

        ctrl.changeSelected = function (e) {
            hlg.l('green', 3, 'changeSelected', e);
            hlg.l('green', 6, 'changeSelected', QuestionsService.currentAnswers);
            QuestionsService.currentAnswers[currentIndex] = e.idx;
            hlg.l('green', 9, 'changeSelected', QuestionsService.currentAnswers);
        };


        /// questions ribbon ///
        ctrl.ribbonIndexes = {
            current:parseInt(currentIndex, 10)+1,
            total:questionsLength
        };
        ////////////////////////
    };

}

angular
    .module('hexaquiz.common.questions')
    .controller('QuestionsController', QuestionsController);