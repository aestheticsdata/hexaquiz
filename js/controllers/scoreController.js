// ScoreController.js

angular.module('SPAquiz.controllers').controller('ScoreController', ScoreController);

function ScoreController($scope, QuestionsService) {

    $scope.score = QuestionsService.getScore();
}