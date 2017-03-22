function LoginController(TextService, AuthService, cfpLoadingBar, $state, AppStateService, $log) {

    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('LoginController');
        $log.debug('ctrl : ', ctrl);

        ctrl.errorMessage = null;

        ctrl.text = {
            signin : TextService.login.signin,
            reset  : TextService.login.reset
        };

        ctrl.loginUser = function (e) {
            return AuthService
                .login(e.user)
                .then(function () {
                    $log.debug('login from login controller');
                    cfpLoadingBar.complete();
                    ctrl.onToggleLoggedOutBtn({
                        $event: {
                            loggedIn: true
                        }
                    });
                    ctrl.onUserNameAvailable({
                        $event: {
                            user: AuthService.getUser()
                        }
                    });
                    ctrl.onLaunchTimer({
                        $event: {
                            showTimer: true
                        }
                    });
                    AppStateService.comingFromLogin = true;
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