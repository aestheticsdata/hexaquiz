var questionsList = {
    bindings: {
        question:'<',
        onRadioChanged:'&'
    },
    templateUrl: './questions-list.html',
    controller: 'QuestionsListController'
};

angular
    .module('hexaquiz.common.questions')
    .component('questionsList', questionsList);