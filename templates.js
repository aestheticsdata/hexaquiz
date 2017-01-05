angular.module('hexaquiz.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div class="root"><div ui-view></div></div>');
$templateCache.put('./app.html','<div class="root"><div class="app">my quiz app<div ui-view=""></div></div></div>');
$templateCache.put('./questions.html','<div class="questions"><questions-nav questions="$ctrl.questions" transition-alias="$ctrl.transitionAlias"></questions-nav><questions-list questions="$ctrl.questions" transition-alias="$ctrl.transitionAlias"></questions-list><questions-ribbon questions="$ctrl.questions" transition-alias="$ctrl.transitionAlias"></questions-ribbon></div>');
$templateCache.put('./questions-list.html','<div class="row"><div class="col-md-offset-3 col-md-6"><div class="question panel panel-success"><div class="panel-heading text-center">{{$ctrl.entries.question}}</div><div class="panel-body"><div class="list-group list-group-hxf"><ul ng-repeat="entry in $ctrl.entries.choices" class="list-group-item choices"><input id="{{entry}}" type="radio" name="answerRadio" ng-checked="$index == $ctrl.checkedQuestion()" ng-click="$ctrl.onRadioChanged($index)"><label for="{{entry}}"><span class="entry">{{entry}}</span></label></ul></div></div></div></div></div>');
$templateCache.put('./questions-nav.html','<div class="questions"><div class="container-fluid"><div class="row buttons-prev-next-hxf"><div class="col-xs-offset-3 col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-disabled="$ctrl.isPrevDisabled" ng-click="$ctrl.prev()">PREVIOUS</button></div><div class="col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-disabled="$ctrl.isNextDisabled" ng-click="$ctrl.next()">NEXT</button></div></div></div></div>');
$templateCache.put('./questions-ribbon.html','<div class="row"><div class="col-xs-12"><div class="text-center counter-hxf">{{$ctrl.currentQuestionIdx}}/{{$ctrl.totalQuestionIdx}}</div></div></div>w');}]);