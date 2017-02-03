angular
    .module('hexaquiz.common', [
        'ui.router',
        'hexaquiz.common.questions',
        'hexaquiz.common.score',
        'hexaquiz.common.timer'
    ])
    .run(function ($state, $uiRouter) {
        var vis = window['ui-router-visualizer'];
        vis.visualizer($uiRouter);
    });