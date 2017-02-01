function QuestionsNavController($log) {

    var ctrl = this;

    ctrl.$onInit = function () {

        $log.debug('QuestionsNavController');

        ctrl.prev = function () {
            $log.debug('previous btn');
            ctrl.onNavClick({
                $event:{
                    dir:'prev'
                }
            });
        };

        ctrl.next = function () {
            ctrl.onNavClick({
                $event:{
                    dir:'next'
                }
            });
        }
    }
}

angular
    .module('hexaquiz.components.nav')
    .controller('QuestionsNavController', QuestionsNavController);