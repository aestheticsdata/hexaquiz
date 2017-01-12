function AuthFormController() {

    var ctrl = this;

    ctrl.$onInit = function () {

        ctrl.submitForm = function () {
            ctrl.onSubmit({
                $event: {
                    user: ctrl.user
                }
            })
        }
    };

    ctrl.$onChanges = function (changes) {
        console.log('changes : ');
        console.log(changes);
    };

    console.log('AuthFormController');
}

angular
    .module('hexaquiz.components.auth')
    .controller('AuthFormController', AuthFormController);