var timer = {
        templateUrl: './timer.html',
        controller: 'TimerController',
        bindings: {
            launch: '<'
        }

};

angular
    .module('hexaquiz.common.timer')
    .component('timer', timer);