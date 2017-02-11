function HeaderBarController(AuthService, TimerService, $state, $log) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('HeaderBarController');
        $log.debug('%c ctrl.loggedIn', 'background:teal; color:aqua; display:block',ctrl.loggedIn);
    };

    ctrl.$onChanges = function (changes) {
        $log.debug('headerbar on change');
        $log.debug(changes.loggedIn);
        // ctrl.headerBarLoggedIn = (angular.copy(changes.loggedIn)).currentValue;
    };

    ctrl.logout = function () {
        $log.debug('log out from header bar');
        $log.debug('TimerService.count : ', TimerService.count);
        TimerService.initCounter(22);
        $log.debug('TimerService.count after reinit : ', TimerService.count);
        AuthService.logout().then(function () {
            ctrl.onToggleLoggedOutBtn({
                $event: {
                    loggedIn: false
                }
            });
            // $state.go('auth.login');
            $state.go('login');
        });
    }
}

angular
    .module('hexaquiz.common')
    .controller('HeaderBarController', HeaderBarController);