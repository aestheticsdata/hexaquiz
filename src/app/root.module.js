angular
    .module('hexaquiz', [
        'ui.bootstrap',
        // 'cgBusy', // angular-busy spinner / https://github.com/cgross/angular-busy
        'angular-loading-bar',
        'ngAnimate', // optional for angular-loading-bar
        'hexaquiz.common',
        'hexaquiz.components',
        'hexaquiz.templates'
    ])
    .config(function ($logProvider, cfpLoadingBarProvider) {
        $logProvider.debugEnabled(true);
        cfpLoadingBarProvider.latencyThreshold = 100; // default
    })
    .run(function ($transitions, cfpLoadingBar) {
        $transitions.onStart({}, cfpLoadingBar.start);
        $transitions.onSuccess({}, cfpLoadingBar.complete);
    });