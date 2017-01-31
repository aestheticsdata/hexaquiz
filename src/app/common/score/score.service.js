function ScoreService(QuestionsService, $log) {
    var qs = QuestionsService,
        score = {
            score:0,
            setScore: _setScore,
            getScore: _getScore
        };
    return score;

    function _getScore() {
        return this.score;
    }

    function _setScore(){
        for(var i=0; i<QuestionsService.questions.length; i++) {
            (qs.currentAnswers[i] === -1) && (qs.currentAnswers[i] = 0);
            $log.debug('QuestionsService.currentAnswers', QuestionsService.currentAnswers);
            (qs.questions[i].correctAnswer === qs.currentAnswers[i]) && this.score++;
        }
        return this.score;
    }
}

angular
    .module('hexaquiz.common.score')
    .factory('ScoreService', ScoreService);