function AuthFormController() {

    var ctrl = this;

    ctrl.$onInit = function () {

        console.log('AuthFormController');

        ctrl.submitForm = function () {
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
        console.log('changes : ');
        console.log(changes);

        if (changes.user) {
            ctrl.user = angular.copy(ctrl.user);
        }
    };
}

angular
    .module('hexaquiz.components.auth')
    .controller('AuthFormController', AuthFormController);