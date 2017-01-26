function RootController($log) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('RootController');

        ctrl.loggedIn = false;

        ctrl.displayLogOutButton = function (e) {
            ctrl.loggedIn = e.loggedIn;
        };
    };
}

angular.module('hexaquiz')
    .controller('RootController', RootController);