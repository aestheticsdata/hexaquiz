function LoginController(TextService, AuthService, $state) {

    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('LoginController');
        console.log('parent : ', ctrl.parentCtrl);

        ctrl.text = {
            signin : TextService.login.signin,
            reset  : TextService.login.reset
        };

        ctrl.loginUser = function (e) {
            return AuthService
                .login(e.user)
                .then(function () {
                    console.log('login from login controller');
                    // this is a workaround, because in the current version of
                    // ui-router 1.0.0-beta.3 it's not possible to route a
                    // component using '&' binding to from parent to child
                    // here we need to to tell the root controller to
                    // tell the header-bar to display the logout button
                    // when the login component has successfully authenticated
                    // see https://github.com/angular-ui/ui-router/issues/3239
                    // ctrl.parentCtrl.displayLogOutButton(e);
                    ctrl.parentCtrl.displayLogOutButton(true);
                    //////////////////////////////////////////////////////////
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