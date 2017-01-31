angular
    .module('hexaquiz.components.auth', [
        'ui.router',
        'firebase'
    ])
    .config(function (CONFIGProvider) {
        var config = CONFIGProvider.$get();
        firebase.initializeApp(config);
    })
    .run(function ($transitions, $state, AuthService, AppStateService, $log) {
        $transitions.onStart({
            to: function (state) {
                $log.info('%c $transitions state : ', 'background: green; color: white; display: block;',state);
                $log.info('%c state.data : ', 'background: green; color: white; display: block;',state.data);
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

        // prevent direct access to questions even when authenticated
        // cause a transition rejection but no flickering
        $transitions.onStart({
            to: 'questions'
        }, function () {
            if (!AppStateService.comingFromLogin) {
                AuthService.logout().then(function () {
                    $state.go('login');
                })
            }
        });

        // prevent direct access to questions even when authenticated
        // cause a transition rejection but no flickering
        $transitions.onStart({
            to: 'score'
        }, function () {
            if (!AppStateService.comingFromLogin) {
                AuthService.logout().then(function () {
                    $state.go('login');
                })
            }
        });


        // no transition rejection but flickering
        // $transitions.onEnter({
        //     entering: 'questions'
        // }, function () {
        //     if (!AppStateService.comingFromLogin) {
        //         AuthService.logout().then(function () {
        //             $state.go('login');
        //         })
        //     }
        // });


        /////////////////////////////////////////////////////////////
    });
