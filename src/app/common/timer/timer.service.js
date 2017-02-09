function TimerService($interval, $window, $log, hlg) {
    var timerservice = {
        count   : 72, // number of seconds
        tempMin : 0,
        tempSec : 0,
        timer   : null,
        getTimerUpdate : _getTimerUpdate,
        updateTimer    : _updateTimer,
        displayTime    : _displayTime
    };

    timerservice.tempMin = Math.floor(timerservice.count / 60) % 60;
    timerservice.tempSec = timerservice.count%60;

    return timerservice;


    function _getTimerUpdate() {
        if (!timerservice.timer) {
            timerservice.timer = $interval(timerservice.updateTimer, 1000);
        } else {

        }
    }

    function _updateTimer() {
        timerservice.tempMin = Math.floor(timerservice.count / 60) % 60;
        timerservice.tempSec = timerservice.count%60;


        if (timerservice.tempMin < 0 && timerservice.tempSec < 0) {
            if($interval.cancel(timerservice.timer)) {
                // $window.alert('time elapsed');
            }
            timerservice.tempMin = '0';
            timerservice.tempSec = '0';

        } else {
            timerservice.displayTime();
        }

        timerservice.count -= 1;

    }

    function _displayTime() {
        var display = {
            min : (timerservice.tempMin < 10) ? '0' + timerservice.tempMin : timerservice.tempMin,
            sec : (timerservice.tempSec < 10) ? '0' + timerservice.tempSec : timerservice.tempSec
        };
        return display;
    }
}

angular
    .module('hexaquiz.common.timer')
    .factory('TimerService', TimerService);