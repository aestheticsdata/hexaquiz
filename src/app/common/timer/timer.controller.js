function TimerController($interval, $log, hlg) {
    var ctrl=this,
        count = 5, // number of seconds
        tempMin = Math.floor(count / 60) % 60,
        tempSec = count%60,
        timer   = null;

    _displayingTime();

    ctrl.$onInit = function () {
        $log.debug('TimerController');
        // timer = $interval(_updateTimer, 1000);
    };

    ctrl.$onChanges = function (changes) {
        $log.debug('changes in timer : ', changes);
        if (changes.launch.currentValue) {
            timer = $interval(_updateTimer, 1000);
        }
    };

    function _updateTimer() {
        tempMin = Math.floor(count / 60) % 60;
        tempSec = count%60;

        count -= 1;

        if (tempMin < 0 && tempSec < 0) {
            ctrl.min = '00';
            ctrl.sec = '00';
            if($interval.cancel(timer)) {
                window.alert('time elapsed');
            }

        } else {
            _displayingTime();
        }

    }
    function _displayingTime() {
        ctrl.min = (tempMin < 10) ? '0' + tempMin : tempMin;
        ctrl.sec = (tempSec < 10) ? '0' + tempSec : tempSec;
    }
}

angular
    .module('hexaquiz.common.timer')
    .controller('TimerController', TimerController);