// questions.js

angular.module('SPAquiz.directives').directive('hxfQuestions', hxfQuestions);

function hxfQuestions() {
    return {
        restrict: 'E',
        templateUrl: '../templates/questionsPanel.html',
        scope: {
            entries         : '=model',
            checkedQuestion : '&checkedquestion',
            onRadioChanged  : '&onradiochanged'
        }
    }
}