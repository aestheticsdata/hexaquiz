(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz', ['hexaquiz.common', 'hexaquiz.components', 'hexaquiz.templates']);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.common', ['ui.router', 'hexaquiz.common.questions']).run(["$state", function ($state) {
    $state.go('app');
}]);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.components', []);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.common.questions', ['ui.router']).config(["$compileProvider", function ($compileProvider) {
    //$compileProvider.preAssignBindingsEnabled(true);
}]).config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state('questions', {
        parent: 'app',
        url: '/questions/:idx',
        component: 'questions',
        resolve: {
            questions: ["QuestionsService", function questions(QuestionsService) {

                console.log('resolve questions');

                // return 'cool';

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
        questions: '<'
    },
    templateUrl: './questions.html',
    controller: 'QuestionsController'
};

angular.module('hexaquiz.common.questions').component('questions', questions);})(window.angular);
(function(angular){
'use strict';
'use strict';

function QuestionsController() {
    var ctrl = this;
    ctrl.$onInit = function () {
        console.log('QuestionsController');
        console.log('this.questions : ', ctrl.questions);
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

var questionsList = {
    templateUrl: './questions-list.html',
    controller: 'QuestionsListController'
};

angular.module('hexaquiz.common.questions').component('questionsList', questionsList);})(window.angular);
(function(angular){
'use strict';
'use strict';

function QuestionsListController() {
    this.$onInit = function () {
        console.log('QuestionsListController');
    };
}

angular.module('hexaquiz.common.questions').controller('QuestionsListController', QuestionsListController);})(window.angular);
(function(angular){
'use strict';
'use strict';

var questionsNav = {
    templateUrl: './questions-nav.html',
    controller: 'QuestionsNavController'
};

angular.module('hexaquiz.common.questions').component('questionsNav', questionsNav);})(window.angular);
(function(angular){
'use strict';
'use strict';

function QuestionsNavController() {
    this.$onInit = function () {
        console.log('QuestionsNavController');
    };
}

angular.module('hexaquiz.common.questions').controller('QuestionsNavController', QuestionsNavController);})(window.angular);
(function(angular){
'use strict';
'use strict';

angular.module('hexaquiz.templates', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('./root.html', '<div class="root"><div ui-view></div></div>');
  $templateCache.put('./app.html', '<div class="root"><div class="app">my quiz app<div ui-view=""></div></div></div>');
  $templateCache.put('./questions.html', '<div class="questions"><questions-nav></questions-nav><questions-list questions="$ctrl.questions"></questions-list></div>');
  $templateCache.put('./questions-list.html', '<div class="row"><div class="col-md-offset-3 col-md-6"><div class="question panel panel-success"><div class="panel-heading text-center">{{entries.question}}</div><div class="panel-body"><div class="list-group list-group-hxf"><ul ng-repeat="entry in entries.choices" class="list-group-item choices"><input id="{{entry}}" type="radio" name="answerRadio" ng-checked="$index == checkedQuestion()" ng-click="onRadioChanged({idx:$index})"><label for="{{entry}}"><span class="entry">{{entry}}</span></label></ul></div></div></div></div></div>');
  $templateCache.put('./questions-nav.html', '<div class="questions"><div class="container-fluid"><div class="row buttons-prev-next-hxf"><div class="col-xs-offset-3 col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-disabled="isPrevDisabled" ng-click="prev()">PREVIOUS</button></div><div class="col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-disabled="isNextDisabled" ng-click="next()">NEXT</button></div></div></div></div>');
}]);})(window.angular);