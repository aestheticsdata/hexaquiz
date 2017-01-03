var app = {
    templateUrl: './app.html',
    controller: 'AppController'
}

angular
    .module('hexaquiz.common')
    .component('app', app)
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                redirectTo: 'questions',
                url: '/app',
                component: 'app',
                params : {idx:0} // this params is used in 'questions' state because 'app' state redirectTo 'questions' state
            });
    });