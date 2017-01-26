function HeaderBarController(AuthService, $state, $log) {
    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('HeaderBarController');
        console.log('%c ctrl.loggedIn', 'background:teal; color:aqua; display:block',ctrl.loggedIn);
    };

    ctrl.$onChanges = function (changes) {
        $log.info('headerbar on change');
        $log.info(changes.loggedIn);
        // ctrl.headerBarLoggedIn = (angular.copy(changes.loggedIn)).currentValue;
    };

    ctrl.logout = function () {
        console.log('log out from header bar');
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