function QuestionsController($state, QuestionsService, ScoreService, $uibModal, $document, hlg, $log) {

    var ctrl = this,
        currentIndex = ctrl.currentIndex = -1, // double equality needed for unit test
        questionsLength = ctrl.questionsLength = -1; // double equality needed for unit test

    ctrl.$onInit = function () {

        hlg.l('red', 6, 'QuestionsController', '');
        $log.debug('this.questions : ', ctrl.questions);

        ScoreService.init();

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
                            $uibModal.open({
                                component: 'warning',
                                resolve: {
                                    message: function () {
                                        return 'All questions must be answered';
                                    }
                                }
                            });
                        } else {
                            ScoreService.setScore();
                            $state.go('score');
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