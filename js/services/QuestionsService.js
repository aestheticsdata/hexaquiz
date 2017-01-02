// QuestionsService.js

angular.module('SPAquiz.services').factory('QuestionsService', QuestionsService);

function QuestionsService() {

    var qs = {
        questions      : [],
        currentAnswers : [],
        score          : 0,
        setScore       : _setScore,
        getScore       : _getScore,
        setQuestions   : _setQuestions,
        getQuestions   : _getQuestions
    };

    return qs;




//  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
//  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _setQuestions(questions) {

        console.log('QuestionsService::setQuestions : ' , questions);

        qs.questions = questions;

        for (var i=0; i<qs.questions.length; i++) {
            qs.currentAnswers.push(-1); // -1 is a flag to check if a radio button has been changed
        }

        return true;
    }


    function _getQuestions(idx) {

        return idx ? qs.questions[idx] : qs.questions;
    }


    function _setScore(score) {

        qs.score = score;

        return true;
    }


    function _getScore(){

        for(var i=0; i<qs.questions.length; i++) {
            (qs.currentAnswers[i] === -1) && (qs.currentAnswers[i] = 0);
            console.log('qs.currentAnswers', qs.currentAnswers);
            (qs.questions[i].correctAnswer === qs.currentAnswers[i]) && qs.score++;
        }
        return qs.score;
    }
}