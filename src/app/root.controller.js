function RootController($log) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('RootController');

        ctrl.loggedIn = false;
        ctrl.userName = 'no name';

        ctrl.displayLogOutButton = function (e) {
            ctrl.loggedIn = e.loggedIn;
        };

        ctrl.displayUserName = function (e) {
            $log.debug('!!!!! username : ', e);
            ctrl.userName = (e.user.email).substr(0,(e.user.email).indexOf('@'));

        }
    };
}

angular.module('hexaquiz')
    .controller('RootController', RootController);