function ScoreService(QuestionsService, $log) {
    var qs = QuestionsService,
        score = {
            _score:0,
            init: _init,
            setScore: _setScore,
            getScore: _getScore
        };
    return score;

    // re-init score when logged out and logged in again
    function _init() {
        this._score = 0;
    }

    function _setScore() {
        for(var i=0, l=qs.questions.length; i<l; i++) {
            (qs.currentAnswers[i] === -1) && (qs.currentAnswers[i] = 0);
            (qs.questions[i].correctAnswer === qs.currentAnswers[i]) && this._score++;
        }
    }

    function _getScore() {
        return this._score;
    }
}

angular
    .module('hexaquiz.common.score')
    .factory('ScoreService', ScoreService);