var questionsNav = {
    bindings: {
        transitionAlias:'<',
        questions:'<'
    },
    templateUrl: './questions-nav.html',
    controller: 'QuestionsNavController'
};

angular
    .module('hexaquiz.common.questions')
    .component('questionsNav', questionsNav);