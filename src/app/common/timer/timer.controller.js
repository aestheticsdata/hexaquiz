function TimerController($interval, $log, hlg, TimerService) {
    var ctrl = this,
        ctrlTimer = null;


    ctrl.$onInit = function () {
        $log.debug('TimerController');

        ctrl.hasReachZero = false;

        updateTimerFromService();

        TimerService.getTimerUpdate();

        ctrlTimer = $interval(updateTimerFromService, 400);
    };

    ctrl.$onDestroy = function () {
        $log.debug('TimerController on destroy');
        $interval.cancel(ctrlTimer);
    };

    function updateTimerFromService() {
        ctrl.min = TimerService.displayTime().min;
        ctrl.sec = TimerService.displayTime().sec;
        if(ctrl.min == '00' && ctrl.sec == '00') {
            $log.debug('has reach zero');
            ctrl.hasReachZero = true;
        }
    }
}

angular
    .module('hexaquiz.common.timer')
    .controller('TimerController', TimerController);