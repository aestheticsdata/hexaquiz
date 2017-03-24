angular
    .module('hexaquiz.components.auth', [
        'ui.router',
        'firebase'
    ])
    .config(function (CONFIGProvider) {
        var config = CONFIGProvider.$get();
        firebase.initializeApp(config);
    })
    .run(function ($transitions, $state, AuthService, AppStateService, QuestionsService, $log, hlg) {
        $transitions.onStart({
            to: function (state) {
                $log.debug('%c $transitions state : ', 'background: green; color: white; display: block;',state);
                $log.debug('%c state.data : ', 'background: green; color: white; display: block;',state.data);
                return !!(state.data && state.data.requiredAuth);
            }
        }, function() {
            return AuthService
                .requireAuthentication()
                .catch(function () {
                    $log.debug('auth catched');
                    // return $state.target('auth.login');
                    return $state.target('login');
                });
        });
        $transitions.onStart({
            // to: 'auth.*'
            to: 'login'
        }, function () {
            if (AuthService.isAuthenticated()) {
                return $state.target('app');
            }
        });

        // prevent direct access to questions even when authenticated
        // cause a transition rejection but no flickering
        $transitions.onBefore({
            to: 'questions'
        }, function () {
            if (!AppStateService.comingFromLogin) {
                AuthService.logout().then(function () {
                    $state.go('login');
                })
            }
        });

        // re-init selected answers when logout and re-login without
        // reloading the page
        $transitions.onBefore({
            to:'app'
        }, function () {
            QuestionsService.initCurrentAnswers();
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
