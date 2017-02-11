function WarningModalController($log, hlg, $state, $uibModalStack) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('WarningModalController');

        ctrl.ok = function () {
            ctrl.close();
            if (ctrl.resolve.action === 'score') {
                $uibModalStack.dismissAll();
                $state.go('score');
            }
        };

        ctrl.message = ctrl.resolve.message;
    };

}

angular
    .module('hexaquiz.components.modal')
    .controller('WarningModalController', WarningModalController);