var questionsList = {
    bindings: {
        questions:'<'
    },
    templateUrl: './questions-list.html',
    controller: 'QuestionsListController'
};

angular
    .module('hexaquiz.common.questions')
    .component('questionsList', questionsList);