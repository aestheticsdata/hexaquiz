function QuestionsNavController() {

    var ctrl = this;

    ctrl.$onInit = function () {

        console.log('QuestionsNavController');

        ctrl.prev = function () {
            console.log('previous btn');
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