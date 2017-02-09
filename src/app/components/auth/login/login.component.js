var login = {
    templateUrl: './login.html',
    controller: 'LoginController',
    textservice:'<',
    bindings: {
        onToggleLoggedOutBtn: '&',
        onUserNameAvailable: '&',
        onLaunchTimer: '&'
    }
};

angular
    .module('hexaquiz.components.auth')
    .component('login', login)
    .config(function ($stateProvider, $urlServiceProvider, TimerServiceProvider) {
        $stateProvider
            .state('auth', {
                redirectTo: 'auth.login',
                url: '/auth',
                // template: '<div ui-view class="auth"></div>'
            })

            // https://github.com/angular-ui/ui-router/issues/3277

            // .state('auth.login', {
            //     url: '/login',
            //     component: 'login'
            // });
            .state('login', {
                url: '/login',
                component: 'login',
            });

            // https://github.com/angular-ui/ui-router/issues/3277
        // $urlServiceProvider.rules.otherwise('/auth/login'); // entry point of the app
        $urlServiceProvider.rules.otherwise('/login'); // entry point of the app

        // TimerServiceProvider.count = 75;
    });