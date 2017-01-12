angular
    .module('hexaquiz.common', [
        'ui.router',
        'hexaquiz.common.questions'
    ])
    .run(function ($state) {
        // $state.go('app');
    });