// QuestionsController.js

angular.module('SPAquiz.controllers').controller('QuestionsController', QuestionsController);

function QuestionsController($scope, $state, $stateParams, QuestionsService) {


    var currentIndex    = $stateParams.idx,
        questionsLength = QuestionsService.getQuestions().length;



    if (QuestionsService.questions.length == 0) {
        $state.go('login');
    }

    $scope.isPrevDisabled = (parseInt(currentIndex) === 0);
    $scope.isNextDisabled = false;

    $scope.questions = QuestionsService.getQuestions(currentIndex);
    $scope.currentQuestionIdx = parseInt(currentIndex, 10) + 1; // array 0 based
    $scope.totalQuestionIdx   = questionsLength;




    $scope.checkedQuestion = function () {
        console.log('checkedQuestion');
        return QuestionsService.currentAnswers[currentIndex] === -1 ? 0 : QuestionsService.currentAnswers[currentIndex];
    };

    $scope.onRadioChanged = function (idx) {
        QuestionsService.currentAnswers[currentIndex] = idx;
        console.log('radio has changed : ', idx);
    };

    $scope.prev = function () {
        $state.go('quiz', {idx:currentIndex === 0 ? currentIndex : parseInt(currentIndex-1)});
    };

    $scope.next = function () {
        if (parseInt(currentIndex) === questionsLength-1) {
            $state.go('score');
        } else {
            $state.go('quiz', {idx:parseInt(currentIndex)+1});
        }
    }
}
