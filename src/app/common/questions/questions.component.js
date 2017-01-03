var questions = {
    bindings: {
        questions:'<'
    },
    templateUrl: './questions.html',
    controller: 'QuestionsController'
};

angular
    .module('hexaquiz.common.questions')
    .component('questions', questions);