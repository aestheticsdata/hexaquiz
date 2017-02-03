function AppController($log, hlg) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('AppController');
        hlg.l('purple', 5, Date.now(), '');
    }
}

angular
    .module('hexaquiz.common')
    .controller('AppController', AppController);