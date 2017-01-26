function LoginController(TextService, AuthService, $state, $log) {

    var ctrl = this;

    ctrl.$onInit = function () {
        $log.info('LoginController');
        $log.info('ctrl : ', ctrl);

        ctrl.text = {
            signin : TextService.login.signin,
            reset  : TextService.login.reset
        };

        ctrl.loginUser = function (e) {
            return AuthService
                .login(e.user)
                .then(function () {
                    console.log('login from login controller');
                    ctrl.onToggleLoggedOutBtn({
                        $event: {
                            loggedIn: true
                        }
                    });
                    $state.go('app');
                }, function (reason) {
                    ctrl.errorMessage = reason.message;
                });
        };
    }
}

angular
    .module('hexaquiz.components.auth')
    .controller('LoginController', LoginController);