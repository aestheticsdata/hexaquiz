function RootController($log, $interval) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('RootController');

        ctrl.loggedIn = false;
        ctrl.displayLogOutButton = function (e) {
            $log.warn('displayLogOutButton');
            ctrl.loggedIn = true;
        };
    };
}

angular.module('hexaquiz')
    .controller('RootController', RootController);