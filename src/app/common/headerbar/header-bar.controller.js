function HeaderBarController(AuthService, $state, $log) {
    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('HeaderBarController');
        console.log('ctrl.loggedIn', ctrl.loggedIn);
    };

    ctrl.$onChanges = function (changes) {
        $log.info('headerbar on change');
        $log.info(changes.loggedIn);
        ctrl.loggedIn = angular.copy(changes.loggedIn.currentValue);
    };

    ctrl.logout = function () {
        console.log('log out from header bar');
        AuthService.logout().then(function () {
            ctrl.loggedIn = false;

            $state.go('auth.login');
        });
    }
}

angular
    .module('hexaquiz.common')
    .controller('HeaderBarController', HeaderBarController);