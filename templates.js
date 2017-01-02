angular.module('hexaquiz.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div class="root"><div ui-view></div></div>');
$templateCache.put('./app.html','<div class="root"><div class="app">my quiz app<div ui-view=""></div></div></div>');
$templateCache.put('./questions.html','<div class="questions">hello questions</div>');}]);