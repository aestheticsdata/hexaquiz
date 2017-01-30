function ScoreController($log, hlg) {
        var ctrl = this;

        ctrl.$onInit = function () {
            hlg.l('blue', 3, 'ScoreController', '');
        };
}

angular
    .module('hexaquiz.common.score')
    .controller('ScoreController', ScoreController);