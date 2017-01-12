(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz', ['hexaquiz.common', 'hexaquiz.components', 'hexaquiz.templates']);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.common', ['ui.router', 'hexaquiz.common.questions']).run(["$state", function ($state) {
    // $state.go('app');
}]);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.components', ['hexaquiz.components.auth', 'hexaquiz.components.nav']);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.common.questions', ['ui.router']);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.components.auth', ['ui.router', 'firebase']);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.components.nav', []);})(window.angular);
(function(angular){
'use strict';
'use strict';

var rootobj = {
    templateUrl: './root.html'
};

angular.module('hexaquiz').component('rootcomponent', rootobj);})(window.angular);
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
        component: 'app',
        params: { idx: 0 } // this params is used in 'questions' state because 'app' state redirectTo 'questions' state
    });
}]);})(window.angular);
(function(angular){
'use strict';
'use strict';

function AppController() {
    this.$onInit = function () {
        console.log('AppController');
    };
}

angular.module('hexaquiz.common').controller('AppController', AppController);})(window.angular);
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
                    return QuestionsService.questions.data;
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

QuestionsService.$inject = ["$http"];
angular.module('hexaquiz.common.questions').factory('QuestionsService', QuestionsService);

function QuestionsService($http) {

    var qs = {
        questions: [],
        currentAnswers: [],
        score: 0,
        setScore: _setScore,
        getScore: _getScore,
        retrieveQuestions: _retrieveQuestions,
        setQuestions: _setQuestions,
        getQuestions: _getQuestions
    };

    return qs;

    //  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
    //  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
    //  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _retrieveQuestions() {

        return $http.get('./mock_data/questions.json');
    }

    function _setQuestions(questions) {

        console.log('QuestionsService::setQuestions : ', questions);

        qs.questions = questions;

        for (var i = 0; i < qs.questions.length; i++) {
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
            console.log('qs.currentAnswers', qs.currentAnswers);
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

function QuestionsListController() {

    var ctrl = this;

    ctrl.$onInit = function () {

        console.log('QuestionsListController');

        ctrl.entries = ctrl.question.current;

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

var login = {
    templateUrl: './login.html',
    controller: 'LoginController'
};

angular.module('hexaquiz.components.auth').component('login', login).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        template: '<div ui-view></div>'
    }).state('auth.login', {
        url: '/login',
        component: 'login'
    });
    $urlRouterProvider.otherwise('/auth/login');
}]);})(window.angular);
(function(angular){
'use strict';
'use strict';

function LoginController() {
    console.log('LoginController');
}

angular.module('hexaquiz.components.auth').controller('LoginController', LoginController);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.templates', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('./root.html', '<div class="root"><div ui-view></div></div>');
  $templateCache.put('./app.html', '<div class="root"><div class="app">my quiz app<div ui-view=""></div></div></div>');
  $templateCache.put('./nav.html', '<div class="questions"><div class="container-fluid"><div class="row buttons-prev-next-hxf"><div class="col-xs-offset-3 col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-click="$ctrl.prev()" ng-disabled="$ctrl.isPrevDisabled">PREVIOUS</button></div><div class="col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-click="$ctrl.next()">NEXT</button></div></div></div></div>');
  $templateCache.put('./questions.html', '<div class="questions"><nav questions="$ctrl.questions" is-prev-disabled="$ctrl.isPrevDisabled" on-nav-click="$ctrl.navTo($event)"></nav><questions-list question="$ctrl.questionsListQuestion" on-radio-changed="$ctrl.changeSelected($event)"></questions-list><questions-ribbon indexes="$ctrl.ribbonIndexes"></questions-ribbon></div>');
  $templateCache.put('./login.html', '<div class="login"><div class="container"><div class="row"><div class="col-md-4 col-md-offset-4"><div class="panel panel-default"><div class="panel-heading panel-hxf-heading"><span class="glyphicon glyphicon-lock"></span> Login</div><div class="panel-body"><form class="form-horizontal" role="form" ng-submit="login()"><div class="form-group"><label for="userfield" class="col-sm-3 control-label">User</label><div class="col-sm-9"><input type="text" class="form-control" id="userfield" placeholder="Username" ng-focus="onFocus($event)" required></div></div><div class="form-group"><label for="passfield" class="col-sm-3 control-label">Password</label><div class="col-sm-9"><input type="password" class="form-control" id="passfield" placeholder="Password" ng-focus="onFocus($event)" required></div></div><div class="form-group last"><div class="col-sm-offset-3 col-sm-5"><button type="submit" class="btn btn-success btn-sm">Sign in</button> <button type="reset" class="btn btn-default btn-sm">Reset</button></div><div class="col-sm-4 wrong-hxf" ng-show="loginerror">Wrong Login/Password</div></div></form></div><div class="panel-footer panel-hxf-footer"><div class="text-center"><span class="glyphicon glyphicon-info-sign"></span><a href="https://github.com/aestheticsdata/SPAquizMongoAngularJS" target="_blank"> SPAquizMongoAngularJS</a></div></div></div></div></div><div class="row"><div class="col-md-12"><div class="text-center title-hxf">A quiz made with <span class="title-hxf-bold">AngularJS 1.5+</span></div></div></div></div></div>');
  $templateCache.put('./questions-list.html', '<div class="row"><div class="col-md-offset-3 col-md-6"><div class="question panel panel-success"><div class="panel-heading text-center">{{$ctrl.entries.question}}</div><div class="panel-body"><div class="list-group list-group-hxf"><ul ng-repeat="entry in $ctrl.entries.choices" class="list-group-item choices"><input id="{{entry}}" type="radio" name="answerRadio" ng-checked="$index == $ctrl.checkedQuestion" ng-click="$ctrl.radioHasChanged($index)"><label for="{{entry}}"><span class="entry">{{entry}}</span></label></ul></div></div></div></div></div>');
  $templateCache.put('./questions-ribbon.html', '<div class="row"><div class="col-xs-12"><div class="text-center counter-hxf">{{$ctrl.currentQuestionIdx}}/{{$ctrl.totalQuestionIdx}}</div></div></div>w');
}]);})(window.angular);