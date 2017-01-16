var login = {
    templateUrl: './login.html',
    controller: 'LoginController',
    textservice:'<',

    // this is a workaround, because in the current version of
    // ui-router 1.0.0-beta.3 it's not possible to route a
    // component using '&' binding to from parent to child
    // here we need to to tell the root controller to
    // tell the header-bar to display the logout button
    // when the login component has successfully authenticated
    // see https://github.com/angular-ui/ui-router/issues/3239
    require: {
        parentCtrl:'^^rootcomponent'
    }
    ///////////////////////////////////////////////////////////
};

angular
    .module('hexaquiz.components.auth')
    .component('login', login)
    .config(function ($stateProvider, $urlServiceProvider) {
        $stateProvider
            .state('auth', {
                redirectTo: 'auth.login',
                url: '/auth',
                template: '<div ui-view></div>'
            })
            .state('auth.login', {
                url: '/login',
                component: 'login'
            });
        $urlServiceProvider.rules.otherwise('/auth/login'); // entry point of the app
    });