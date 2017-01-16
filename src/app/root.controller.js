function RootController($log) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('RootController');

        ctrl.loggedIn = false;
        ctrl.displayLogOutButton = function (v) {
            $log.warn('%c displayLogOutButton', 'background: green; color: white; display: block;');
            ctrl.loggedIn = true;
        };
    };
}

angular.module('hexaquiz')
    .controller('RootController', RootController);