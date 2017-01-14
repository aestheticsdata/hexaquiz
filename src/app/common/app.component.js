var app = {
    templateUrl: './app.html',
    controller: 'AppController',
    require: {
        parentCtrl:'^^rootcomponent'
    }
};

angular
    .module('hexaquiz.common')
    .component('app', app)
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                redirectTo: 'questions',
                url: '/app',
                data: {
                    requiredAuth: true
                },
                component: 'app',
                params : {idx:0} // this params is used in 'questions' state because 'app' state redirectTo 'questions' state
            });
    });