function LoginController() {

    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('LoginController');

        ctrl.loginUser = function (e) {
            return AuthService
                .login(e.user)
                .then(function () {
                    $state.go('app');
                }, function (reason) {
                    ctrl.errorMessage = reason.message;
                });
        }
    }
}

angular
    .module('hexaquiz.components.auth')
    .controller('LoginController', LoginController);