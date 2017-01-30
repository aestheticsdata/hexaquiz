function ScoreService() {
    var score = {
        score:0,
        setScore: _setScore,
        getScore: _getScore
    };
    return score;

    function _setScore(score) {
        this.score = score;
    }

    function _getScore() {
        return score.score;
    }
}

angular
    .module('hexaquiz.common.score')
    .factory('ScoreService', ScoreService);