function RootController($log) {
    var ctrl = this;
    ctrl.loggedIn = false;


    ctrl.$onInit = function () {
        $log.debug('RootController');
        ctrl.displayLogOutButton = function (e) {
            ctrl.loggedIn = true;
        };
    };
}

angular.module('hexaquiz')
    .controller('RootController', RootController);