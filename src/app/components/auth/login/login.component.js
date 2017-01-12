var login = {
    templateUrl: './login.html',
    controller: 'LoginController',
    textservice:'<'
};

angular
    .module('hexaquiz.components.auth')
    .component('login', login)
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('auth', {
                redirectTo: 'auth.login',
                url: '/auth',
                template: '<div ui-view></div>'
            })
            .state('auth.login', {
                url: '/login',
                component: 'login',
            });
        $urlRouterProvider.otherwise('/auth/login');
    });