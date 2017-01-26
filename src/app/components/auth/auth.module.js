angular
    .module('hexaquiz.components.auth', [
        'ui.router',
        'firebase'
    ])
    .config(function (CONFIGProvider) {
        var config = CONFIGProvider.$get();
        firebase.initializeApp(config);
    })
    .run(function ($transitions, $state, AuthService) {
        $transitions.onStart({
            to: function (state) {
                console.log('$transitions state : ', state);
                console.log('state.data : ', state.data);
                return !!(state.data && state.data.requiredAuth);
            }
        }, function() {
            console.log('777');
            return AuthService
                .requireAuthentication()
                .catch(function () {
                    console.log('auth catched');
                    // return $state.target('auth.login');
                    return $state.target('login');
                });
        });
        $transitions.onStart({
            // to: 'auth.*'
            to: 'login'
        }, function () {
            console.log('888');
            if (AuthService.isAuthenticated()) {
                return $state.target('app');
            }
        });
    });
