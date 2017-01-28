(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz', ['hexaquiz.common', 'hexaquiz.components', 'hexaquiz.templates']);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.common', ['ui.router', 'hexaquiz.common.questions']).run(["$state", "$uiRouter", function ($state, $uiRouter) {
    var vis = window['ui-router-visualizer'];
    vis.visualizer($uiRouter);
}]);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.components', ['hexaquiz.components.auth', 'hexaquiz.components.nav']);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.components.nav', []);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.common.questions', ['ui.router']);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.components.auth', ['ui.router', 'firebase']).config(["CONFIGProvider", function (CONFIGProvider) {
    var config = CONFIGProvider.$get();
    firebase.initializeApp(config);
}]).run(["$transitions", "$state", "AuthService", "AppStateService", "$log", function ($transitions, $state, AuthService, AppStateService, $log) {
    $transitions.onStart({
        to: function to(state) {
            $log.info('%c $transitions state : ', 'background: green; color: white; display: block;', state);
            $log.info('%c state.data : ', 'background: green; color: white; display: block;', state.data);
            return !!(state.data && state.data.requiredAuth);
        }
    }, function () {
        console.log('777');
        return AuthService.requireAuthentication().catch(function () {
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
            });
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
}]);})(window.angular);
(function(angular){
'use strict';
'use strict';

function AppStateService() {
    var state = {
        comingFromLogin: false
    };
    return state;
}

angular.module('hexaquiz').factory('AppStateService', AppStateService);})(window.angular);
(function(angular){
'use strict';
'use strict';

EnhancedLog.$inject = ["$log"];
function EnhancedLog($log) {
    var log = {
        l: _lg
    },
        COLORS = {
        default: [''],
        grey: ['background: Gainsboro;      color: black', 'background: LightGrey;      color: black', 'background: Silver;         color: black', 'background: DarkGrey;       color: black', 'background: Grey;           color: white', 'background: DimGrey;        color: white', 'background: LightSlateGrey; color: white', 'background: SlateGrey;      color: white', 'background: DarkSlateGrey;  color: white'],
        purple: ['background: Lavender;        color: black', 'background: Thistle;         color: white', 'background: Plum;            color: white', 'background: Violet;          color: white', 'background: Orchid;          color: white', 'background: Fuchsia;         color: white', 'background: MediumOrchid;    color: white', 'background: MediumPurple;    color: white', 'background: BlueViolet;      color: white', 'background: DarkViolet;      color: white', 'background: DarkOrchid;      color: white', 'background: Purple;          color: white', 'background: RebeccaPurple;   color: white', 'background: Indigo;          color: white', 'background: MediumSlateBlue; color: white', 'background: SlateBlue;       color: white', 'background: DarkSlateBllue;  color: white'],
        blue: ['background: Cyan;           color: black', 'background: LightCyan;      color: black', 'background: PaleTurquoise;  color: black', 'background: AquaMarine;     color: black', 'background: Turquoise;      color: black', 'background: DarkTurquoise;  color: white', 'background: CadetBlue;      color: white', 'background: SteelBlue;      color: white', 'background: LightSteelBlue; color: white', 'background: PowderBlue;     color: white', 'background: SkyBlue;        color: white', 'background: DeepSkyBlue;    color: white', 'background: DodgerBlue;     color: white', 'background: RoyalBlue;      color: white', 'background: Blue;           color: white', 'background: MediumBlue;     color: white', 'background: Navy;           color: white', 'background: MidnightBlue;   color: white'],
        yellow: ['background: Gold;                 color: black', 'background: Yellow;               color: black', 'background: LightYellow;          color: black', 'background: LemonChiffon;         color: black', 'background: LightGoldenrodYellow; color: black', 'background: PapayaWhip;           color: black', 'background: Moccasin;             color: black', 'background: PeachPuff;            color: black', 'background: PaleGoldenrod;        color: black', 'background: Khaki;                color: black', 'background: DarkKhaki;            color: white'],
        red: ['background: IndianRed;   color: white', 'background: LightCoral;  color: black', 'background: Salmon;      color: black', 'background: DarkSalmon;  color: black', 'background: LightSalmon; color: black', 'background: Crimson;     color: white', 'background: Red;         color: White', 'background: FireBrick;   color: white', 'background: DarkRed;     color: white']
    },
        STYLES = {
        default: '',
        small: 'font-size:8px;  padding: 2px',
        medium: 'font-size:12px; padding: 2px',
        big: 'font-size:20px; padding: 2px; font-weight: bold'
    },
        LOOKUPCAT = {
        'blue': 'default',
        'grey': 'small',
        'purple': 'medium',
        'yellow': 'medium',
        'red': 'big'
    };

    return log;

    //  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
    //  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
    //  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _lg(cat, level, txt, arg) {
        var style = LOOKUPCAT[cat],
            txt = '%c' + txt;

        // if a level is bigger than the array length, then modulo it
        COLORS[cat].length < level && (level = level % COLORS[cat].length);

        $log.debug(txt, COLORS[cat][level] + ';' + STYLES[style], arg);
    }
}

angular.module('hexaquiz').factory('hlg', EnhancedLog);})(window.angular);
(function(angular){
'use strict';
'use strict';

var rootobj = {
    templateUrl: './root.html',
    controller: 'RootController'
};

angular.module('hexaquiz').component('rootcomponent', rootobj);})(window.angular);
(function(angular){
'use strict';
'use strict';

RootController.$inject = ["$log"];
function RootController($log) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $log.debug('RootController');

        ctrl.loggedIn = false;
        ctrl.userName = 'no name';

        ctrl.displayLogOutButton = function (e) {
            ctrl.loggedIn = e.loggedIn;
        };

        ctrl.displayUserName = function (e) {
            console.log('!!!!! username : ', e);
            ctrl.userName = e.user.email.substr(0, e.user.email.indexOf('@'));
        };
    };
}

angular.module('hexaquiz').controller('RootController', RootController);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz').factory('TextService', TextService);

function TextService() {

    var text = {
        login: {
            signin: 'Sign in',
            reset: 'Reset'
        }
    };

    return text;
}})(window.angular);
(function(angular){
'use strict';
'use strict';

var app = {
    templateUrl: './app.html',
    controller: 'AppController'
};

angular.module('hexaquiz.common').component('app', app).config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state('app', {
        redirectTo: 'questions',
        url: '/app',
        data: {
            requiredAuth: true
        },
        component: 'app',
        params: { idx: 0 } // this params is used in 'questions' state because 'app' state redirectTo 'questions' state
    });
}]);})(window.angular);
(function(angular){
'use strict';
'use strict';

function AppController() {
    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('AppController');
    };
}

angular.module('hexaquiz.common').controller('AppController', AppController);})(window.angular);
(function(angular){
'use strict';
'use strict';

var headerbar = {
    templateUrl: './header-bar.html',
    controller: 'HeaderBarController',
    bindings: {
        loggedIn: '<',
        userName: '@',
        onToggleLoggedOutBtn: '&'
    }
};

angular.module('hexaquiz.common').component('headerBar', headerbar);})(window.angular);
(function(angular){
'use strict';
'use strict';

HeaderBarController.$inject = ["AuthService", "$state", "$log"];
function HeaderBarController(AuthService, $state, $log) {
    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('HeaderBarController');
        console.log('%c ctrl.loggedIn', 'background:teal; color:aqua; display:block', ctrl.loggedIn);
    };

    ctrl.$onChanges = function (changes) {
        $log.info('headerbar on change');
        $log.info(changes.loggedIn);
        // ctrl.headerBarLoggedIn = (angular.copy(changes.loggedIn)).currentValue;
    };

    ctrl.logout = function () {
        console.log('log out from header bar');
        AuthService.logout().then(function () {
            ctrl.onToggleLoggedOutBtn({
                $event: {
                    loggedIn: false
                }
            });
            // $state.go('auth.login');
            $state.go('login');
        });
    };
}

angular.module('hexaquiz.common').controller('HeaderBarController', HeaderBarController);})(window.angular);
(function(angular){
'use strict';
'use strict';

var nav = {
    bindings: {
        questions: '<',
        isPrevDisabled: '<',
        onNavClick: '&'
    },
    templateUrl: './nav.html',
    controller: 'QuestionsNavController'
};

angular.module('hexaquiz.components.nav').component('nav', nav);})(window.angular);
(function(angular){
'use strict';
'use strict';

function QuestionsNavController() {

    var ctrl = this;

    ctrl.$onInit = function () {

        console.log('QuestionsNavController');

        ctrl.prev = function () {
            console.log('previous btn');
            ctrl.onNavClick({
                $event: {
                    dir: 'prev'
                }
            });
        };

        ctrl.next = function () {
            ctrl.onNavClick({
                $event: {
                    dir: 'next'
                }
            });
        };
    };
}

angular.module('hexaquiz.components.nav').controller('QuestionsNavController', QuestionsNavController);})(window.angular);
(function(angular){
'use strict';
'use strict';

var questions = {
    bindings: {
        transitionAlias: '<',
        questions: '<'
    },
    templateUrl: './questions.html',
    controller: 'QuestionsController'
};

angular.module('hexaquiz.common.questions').component('questions', questions).config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state('questions', {
        parent: 'app',
        url: '/questions/:idx',
        component: 'questions',
        resolve: {
            transitionAlias: '$transition$', // see https://github.com/angular-ui/ui-router/issues/3110
            questions: ["QuestionsService", function questions(QuestionsService) {
                console.log('resolve questions');
                return QuestionsService.retrieveQuestions().then(function onSuccess(res) {
                    console.log(res);
                    QuestionsService.setQuestions(res);
                    return QuestionsService.questions;
                }).catch(function onError(err) {
                    console.log('error while retrieving questions : ', err);
                });
            }]
        }
    });
}]);})(window.angular);
(function(angular){
'use strict';
'use strict';

QuestionsController.$inject = ["$state", "QuestionsService"];
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function QuestionsController($state, QuestionsService) {

    var ctrl = this,
        currentIndex = -1,
        questionsLength = -1;

    ctrl.$onInit = function () {

        console.log('QuestionsController');
        console.log('this.questions : ', ctrl.questions);

        questionsLength = ctrl.questions.length;

        currentIndex = ctrl.transitionAlias.params().idx;

        /// nav ///
        ctrl.isPrevDisabled = parseInt(currentIndex) === 0;

        ctrl.navTo = function (e) {
            switch (e.dir) {
                case 'prev':
                    $state.go('questions', {
                        idx: currentIndex === 0 ? currentIndex : parseInt(currentIndex - 1)
                    });
                    break;
                case 'next':
                    if (parseInt(currentIndex) === questionsLength - 1) {
                        // $state.go('score');
                        console.log('..........');
                        console.log(QuestionsService.currentAnswers);
                        console.log(_typeof(QuestionsService.currentAnswers[0]));
                        console.log('..........');
                    } else {
                        $state.go('questions', {
                            idx: parseInt(currentIndex) + 1
                        });
                    }
                    break;
            }
        };
        ///////////

        /// questions list ///
        ctrl.questionsListQuestion = {
            current: ctrl.questions[currentIndex],
            checkedQuestion: function checkedQuestion() {
                return QuestionsService.currentAnswers[currentIndex] === -1 ? 0 : QuestionsService.currentAnswers[currentIndex];
            }
        };

        ctrl.changeSelected = function (e) {
            QuestionsService.currentAnswers[currentIndex] = e.idx;
        };

        /// questions ribbon ///
        ctrl.ribbonIndexes = {
            current: parseInt(currentIndex, 10) + 1,
            total: questionsLength
        };
        ////////////////////////
    };
}

angular.module('hexaquiz.common.questions').controller('QuestionsController', QuestionsController);})(window.angular);
(function(angular){
'use strict';
'use strict';

// QuestionsService.js

QuestionsService.$inject = ["$http", "$firebaseObject", "$log"];
angular.module('hexaquiz.common.questions').factory('QuestionsService', QuestionsService);

function QuestionsService($http, $firebaseObject, $log) {

    var qs = {
        questions: [],
        currentAnswers: [],
        score: 0,
        setScore: _setScore,
        getScore: _getScore,
        retrieveQuestions: _retrieveQuestions,
        setQuestions: _setQuestions,
        getQuestions: _getQuestions,
        ref: firebase.database().ref()
    };

    return qs;

    //  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
    //  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
    //  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _retrieveQuestions() {

        // return $http.get('./mock_data/questions.json');
        return $firebaseObject(qs.ref).$loaded();
    }

    function _setQuestions(data) {

        $log.info('QuestionsService::setQuestions : ', data.questions);

        qs.questions = R.values(data.questions);

        // if not reloading the page when logged out and loggedin again,
        // the currentAnswers array will grow each time
        // without being reinitialized
        qs.currentAnswers = [];
        ///////////////////////////////////////////////////////////////


        for (var i = 0, questionslength = qs.questions.length; i < questionslength; i++) {
            qs.currentAnswers.push(-1); // -1 is a flag to check if a radio button has been changed
        }

        return true;
    }

    function _getQuestions(idx) {

        return idx ? qs.questions[idx] : qs.questions;
    }

    function _setScore(score) {

        qs.score = score;

        return true;
    }

    function _getScore() {

        for (var i = 0; i < qs.questions.length; i++) {
            qs.currentAnswers[i] === -1 && (qs.currentAnswers[i] = 0);
            $log.info('qs.currentAnswers', qs.currentAnswers);
            qs.questions[i].correctAnswer === qs.currentAnswers[i] && qs.score++;
        }
        return qs.score;
    }
}})(window.angular);
(function(angular){
'use strict';
'use strict';

// real auth data

angular.module('hexaquiz.components.auth').factory('CONFIG', CONFIG);

function CONFIG() {

    var config = {
        apiKey: "AIzaSyClQMBtHySSTr9Iw7zCHZhAFhNzXuXo434",
        authDomain: "hexaquiz-6133e.firebaseapp.com",
        databaseURL: "https://hexaquiz-6133e.firebaseio.com",
        storageBucket: "hexaquiz-6133e.appspot.com",
        messagingSenderId: "556453159537"
    };

    return config;
}})(window.angular);
(function(angular){
'use strict';
////////////////////////////////////////////////////////////
// this file is the config service without real auth data //
////////////////////////////////////////////////////////////

// angular
//     .module('hexaquiz.components.auth')
//     .factory('CONFIG',CONFIG);
//
// function CONFIG() {
//
//     var config = {
//         apiKey: "",
//         authDomain: "",
//         databaseURL: "",
//         storageBucket: "",
//         messagingSenderId: ""
//     };
//
//     return config;
// }
"use strict";})(window.angular);
(function(angular){
'use strict';
'use strict';

AuthService.$inject = ["$firebaseAuth"];
function AuthService($firebaseAuth) {

    var auth = $firebaseAuth(),
        authData = null;

    function storeAuthData(response) {
        authData = response;
        return authData;
    }

    function onSignIn(user) {
        authData = user;
        return auth.$requireSignIn();
    }

    function clearAuthData() {
        authData = null;
    }

    this.login = function (user) {
        return auth.$signInWithEmailAndPassword(user.email, user.password).then(storeAuthData);
    };

    this.register = function (user) {
        return auth.$createUserWithEmailAndPassword(user.email, user.password).then(storeAuthData);
    };

    this.logout = function () {
        return auth.$signOut().then(clearAuthData);
    };

    this.requireAuthentication = function () {
        return auth.$waitForSignIn().then(onSignIn);
    };

    this.isAuthenticated = function () {
        return !!authData;
    };

    this.getAuth = function () {
        return auth.$getAuth();
    };

    this.getUser = function () {
        if (authData) {
            return authData;
        }
    };
}

angular.module('hexaquiz.components.auth').service('AuthService', AuthService);})(window.angular);
(function(angular){
'use strict';
'use strict';

var questionsList = {
    bindings: {
        question: '<',
        onRadioChanged: '&'
    },
    templateUrl: './questions-list.html',
    controller: 'QuestionsListController'
};

angular.module('hexaquiz.common.questions').component('questionsList', questionsList);})(window.angular);
(function(angular){
'use strict';
'use strict';

QuestionsListController.$inject = ["$log", "hlg"];
function QuestionsListController($log, hlg) {

    var ctrl = this;

    ctrl.$onInit = function () {

        $log.info('QuestionsListController');
        hlg.l('blue', 0, 'test de hlg : ', ctrl);

        ctrl.entries = ctrl.question.current;

        $log.info('questions list ctrl : ', ctrl.question);
        ctrl.checkedQuestion = ctrl.question.checkedQuestion();

        ctrl.radioHasChanged = function (idx) {
            console.log('radio has changed : ', idx);
            ctrl.onRadioChanged({
                $event: {
                    idx: idx
                }
            });
        };
    };
}

angular.module('hexaquiz.common.questions').controller('QuestionsListController', QuestionsListController);})(window.angular);
(function(angular){
'use strict';
'use strict';

var questionsRibbon = {
    bindings: {
        indexes: '<'
    },
    templateUrl: './questions-ribbon.html',
    controller: 'QuestionsRibbonController'
};

angular.module('hexaquiz.common.questions').component('questionsRibbon', questionsRibbon);})(window.angular);
(function(angular){
'use strict';
'use strict';

function QuestionsRibbonController() {

    var ctrl = this;

    this.$onInit = function () {

        ctrl.currentQuestionIdx = ctrl.indexes.current;
        ctrl.totalQuestionIdx = ctrl.indexes.total;
    };
}

angular.module('hexaquiz.common.questions').controller('QuestionsRibbonController', QuestionsRibbonController);})(window.angular);
(function(angular){
'use strict';
'use strict';

var authForm = {
    bindings: {
        user: '<',
        errorMessage: '@',
        signButton: '@',
        resetButton: '@',
        onSubmit: '&'
    },
    templateUrl: './auth-form.html',
    controller: 'AuthFormController'
};

angular.module('hexaquiz.components.auth').component('authForm', authForm);})(window.angular);
(function(angular){
'use strict';
'use strict';

function AuthFormController() {

    var ctrl = this;

    ctrl.$onInit = function () {

        console.log('AuthFormController');

        ctrl.submitForm = function () {
            ctrl.onSubmit({
                $event: {
                    user: ctrl.user
                }
            });
        };

        ctrl.onFocus = function (evt) {
            ctrl.errorMessage = '';
            evt.target.value = '';
        };
    };

    ctrl.$onChanges = function (changes) {
        console.log('changes : ');
        console.log(changes);

        if (changes.user) {
            ctrl.user = angular.copy(ctrl.user);
        }
    };
}

angular.module('hexaquiz.components.auth').controller('AuthFormController', AuthFormController);})(window.angular);
(function(angular){
'use strict';
'use strict';

var login = {
    templateUrl: './login.html',
    controller: 'LoginController',
    textservice: '<',
    bindings: {
        onToggleLoggedOutBtn: '&',
        onUserNameAvailable: '&'
    }
};

angular.module('hexaquiz.components.auth').component('login', login).config(["$stateProvider", "$urlServiceProvider", function ($stateProvider, $urlServiceProvider) {
    $stateProvider.state('auth', {
        redirectTo: 'auth.login',
        url: '/auth'
    })

    // https://github.com/angular-ui/ui-router/issues/3277

    // .state('auth.login', {
    //     url: '/login',
    //     component: 'login'
    // });
    .state('login', {
        url: '/login',
        component: 'login'
    });

    // https://github.com/angular-ui/ui-router/issues/3277
    // $urlServiceProvider.rules.otherwise('/auth/login'); // entry point of the app
    $urlServiceProvider.rules.otherwise('/login'); // entry point of the app
}]);})(window.angular);
(function(angular){
'use strict';
'use strict';

LoginController.$inject = ["TextService", "AuthService", "$state", "AppStateService", "$log"];
function LoginController(TextService, AuthService, $state, AppStateService, $log) {

    var ctrl = this;

    ctrl.$onInit = function () {
        $log.info('LoginController');
        $log.info('ctrl : ', ctrl);

        ctrl.text = {
            signin: TextService.login.signin,
            reset: TextService.login.reset
        };

        ctrl.loginUser = function (e) {
            return AuthService.login(e.user).then(function () {
                console.log('login from login controller');
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
                AppStateService.comingFromLogin = true;
                $state.go('app');
            }, function (reason) {
                ctrl.errorMessage = reason.message;
            });
        };
    };
}

angular.module('hexaquiz.components.auth').controller('LoginController', LoginController);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.templates', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('./root.html', '<div class="root"><header-bar logged-in="$ctrl.loggedIn" user-name="{{$ctrl.userName}}" on-toggle-logged-out-btn="$ctrl.displayLogOutButton($event)"></header-bar><div ui-view on-toggle-logged-out-btn="$ctrl.displayLogOutButton($event)" on-user-name-available="$ctrl.displayUserName($event)"></div></div>');
  $templateCache.put('./app.html', '<div class="root"><div class="app"><div ui-view class="app"></div></div></div>');
  $templateCache.put('./nav.html', '<div class="questions"><div class="container-fluid"><div class="row buttons-prev-next-hxf"><div class="col-xs-offset-3 col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-click="$ctrl.prev()" ng-disabled="$ctrl.isPrevDisabled">PREVIOUS</button></div><div class="col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-click="$ctrl.next()">NEXT</button></div></div></div></div>');
  $templateCache.put('./header-bar.html', '<div class="container-fluid"><div class="row"><div class="col-md-12 header"><header><div class="col-md-10 header-padding"><span class="app-title">hexaquiz</span> <button type="button" class="btn btn-default btn-sm ng-binding" ng-show="$ctrl.loggedIn" ng-click="$ctrl.logout()">log out</button></div><div class="col-md-2 username" ng-show="$ctrl.loggedIn">Welcome : {{$ctrl.userName}}</div></header></div></div></div>');
  $templateCache.put('./questions.html', '<div class="questions"><nav questions="$ctrl.questions" is-prev-disabled="$ctrl.isPrevDisabled" on-nav-click="$ctrl.navTo($event)"></nav><questions-list question="$ctrl.questionsListQuestion" on-radio-changed="$ctrl.changeSelected($event)"></questions-list><questions-ribbon indexes="$ctrl.ribbonIndexes"></questions-ribbon></div>');
  $templateCache.put('./auth-form.html', '<div class="row"><div class="col-md-4 col-md-offset-4"><div class="panel panel-default"><div class="panel-heading panel-hxf-heading"><span class="glyphicon glyphicon-lock"></span> Login</div><div class="panel-body"><form class="form-horizontal" role="form" ng-submit="$ctrl.submitForm()"><div class="form-group"><label for="emailfield" class="col-sm-3 control-label">Email</label><div class="col-sm-9"><input type="email" name="email" class="form-control" id="emailfield" placeholder="Email" ng-model="$ctrl.user.email" ng-focus="$ctrl.onFocus($event)" required></div></div><div class="form-group"><label for="passfield" class="col-sm-3 control-label">Password</label><div class="col-sm-9"><input type="password" name="password" class="form-control" id="passfield" placeholder="Password" ng-model="$ctrl.user.password" ng-focus="$ctrl.onFocus($event)" required></div></div><div class="form-group last"><div class="col-sm-offset-3 col-sm-5"><button type="submit" class="btn btn-success btn-sm">{{ $ctrl.signButton }}</button> <button type="reset" class="btn btn-default btn-sm">{{ $ctrl.resetButton }}</button></div><div class="col-sm-4 wrong-hxf">{{ $ctrl.errorMessage }}</div></div></form></div><div class="panel-footer panel-hxf-footer"><div class="text-center"><span class="glyphicon glyphicon-info-sign"></span><a href="https://github.com/aestheticsdata/hexaquiz" target="_blank"> Github project page</a></div></div></div></div></div>');
  $templateCache.put('./login.html', '<div class="login"><div class="container"><auth-form user="$ctrl.user" error-message="{{ $ctrl.errorMessage }}" sign-button="{{ $ctrl.text.signin }}" reset-button="{{ $ctrl.text.reset }}" on-submit="$ctrl.loginUser($event)"></auth-form><div class="row"><div class="col-md-12"><div class="text-center title-hxf">A quiz made with <span class="title-hxf-bold">AngularJS 1.5+</span> and <span class="title-hxf-bold">Firebase</span></div></div></div></div></div>');
  $templateCache.put('./questions-list.html', '<div class="row"><div class="col-md-offset-3 col-md-6"><div class="question panel panel-success"><div class="panel-heading text-center">{{$ctrl.entries.question}}</div><div class="panel-body"><div class="list-group list-group-hxf"><ul ng-repeat="entry in $ctrl.entries.choices" class="list-group-item choices"><input id="{{entry}}" type="radio" name="answerRadio" ng-checked="$index == $ctrl.checkedQuestion" ng-click="$ctrl.radioHasChanged($index)"><label for="{{entry}}"><span class="entry">{{entry}}</span></label></ul></div></div></div></div></div>');
  $templateCache.put('./questions-ribbon.html', '<div class="row"><div class="col-xs-12"><div class="text-center counter-hxf">{{$ctrl.currentQuestionIdx}}/{{$ctrl.totalQuestionIdx}}</div></div></div>');
}]);})(window.angular);