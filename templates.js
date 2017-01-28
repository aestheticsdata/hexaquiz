angular.module('hexaquiz.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div class="root"><header-bar logged-in="$ctrl.loggedIn" user-name="{{$ctrl.userName}}" on-toggle-logged-out-btn="$ctrl.displayLogOutButton($event)"></header-bar><div ui-view on-toggle-logged-out-btn="$ctrl.displayLogOutButton($event)" on-user-name-available="$ctrl.displayUserName($event)"></div></div>');
$templateCache.put('./app.html','<div class="root"><div class="app"><div ui-view class="app"></div></div></div>');
$templateCache.put('./header-bar.html','<div class="container-fluid"><div class="row"><div class="col-md-12 header"><header><div class="col-md-10 header-padding"><span class="app-title">hexaquiz</span> <button type="button" class="btn btn-default btn-sm ng-binding" ng-show="$ctrl.loggedIn" ng-click="$ctrl.logout()">log out</button></div><div class="col-md-2 username" ng-show="$ctrl.loggedIn">Welcome : {{$ctrl.userName}}</div></header></div></div></div>');
$templateCache.put('./questions.html','<div class="questions"><nav questions="$ctrl.questions" is-prev-disabled="$ctrl.isPrevDisabled" on-nav-click="$ctrl.navTo($event)"></nav><questions-list question="$ctrl.questionsListQuestion" on-radio-changed="$ctrl.changeSelected($event)"></questions-list><questions-ribbon indexes="$ctrl.ribbonIndexes"></questions-ribbon></div>');
$templateCache.put('./nav.html','<div class="questions"><div class="container-fluid"><div class="row buttons-prev-next-hxf"><div class="col-xs-offset-3 col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-click="$ctrl.prev()" ng-disabled="$ctrl.isPrevDisabled">PREVIOUS</button></div><div class="col-xs-3"><button class="btn btn-primary btn-lg btn-block" ng-click="$ctrl.next()">NEXT</button></div></div></div></div>');
$templateCache.put('./questions-list.html','<div class="row"><div class="col-md-offset-3 col-md-6"><div class="question panel panel-success"><div class="panel-heading text-center">{{$ctrl.entries.question}}</div><div class="panel-body"><div class="list-group list-group-hxf"><ul ng-repeat="entry in $ctrl.entries.choices" class="list-group-item choices"><input id="{{entry}}" type="radio" name="answerRadio" ng-checked="$index == $ctrl.checkedQuestion" ng-click="$ctrl.radioHasChanged($index)"><label for="{{entry}}"><span class="entry">{{entry}}</span></label></ul></div></div></div></div></div>');
$templateCache.put('./questions-ribbon.html','<div class="row"><div class="col-xs-12"><div class="text-center counter-hxf">{{$ctrl.currentQuestionIdx}}/{{$ctrl.totalQuestionIdx}}</div></div></div>');
$templateCache.put('./auth-form.html','<div class="row"><div class="col-md-4 col-md-offset-4"><div class="panel panel-default"><div class="panel-heading panel-hxf-heading"><span class="glyphicon glyphicon-lock"></span> Login</div><div class="panel-body"><form class="form-horizontal" role="form" ng-submit="$ctrl.submitForm()"><div class="form-group"><label for="emailfield" class="col-sm-3 control-label">Email</label><div class="col-sm-9"><input type="email" name="email" class="form-control" id="emailfield" placeholder="Email" ng-model="$ctrl.user.email" ng-focus="$ctrl.onFocus($event)" required></div></div><div class="form-group"><label for="passfield" class="col-sm-3 control-label">Password</label><div class="col-sm-9"><input type="password" name="password" class="form-control" id="passfield" placeholder="Password" ng-model="$ctrl.user.password" ng-focus="$ctrl.onFocus($event)" required></div></div><div class="form-group last"><div class="col-sm-offset-3 col-sm-5"><button type="submit" class="btn btn-success btn-sm">{{ $ctrl.signButton }}</button> <button type="reset" class="btn btn-default btn-sm">{{ $ctrl.resetButton }}</button></div><div class="col-sm-4 wrong-hxf">{{ $ctrl.errorMessage }}</div></div></form></div><div class="panel-footer panel-hxf-footer"><div class="text-center"><span class="glyphicon glyphicon-info-sign"></span><a href="https://github.com/aestheticsdata/hexaquiz" target="_blank"> Github project page</a></div></div></div></div></div>');
$templateCache.put('./login.html','<div class="login"><div class="container"><auth-form user="$ctrl.user" error-message="{{ $ctrl.errorMessage }}" sign-button="{{ $ctrl.text.signin }}" reset-button="{{ $ctrl.text.reset }}" on-submit="$ctrl.loginUser($event)"></auth-form><div class="row"><div class="col-md-12"><div class="text-center title-hxf">A quiz made with <span class="title-hxf-bold">AngularJS 1.5+</span> and <span class="title-hxf-bold">Firebase</span></div></div></div></div></div>');}]);