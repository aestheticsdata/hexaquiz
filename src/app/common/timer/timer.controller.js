function TimerController($interval, $log, hlg, TimerService) {
    var ctrl = this,
        ctrlTimer = null;


    ctrl.$onInit = function () {
        $log.debug('TimerController');

        updateTimerFromService();

        TimerService.getTimerUpdate();

        ctrlTimer = $interval(updateTimerFromService, 400);
    };

    function updateTimerFromService() {
        ctrl.min = TimerService.displayTime().min;
        ctrl.sec = TimerService.displayTime().sec;
    }
}

angular
    .module('hexaquiz.common.timer')
    .controller('TimerController', TimerController);