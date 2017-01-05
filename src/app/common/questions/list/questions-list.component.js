var questionsList = {
    bindings: {
        transitionAlias:'<',
        questions:'<'
    },
    templateUrl: './questions-list.html',
    controller: 'QuestionsListController'
};

angular
    .module('hexaquiz.common.questions')
    .component('questionsList', questionsList);