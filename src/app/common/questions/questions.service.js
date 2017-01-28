// QuestionsService.js

angular.module('hexaquiz.common.questions').factory('QuestionsService', QuestionsService);


function QuestionsService($http, $firebaseObject, $log) {

    var qs = {
        questions         : [],
        currentAnswers    : [],
        score             : 0,
        setScore          : _setScore,
        getScore          : _getScore,
        retrieveQuestions : _retrieveQuestions,
        setQuestions      : _setQuestions,
        getQuestions      : _getQuestions,
        ref               : firebase.database().ref(),
    };

    return qs;




//  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
//  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _retrieveQuestions() {

        // return $http.get('./mock_data/questions.json');
        return $firebaseObject(qs.ref).$loaded();
    }


    function _setQuestions(data) {

        $log.info('QuestionsService::setQuestions : ' , data.questions);

        qs.questions = R.values(data.questions);

        // if not reloading the page when logged out and loggedin again,
        // the currentAnswers array will grow each time
        // without being reinitialized
        qs.currentAnswers = [];
        ///////////////////////////////////////////////////////////////



        for (var i=0, questionslength=qs.questions.length; i<questionslength; i++) {
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
            $log.info('qs.currentAnswers', qs.currentAnswers);
            (qs.questions[i].correctAnswer === qs.currentAnswers[i]) && qs.score++;
        }
        return qs.score;
    }
}