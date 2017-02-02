var timer = {
        templateUrl: './timer.html',
        controller: 'TimerController',
        bindings: {

        }
};

angular
    .module('hexaquiz.common.timer')
    .component('timer', timer);