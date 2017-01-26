angular
    .module('hexaquiz.common', [
        'ui.router',
        'hexaquiz.common.questions'
    ])
    .run(function ($state, $uiRouter) {
        var vis = window['ui-router-visualizer'];
        vis.visualizer($uiRouter);
    });