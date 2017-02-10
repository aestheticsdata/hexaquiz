// questions.service.js

angular.module('hexaquiz.common.questions').factory('QuestionsService', QuestionsService);


function QuestionsService($http, $firebaseObject, $log, hlg) {

    var qs = {
        questions          : [],
        currentAnswers     : [],
        initCurrentAnswers : _initCurrentAnswers,
        retrieveQuestions  : _retrieveQuestions,
        setQuestions       : _setQuestions,
        getQuestions       : _getQuestions,
        ref                : firebase.database().ref(),
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

        $log.debug('QuestionsService::setQuestions : ' , data.questions);

        qs.questions = R.values(data.questions);

        qs.initCurrentAnswers();

        return true;
    }

    function _initCurrentAnswers() {
        // if not reloading the page when logged out and logged in again,
        // the currentAnswers array will grow each time
        // without being reinitialized
        qs.currentAnswers = [];
        ///////////////////////////////////////////////////////////////

        for (var i=0, questionslength=qs.questions.length; i<questionslength; i++) {
            qs.currentAnswers.push(-1); // -1 is a flag to check if a radio button has been changed
        }
        // hlg.l('blue', Math.ceil(Math.random()*10), 'kkk', qs.currentAnswers);
    }


    function _getQuestions(idx) {

        return idx ? qs.questions[idx] : qs.questions;
    }
}