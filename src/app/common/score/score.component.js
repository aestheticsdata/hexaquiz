var score = {
    templateUrl: './score.html',
    controller: 'ScoreController',
    bindings: {
        score: '<'
    }
};

angular
    .module('hexaquiz.common.score')
    .component('score', score)
    .config(function ($stateProvider) {
        $stateProvider
            .state('score', {
                parent:'app',
                url:'/score',
                component: 'score',
                resolve: {
                    score: function (ScoreService) {
                        return ScoreService.getScore();
                    }
                }
            });
    });