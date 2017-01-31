function WarningModalController($log, hlg) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('WarningModalController');

        ctrl.ok = function () {
            ctrl.close();
        };
    };

}

angular
    .module('hexaquiz.components.modal')
    .controller('WarningModalController', WarningModalController);