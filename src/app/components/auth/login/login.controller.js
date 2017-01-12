function LoginController(TextService) {

    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('LoginController');

        ctrl.text = {
            signin : TextService.login.signin,
            reset  : TextService.login.reset
        };

        ctrl.loginUser = function (e) {
            // return AuthService
            //     .login(e.user)
            //     .then(function () {
            //         $state.go('app');
            //     }, function (reason) {
            //         ctrl.errorMessage = reason.message;
            //     });
            console.log(e);
        };
    }
}

angular
    .module('hexaquiz.components.auth')
    .controller('LoginController', LoginController);