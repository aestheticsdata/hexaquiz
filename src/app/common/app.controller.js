function AppController($log) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('AppController');
    }
}

angular
    .module('hexaquiz.common')
    .controller('AppController', AppController);