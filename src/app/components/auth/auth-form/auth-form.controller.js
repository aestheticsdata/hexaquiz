function AuthFormController($log, cfpLoadingBar) {

    var ctrl = this;

    ctrl.$onInit = function () {

        $log.debug('AuthFormController');

        ctrl.submitForm = function () {
            cfpLoadingBar.start();
            ctrl.onSubmit({
                $event: {
                    user: ctrl.user
                }
            })
        };

        ctrl.onFocus = function (evt) {
            ctrl.errorMessage = '';
            evt.target.value = '';

        };
    };

    ctrl.$onChanges = function (changes) {
        $log.debug('changes : ');
        $log.debug(changes);

        if (changes.user) {
            ctrl.user = angular.copy(ctrl.user);
        }
    };
}

angular
    .module('hexaquiz.components.auth')
    .controller('AuthFormController', AuthFormController);